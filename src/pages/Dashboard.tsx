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
        <h1 className="text-3xl font-bold mb-6">Create Short URL</h1>

        {/* INPUT CARD */}
        <div className="bg-white p-6 rounded-lg shadow max-w-3xl mb-8">
          <div className="flex gap-3">
            <Input
              placeholder="https://example.com"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
            <Input
              placeholder="Custom Alias (optional)"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
            />
            <Button onClick={createShortUrl}>Shorten</Button>
          </div>

          {shortened && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 bg-gray-50 p-4 rounded-md border"
            >
              <p className="font-medium">Shortened URL:</p>
              <div className="flex items-center gap-3 mt-1">
                <a
                  href={`http://localhost:8080/${shortened}`}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  http://localhost:8080/{shortened}
                </a>
                <CopyButton text={`http://localhost:8080/${shortened}`} />
              </div>
            </motion.div>
          )}
        </div>

        <h2 className="text-2xl font-semibold mb-3">Your URLs</h2>

        <div className="bg-white rounded-lg shadow p-2 overflow-hidden">
          <Table>
            <TableCaption>Your created URLs</TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Original URL</TableHead>
                <TableHead className="font-semibold">Short Code</TableHead>
                <TableHead className="font-semibold">Clicks</TableHead>
                <TableHead className="font-semibold">Created</TableHead>
                <TableHead className="text-right font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {urls.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No URLs created yet.
                  </TableCell>
                </TableRow>
              ) : (
                urls.map((u) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <TableCell className="max-w-xs break-all">
                      {u.originalUrl}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <a
                          href={`http://localhost:8080/${u.shortCode}`}
                          target="_blank"
                          className="text-blue-600 underline"
                        >
                          {u.shortCode}
                        </a>
                        <CopyButton
                          text={`http://localhost:8080/${u.shortCode}`}
                        />
                      </div>
                    </TableCell>

                    <TableCell>{u.clickCount}</TableCell>

                    <TableCell>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right space-x-4">
                      <Link
                        to={`/analytics/${u.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Analytics
                      </Link>

                      <button
                        className="text-red-600 hover:underline"
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
