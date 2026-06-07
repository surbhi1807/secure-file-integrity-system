from flask_talisman import Talisman
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from datetime import datetime, timedelta
import jwt
import os
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from functools import wraps

load_dotenv()

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
Talisman(app, force_https=False)

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"]
)

DATABASE_URL = os.getenv("DATABASE_URL")
JWT_SECRET = os.getenv("JWT_SECRET", "fallback_secret_key")
JWT_ALGO = "HS256"


def get_db_conn():
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL environment variable is not set")
    return psycopg2.connect(DATABASE_URL)


# ---------------- TOKEN AUTH DECORATOR ----------------

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({"error": "Token missing"}), 401

        try:
            token = auth_header.split(" ")[1]
            decoded = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
            request.user = decoded

        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401

        except Exception:
            return jsonify({"error": "Invalid token"}), 401

        return f(*args, **kwargs)

    return decorated


# ---------------- DATABASE INIT ----------------

def init_db():
    conn = get_db_conn()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS files (
            id SERIAL PRIMARY KEY,
            filename TEXT,
            filehash TEXT UNIQUE,
            timestamp TIMESTAMP,
            status TEXT
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email TEXT UNIQUE,
            password TEXT,
            created_at TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()


init_db()


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend running successfully"})


# ---------------- SIGNUP ----------------

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    try:
        conn = get_db_conn()
        cursor = conn.cursor()

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        cursor.execute(
            "INSERT INTO users (email, password, created_at) VALUES (%s, %s, %s)",
            (email, hashed_password, datetime.now())
        )

        conn.commit()
        conn.close()

        return jsonify({"message": "Account created successfully"})

    except psycopg2.errors.UniqueViolation:
        return jsonify({"error": "User already exists"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- LOGIN ----------------

@app.route("/login", methods=["POST"])
@limiter.limit("5 per minute")
def login():

    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    try:

        conn = get_db_conn()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT id, password FROM users WHERE email = %s", (email,)
        )

        user = cursor.fetchone()
        conn.close()

        if not user:
            return jsonify({"error": "Invalid credentials"}), 401

        user_id = user[0]
        stored_password = user[1]

        if not bcrypt.check_password_hash(stored_password, password):
            return jsonify({"error": "Invalid credentials"}), 401

        payload = {
            "user_id": user_id,
            "email": email,
            "exp": datetime.utcnow() + timedelta(days=1)
        }

        token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)

        return jsonify({
            "message": "Login successful",
            "token": token
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- PROFILE ----------------

@app.route("/profile", methods=["GET"])
@token_required
def profile():

    user = request.user

    return jsonify({
        "user_id": user["user_id"],
        "email": user["email"]
    })


# ---------------- REGISTER FILE ----------------

@app.route("/register", methods=["POST"])
@token_required
def register_file():

    data = request.json
    filename = data.get("filename")
    filehash = data.get("filehash")

    if not filename or not filehash:
        return jsonify({"error": "Missing filename or filehash"}), 400

    try:

        conn = get_db_conn()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT * FROM files WHERE filehash = %s", (filehash,)
        )

        existing_hash = cursor.fetchone()

        if existing_hash:
            conn.close()
            return jsonify({
                "status": "duplicate",
                "message": "This exact file is already registered"
            }), 409

        cursor.execute(
            "SELECT * FROM files WHERE filename = %s", (filename,)
        )

        existing_filename = cursor.fetchone()

        if existing_filename:

            cursor.execute(
                "UPDATE files SET status = %s WHERE filename = %s",
                ("tampered", filename)
            )

            conn.commit()
            conn.close()

            return jsonify({
                "status": "tampered",
                "message": "Same filename but content changed"
            }), 409

        timestamp = datetime.now()

        cursor.execute(
            "INSERT INTO files (filename, filehash, timestamp, status) VALUES (%s, %s, %s, %s)",
            (filename, filehash, timestamp, "registered")
        )

        conn.commit()
        conn.close()

        return jsonify({
            "status": "registered",
            "filename": filename,
            "timestamp": timestamp.strftime("%Y-%m-%d %H:%M:%S")
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- VERIFY FILE ----------------

@app.route("/verify", methods=["POST"])
@token_required
def verify_file():

    data = request.json
    filename = data.get("filename")
    filehash = data.get("filehash")

    if not filename or not filehash:
        return jsonify({"error": "Missing filename or filehash"}), 400

    try:

        conn = get_db_conn()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT filehash, timestamp FROM files WHERE filename = %s",
            (filename,)
        )

        record = cursor.fetchone()

        if not record:
            conn.close()
            return jsonify({
                "status": "not_found",
                "message": "File not registered"
            })

        stored_hash, timestamp = record

        status = "verified" if stored_hash == filehash else "tampered"

        cursor.execute(
            "UPDATE files SET status = %s WHERE filename = %s",
            (status, filename)
        )

        conn.commit()
        conn.close()

        return jsonify({
            "status": status,
            "timestamp": timestamp.strftime("%Y-%m-%d %H:%M:%S") if timestamp else None
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- HISTORY ----------------

@app.route("/history", methods=["GET"])
@token_required
def get_history():

    try:

        conn = get_db_conn()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT filename, filehash, timestamp, status FROM files ORDER BY id DESC"
        )

        records = cursor.fetchall()
        conn.close()

        history = []

        for r in records:
            history.append({
                "filename": r[0],
                "filehash": r[1],
                "timestamp": r[2].strftime("%Y-%m-%d %H:%M:%S") if r[2] else None,
                "status": r[3]
            })

        return jsonify(history)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- FORGOT PASSWORD ----------------

@app.route("/forgot-password", methods=["POST"])
def forgot_password():

    data = request.json
    email = data.get("email")
    new_password = data.get("newPassword")

    if not email or not new_password:
        return jsonify({"error": "Missing fields"}), 400

    try:

        hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")

        conn = get_db_conn()
        cursor = conn.cursor()

        cursor.execute(
            "UPDATE users SET password = %s WHERE email = %s",
            (hashed_password, email)
        )

        conn.commit()
        conn.close()

        return jsonify({"message": "Password reset successful"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run()
