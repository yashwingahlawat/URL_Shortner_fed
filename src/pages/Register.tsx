import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import MainLayout from "@/layouts/MainLayout";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await registerUser(form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60 }}
      >
        <Card className="w-[380px] shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Create Account ✨
            </CardTitle>
            <p className="text-center text-sm text-gray-600 mt-1">
              Join us and start creating short links
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={submit} className="space-y-5">
              <Input
                placeholder="Name"
                required
                className="h-11 text-base"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <Input
                placeholder="Email"
                type="email"
                required
                className="h-11 text-base"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <Input
                placeholder="Password"
                type="password"
                required
                className="h-11 text-base"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <Button
                type="submit"
                className="w-full h-11 text-base font-medium"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>

              <p className="text-center text-sm mt-3">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
    </MainLayout>
  );
}
