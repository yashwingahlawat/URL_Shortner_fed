import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      
      {/* Floating 404 Number */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-7xl font-extrabold text-gray-800"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-lg text-gray-600 mt-3"
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      {/* Floating Icon */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{ delay: 0.6, duration: 2, repeat: Infinity }}
      >
        <svg
          className="w-24 h-24 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l7 7-7 7-7-7z" />
        </svg>
      </motion.div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="mt-10"
      >
        <Link to="/">
          <Button className="text-lg px-6 py-5">
            Go Back to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
