import { useState } from "react";
import { Lock, Mail, Eye, EyeOff, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onShowToast: (type: "success" | "error" | "warning", message: string) => void;
}

export function LoginPage({ onNavigate, onShowToast }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
   const [forgotMode, setForgotMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [resetData, setResetData] = useState({
    email: "",
    newPassword: ""
  });
  
// ---------------- LOGIN / SIGNUP ----------------
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!isLogin && formData.password !== formData.confirmPassword) {
    onShowToast("error", "Passwords do not match");
    return;
  }

  try {
    const url = isLogin
      ? "http://127.0.0.1:5000/login"
      : "http://127.0.0.1:5000/signup";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      onShowToast("error", data.error || "Something went wrong");
      return;
    }

    if (isLogin) {
      // ✅ Save JWT token
      localStorage.setItem("token", data.token);

      onShowToast("success", "Login successful!");
      onNavigate("landing"); // navigate ONLY after success
    } else {
      onShowToast("success", "Account created! Please log in.");
      setIsLogin(true);
      setFormData({ email: "", password: "", confirmPassword: "" });
    }
  } catch (error) {
    console.error(error);
    onShowToast("error", "Backend not reachable");
  }
};

// ---------------- FORGOT PASSWORD ----------------
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resetData)
      });

      const data = await res.json();

      if (!res.ok) {
        onShowToast("error", data.error || "Reset failed");
        return;
      }

      onShowToast("success", "Password reset successful. Please login.");
      setForgotMode(false);
      setResetData({ email: "", newPassword: "" });

    } catch {
      onShowToast("error", "Backend not reachable");
    }
  };


 return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-cyan-950/20 flex items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-8">

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-[#2B6CB0] to-[#0BC5EA] rounded-2xl shadow-lg">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-gray-900 dark:text-white mb-2">
              {forgotMode
                ? "Reset Password"
                : isLogin
                ? "Welcome Back"
                : "Create Account"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {forgotMode
                ? "Enter email and new password"
                : isLogin
                ? "Sign in to your account"
                : "Sign up to get started"}
            </p>
          </div>

          {/* FORGOT PASSWORD FORM */}
          {forgotMode ? (
            <form onSubmit={handleForgotPassword} className="space-y-6">

              <Input
                type="email"
                placeholder="Enter your email"
                value={resetData.email}
                onChange={(e) =>
                  setResetData({ ...resetData, email: e.target.value })
                }
                required
              />

              <Input
                type="password"
                placeholder="New password"
                value={resetData.newPassword}
                onChange={(e) =>
                  setResetData({ ...resetData, newPassword: e.target.value })
                }
                required
              />

              <Button className="w-full">Reset Password</Button>

              <button
                type="button"
                onClick={() => setForgotMode(false)}
                className="text-sm text-blue-500 hover:underline w-full text-center"
              >
                Back to login
              </button>
            </form>
          ) : (
            /* LOGIN / SIGNUP FORM */
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <Label>Email Address</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value
                      })
                    }
                    required
                  />
                </div>
              )}

              {isLogin && (
                <button
                  type="button"
                  onClick={() => setForgotMode(true)}
                  className="text-sm text-blue-500 hover:underline text-center w-full"
                >
                  Forgot password?
                </button>
              )}

              <Button className="w-full bg-gradient-to-r from-[#2B6CB0] to-[#0BC5EA] text-white py-6 rounded-xl shadow-lg">
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>
          )}

          {/* Toggle Login / Signup */}
          {!forgotMode && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#2B6CB0] dark:text-[#0BC5EA] hover:underline"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            🔒 Secured with blockchain technology
          </p>
        </div>
      </div>
    </div>
  );
}
