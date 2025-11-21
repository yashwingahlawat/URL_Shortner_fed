import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { shortenUrl, getUserUrls, deleteUrl } from "../api/urls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import CopyButton from "@/components/CopyButton";
import { motion } from "framer-motion";

interface UrlItem {
  id: number;
  shortCode: string;
  originalUrl: string;
  createdAt: string;
  expiresAt: string;
  clickCount: number;
}

export default function Dashboard() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortened, setShortened] = useState("");
  const [urls, setUrls] = useState<UrlItem[]>([]);

  const loadUrls = useCallback(async () => {
    try {
      const res = await getUserUrls();
      if (res.data.success) setUrls(res.data.data);
    } catch (e) {
      console.error("Error loading URLs", e);
    }
  }, []);

  useEffect(() => {
    loadUrls();
  }, [loadUrls]);

  const createShortUrl = async () => {
    if (!originalUrl) return;

    try {
      const res = await shortenUrl({ originalUrl, customAlias });
      setShortened(res.data.shortCode);
      setOriginalUrl("");
      setCustomAlias("");
      loadUrls();
    } catch {
      alert("Failed to create short URL");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this URL?")) return;
    try {
      await deleteUrl(id);
      loadUrls();
    } catch {
      alert("Failed to delete URL");
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Create Short URL
        </h1>

        {/* INPUT CARD */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700 max-w-3xl mb-8">
          <div className="flex gap-3">
            <Input
              placeholder="https://example.com"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="dark:bg-gray-900 dark:text-white dark:border-gray-700"
            />
            <Input
              placeholder="Custom Alias (optional)"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="dark:bg-gray-900 dark:text-white dark:border-gray-700"
            />
            <Button onClick={createShortUrl}>Shorten</Button>
          </div>

          {shortened && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-md border dark:border-gray-700"
            >
              <p className="font-medium text-gray-900 dark:text-gray-200">
                Shortened URL:
              </p>
              <div className="flex items-center gap-3 mt-1">
                <a
                  href={`${import.meta.env.VITE_API_URL}${shortened}`}
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  ${import.meta.env.VITE_API_URL}{shortened}
                </a>
                <CopyButton text={`${import.meta.env.VITE_API_URL}${shortened}`} />
              </div>
            </motion.div>
          )}
        </div>

        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
          Your URLs
        </h2>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-2 border dark:border-gray-700 overflow-hidden">
          <Table>
            <TableCaption className="text-gray-600 dark:text-gray-400">
              Your created URLs
            </TableCaption>

            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-900">
                <TableHead className="font-semibold dark:text-gray-200">
                  Original URL
                </TableHead>
                <TableHead className="font-semibold dark:text-gray-200">
                  Short Code
                </TableHead>
                <TableHead className="font-semibold dark:text-gray-200">
                  Clicks
                </TableHead>
                <TableHead className="font-semibold dark:text-gray-200">
                  Created
                </TableHead>
                <TableHead className="text-right font-semibold dark:text-gray-200">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {urls.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-gray-500 dark:text-gray-400"
                  >
                    No URLs created yet.
                  </TableCell>
                </TableRow>
              ) : (
                urls.map((u) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <TableCell className="max-w-xs break-all dark:text-gray-200">
                      {u.originalUrl}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <a
                          href={`${import.meta.env.VITE_API_URL}${u.shortCode}`}
                          target="_blank"
                          className="text-blue-600 dark:text-blue-400 underline"
                        >
                          {u.shortCode}
                        </a>
                        <CopyButton
                          text={`${import.meta.env.VITE_API_URL}${u.shortCode}`}
                        />
                      </div>
                    </TableCell>

                    <TableCell className="dark:text-gray-200">
                      {u.clickCount}
                    </TableCell>

                    <TableCell className="dark:text-gray-200">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right space-x-4">
                      <Link
                        to={`/analytics/${u.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Analytics
                      </Link>

                      <button
                        className="text-red-600 dark:text-red-400 hover:underline"
                        onClick={() => handleDelete(u.id)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
