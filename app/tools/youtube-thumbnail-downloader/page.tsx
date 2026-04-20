"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Search, Image } from "lucide-react";

interface Thumbnail {
  label: string;
  quality: string;
  url: string;
  width: number;
  height: number;
}

function extractVideoId(input: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const match = input.trim().match(p);
    if (match) return match[1];
  }
  return null;
}

function getThumbnails(videoId: string): Thumbnail[] {
  return [
    { label: "Max Resolution", quality: "maxresdefault", url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, width: 1280, height: 720 },
    { label: "Standard", quality: "sddefault", url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`, width: 640, height: 480 },
    { label: "High Quality", quality: "hqdefault", url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, width: 480, height: 360 },
    { label: "Medium Quality", quality: "mqdefault", url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, width: 320, height: 180 },
    { label: "Default", quality: "default", url: `https://img.youtube.com/vi/${videoId}/default.jpg`, width: 120, height: 90 },
  ];
}

export default function YouTubeThumbnailDownloader() {
  const [input, setInput] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [error, setError] = useState("");
  const [loadedThumbs, setLoadedThumbs] = useState<Set<string>>(new Set());

  function handleFetch() {
    setError("");
    setVideoId(null);
    setThumbnails([]);
    setLoadedThumbs(new Set());

    const id = extractVideoId(input);
    if (!id) {
      setError("Please enter a valid YouTube URL or video ID.");
      return;
    }

    setVideoId(id);
    setThumbnails(getThumbnails(id));
  }

  async function handleDownload(thumb: Thumbnail) {
    try {
      const response = await fetch(thumb.url);
      const blob = await response.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `youtube-thumbnail-${videoId}-${thumb.quality}.jpg`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      // Fallback: open in new tab
      window.open(thumb.url, "_blank");
    }
  }

  function handleImageLoad(quality: string) {
    setLoadedThumbs((prev) => new Set(prev).add(quality));
  }

  const inputStyle = {
    background: "var(--bg-card)",
    border: "1.5px solid var(--border-color)",
    color: "var(--text-primary)",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free YouTube Thumbnail Downloader",
    description: "Download YouTube video thumbnails in all available resolutions. Supports regular videos, shorts, and youtu.be links.",
    url: "https://clickwise.website/tools/youtube-thumbnail-downloader",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:opacity-80" style={{ color: "var(--text-muted)" }}>
          <ArrowLeft className="w-4 h-4" /> All Tools
        </Link>

        <div className="text-center mb-10">
          <span className="text-5xl mb-4 block">🎬</span>
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: "var(--text-primary)" }}>YouTube Thumbnail Downloader</h1>
          <p style={{ color: "var(--text-secondary)" }}>Download thumbnails from any YouTube video in all available resolutions</p>
        </div>

        {/* Input */}
        <div className="glass rounded-3xl p-6 mb-6">
          <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>YouTube Video URL or ID</label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFetch()}
              className="flex-1 rounded-xl px-4 py-3 text-sm font-medium outline-none"
              style={inputStyle}
            />
            <button onClick={handleFetch} className="btn-primary text-sm px-6">
              <Search className="w-4 h-4 mr-2" /> Fetch
            </button>
          </div>
          {error && <p className="mt-3 text-sm font-medium" style={{ color: "#EF4444" }}>{error}</p>}
          <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>
            Supports: youtube.com/watch, youtu.be, youtube.com/shorts, and direct video IDs
          </p>
        </div>

        {/* Results */}
        {thumbnails.length > 0 && (
          <>
            {/* Main thumbnail preview */}
            <div className="glass rounded-3xl p-4 mb-6 text-center">
              <div className="rounded-2xl overflow-hidden mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbnails[0].url}
                  alt="Video thumbnail"
                  className="w-full rounded-2xl"
                  onError={(e) => {
                    // fallback to hqdefault if maxres not available
                    (e.target as HTMLImageElement).src = thumbnails[2].url;
                  }}
                />
              </div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Video ID: <span className="font-mono font-bold">{videoId}</span>
              </p>
            </div>

            {/* All resolutions */}
            <div className="glass rounded-3xl p-6">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <Image className="w-5 h-5" style={{ color: "#7C3AED" }} /> All Resolutions
              </h2>
              <div className="space-y-3">
                {thumbnails.map((thumb) => (
                  <div key={thumb.quality} className="glass rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-20 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ background: "var(--bg-card)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumb.url}
                        alt={thumb.label}
                        className="w-full h-full object-cover"
                        onLoad={() => handleImageLoad(thumb.quality)}
                        onError={(e) => (e.target as HTMLImageElement).style.display = "none"}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{thumb.label}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{thumb.width} x {thumb.height}px</div>
                    </div>
                    {loadedThumbs.has(thumb.quality) && (
                      <button
                        onClick={() => handleDownload(thumb)}
                        className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                        style={{ background: "linear-gradient(135deg,#7C3AED,#2563EB)", color: "#fff" }}
                      >
                        <Download className="w-4 h-4 inline mr-1" /> Download
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="glass rounded-2xl p-5 mt-6">
              <h3 className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>Tips</h3>
              <ul className="text-xs space-y-1" style={{ color: "var(--text-muted)" }}>
                <li>Max Resolution (1280x720) may not be available for all videos</li>
                <li>If a resolution is not available, it will show a placeholder or not appear</li>
                <li>Right-click any thumbnail and select &quot;Save image as&quot; as an alternative</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
}
