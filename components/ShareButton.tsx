"use client";

import { useState } from "react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded-full border border-stone-300 px-6 py-2 text-sm font-medium transition hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
    >
      {copied ? "已复制" : "复制分享链接"}
    </button>
  );
}
