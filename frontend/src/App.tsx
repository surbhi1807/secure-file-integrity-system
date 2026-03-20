import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { ThemeProvider } from "./components/ThemeProvider";
import { Navigation } from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import { RegisterFile } from "./components/RegisterFile";
import { VerifyFile } from "./components/VerifyFile";
import { AboutPage } from "./components/AboutPage";
import { HistoryPage } from "./components/HistoryPage";
import { LoginPage } from "./components/LoginPage";
import { CertificatePage } from "./components/CertificatePage";
import { ProfilePage } from "./components/ProfilePage";
import { NotificationToast, ToastType } from "./components/NotificationToast";


type Page =
  | "landing"
  | "register"
  | "verify"
  | "about"
  | "history"
  | "login"
  | "certificate"
  | "profile";

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const protectedPages: Page[] = [
    "register",
    "verify",
    "history",
    "certificate",
    "profile",
  ];

  const showToast = (type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setCurrentPage("login");
    showToast("success", "Logged out successfully");
  };

  // ✅ Token expiry check on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setCurrentPage("login");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setCurrentPage("login");
        showToast("warning", "Session expired. Please login again.");
      } else {
        setIsAuthenticated(true);
        setCurrentPage("landing");
      }
    } catch {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setCurrentPage("login");
    }
  }, []);

  const handleNavigate = (page: string) => {
    if (protectedPages.includes(page as Page) && !isAuthenticated) {
      setCurrentPage("login");
      return;
    }
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        {isAuthenticated && currentPage !== "login" && (
          <Navigation
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            onProfileClick={() => setCurrentPage("profile")}
          />
        )}

        {currentPage === "landing" && <LandingPage onNavigate={handleNavigate} />}
        {currentPage === "register" && (
          <RegisterFile onNavigate={handleNavigate} onShowToast={showToast} />
        )}
        {currentPage === "verify" && (
          <VerifyFile onNavigate={handleNavigate} onShowToast={showToast} />
        )}
        {currentPage === "about" && (
          <AboutPage onNavigate={handleNavigate} onShowToast={showToast} />
        )}
        {currentPage === "history" && (
          <HistoryPage onNavigate={handleNavigate} />
        )}
        {currentPage === "certificate" && (
          <CertificatePage
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentPage === "profile" && <ProfilePage onLogout={handleLogout} />}

        {currentPage === "login" && (
          <LoginPage
            onNavigate={(page) => {
              setIsAuthenticated(true);
              setCurrentPage(page as Page);
            }}
            onShowToast={showToast}
          />
        )}

        {/* Toasts */}
        <div className="fixed top-20 right-4 z-50 space-y-4">
          {toasts.map((toast) => (
            <NotificationToast
              key={toast.id}
              type={toast.type}
              message={toast.message}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}
