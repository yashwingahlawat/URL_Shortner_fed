import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useTheme } from "@/store/theme";
import { Moon, Sun } from "lucide-react";

export default function MainLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const { theme, toggleTheme } = useTheme();

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <nav className="bg-white dark:bg-gray-800 shadow px-6 py-3 flex justify-between items-center transition-colors">
        <Link to="/" className="text-2xl font-semibold dark:text-white">
          URL Shortener
        </Link>

        <div className="flex items-center gap-4">
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* AUTH BUTTONS */}
          {token ? (
            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          ) : isLoginPage ? (
            <Link to="/register" className="text-blue-600 dark:text-blue-400 font-medium">
              Register
            </Link>
          ) : isRegisterPage ? (
            <Link to="/login" className="text-blue-600 dark:text-blue-400 font-medium">
              Login
            </Link>
          ) : (
            <Link to="/login" className="text-blue-600 dark:text-blue-400 font-medium">
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Page Content With Animation */}
      <motion.div
        className="p-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
