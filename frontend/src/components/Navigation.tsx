import { Shield, Moon, Sun, User, LogOut } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onProfileClick: () => void;
}

export function Navigation({
  currentPage,
  onNavigate,
  onLogout,
  onProfileClick,
}: NavigationProps) {
  const { theme, toggleTheme } = useTheme();

  const navButton = (page: string, label: string) => (
    <button
      onClick={() => onNavigate(page)}
      className={`px-3 py-2 transition-colors ${
        currentPage === page
          ? "text-[#2B6CB0] dark:text-[#0BC5EA]"
          : "text-gray-600 dark:text-gray-300 hover:text-[#2B6CB0] dark:hover:text-[#0BC5EA]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("landing")}
          >
            <div className="p-2 bg-gradient-to-br from-[#2B6CB0] to-[#0BC5EA] rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-gray-900 dark:text-white font-semibold">
              SecureFile
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            {navButton("landing", "Home")}
            {navButton("register", "Register")}
            {navButton("verify", "Verify")}
            {navButton("history", "History")}
            {navButton("about", "About")}

            {/* Profile */}
            <Button onClick={onProfileClick} variant="outline" className="flex gap-2">
              <User className="w-4 h-4" />
              Profile
            </Button>

            {/* Logout */}
            <Button
              onClick={onLogout}
              variant="outline"
              className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
