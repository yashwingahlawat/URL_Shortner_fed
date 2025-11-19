import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useTheme } from "@/store/theme";
import { Moon, Sun } from "lucide-react";

export default function MainLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { theme, toggleTheme } = useTheme();


  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold">
          URL Shortener
        </Link>

         {token ? (
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        ) : isLoginPage ? (
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        ) : isRegisterPage ? (
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        ) : (
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        )}
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
