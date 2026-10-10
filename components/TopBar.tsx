"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function TopBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Render below the fixed 64px navbar
    const dismissed = sessionStorage.getItem("topbar-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    sessionStorage.setItem("topbar-dismissed", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="w-full h-9 flex items-center justify-center px-4 relative"
      style={{
        background: "linear-gradient(90deg, #1a1a1a 0%, #111827 50%, #1a1a1a 100%)",
        borderBottom: "1px solid rgba(177,95,44,0.2)",
      }}
    >
      <p className="text-xs text-zinc-300 text-center">
        🔥 Get our free weekly AI tools newsletter —{" "}
        <Link
          href="#newsletter"
          className="text-[#cf8047] font-semibold underline underline-offset-2 hover:text-[#cf8047] transition-colors"
        >
          Join free →
        </Link>
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-3 text-zinc-600 hover:text-zinc-300 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
