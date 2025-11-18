import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold">
          URL Shortener
        </Link>

        <Button variant="destructive" onClick={logout}>
          Logout
        </Button>
      </nav>

      {/* CONTENT */}
      <div className="p-6">{children}</div>
    </div>
  );
}
