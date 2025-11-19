import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button onClick={copy} variant="secondary" size="sm">
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}
