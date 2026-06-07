import { useEffect, useState } from "react";
import { User, Mail, LogOut } from "lucide-react";
import { Button } from "./ui/button";

interface ProfilePageProps {
  onLogout: () => void;
}

interface ProfileData {
  user_id: number;
  email: string;
}

export function ProfilePage({ onLogout }: ProfilePageProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please login again.");
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:5000/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Session expired. Please login again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-10">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={onLogout}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card p-8 rounded-xl shadow-lg border border-border w-full max-w-md">
        <div className="text-center mb-6">
          <User className="w-12 h-12 mx-auto text-primary" />
          <h2 className="text-xl font-bold mt-2">Your Profile</h2>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <Mail />
            <span>{profile?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <User />
            <span>User ID: {profile?.user_id}</span>
          </div>
        </div>

        <Button
          onClick={onLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 justify-center"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
