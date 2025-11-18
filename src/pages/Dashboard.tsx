import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { shortenUrl } from "../api/urls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  const createShortUrl = async () => {
    if (!url) return;

    try {
      const res = await shortenUrl(url);
      setResult(res.data.shortCode);
    } catch (err) {
      alert("Failed to create short URL");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">Create Short URL</h1>

      <div className="flex gap-3 max-w-xl">
        <Input
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={createShortUrl}>Shorten</Button>
      </div>

      {result && (
        <div className="mt-4 bg-white shadow p-4 rounded">
          <p className="font-medium">Your Short URL:</p>
          <a 
            href={`http://localhost:8080/${result}`}
            target="_blank"
            className="text-blue-600 underline"
          >
            http://localhost:8080/{result}
          </a>
        </div>
      )}
    </DashboardLayout>
  );
}
