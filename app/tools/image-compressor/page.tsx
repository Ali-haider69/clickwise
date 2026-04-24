"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Upload, ImageIcon, Trash2 } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

interface CompressedImage {
  name: string;
  originalSize: number;
  compressedSize: number;
  originalUrl: string;
  compressedUrl: string;
  compressedBlob: Blob;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export default function ImageCompressor() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [quality, setQuality] = useState(0.7);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/webp");
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function compressImage(file: File): Promise<CompressedImage> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let w = img.width;
          let h = img.height;

          if (w > maxWidth) {
            h = (h * maxWidth) / w;
            w = maxWidth;
          }

          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) { reject(new Error("Canvas not supported")); return; }

          ctx.drawImage(img, 0, 0, w, h);
          canvas.toBlob(
            (blob) => {
              if (!blob) { reject(new Error("Compression failed")); return; }
              resolve({
                name: file.name,
                originalSize: file.size,
                compressedSize: blob.size,
                originalUrl: e.target?.result as string,
                compressedUrl: URL.createObjectURL(blob),
                compressedBlob: blob,
              });
            },
            format,
            quality
          );
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setProcessing(true);

    const results: CompressedImage[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      try {
        const compressed = await compressImage(file);
        results.push(compressed);
      } catch {
        // skip failed files
      }
    }

    setImages((prev) => [...prev, ...results]);
    setProcessing(false);
  }

  function handleDownload(img: CompressedImage) {
    const ext = format === "image/webp" ? "webp" : format === "image/png" ? "png" : "jpg";
    const a = document.createElement("a");
    a.href = img.compressedUrl;
    a.download = img.name.replace(/\.[^.]+$/, `.${ext}`);
    a.click();
  }

  function handleDownloadAll() {
    images.forEach((img) => handleDownload(img));
  }

  function handleRemove(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function handleClear() {
    images.forEach((img) => {
      URL.revokeObjectURL(img.compressedUrl);
    });
    setImages([]);
  }

  const totalOriginal = images.reduce((s, i) => s + i.originalSize, 0);
  const totalCompressed = images.reduce((s, i) => s + i.compressedSize, 0);
  const totalSaved = totalOriginal > 0 ? Math.round((1 - totalCompressed / totalOriginal) * 100) : 0;

  const inputStyle = {
    background: "var(--bg-card)",
    border: "1.5px solid var(--border-color)",
    color: "var(--text-primary)",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Image Compressor",
    description: "Compress images without losing quality. Supports JPG, PNG, and WebP with batch processing.",
    url: "https://clickwise.website/tools/image-compressor",
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
          <span className="text-5xl mb-4 block">🗜️</span>
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: "var(--text-primary)" }}>Image Compressor</h1>
          <p style={{ color: "var(--text-secondary)" }}>Compress images without losing quality — supports JPG, PNG, and WebP</p>
        </div>

        {/* Settings */}
        <div className="glass rounded-3xl p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
                Quality: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.05}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                <span>Smaller</span><span>Better</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Max Width</label>
              <select value={maxWidth} onChange={(e) => setMaxWidth(Number(e.target.value))} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none" style={inputStyle}>
                <option value={640}>640px</option>
                <option value={1280}>1280px</option>
                <option value={1920}>1920px (Full HD)</option>
                <option value={3840}>3840px (4K)</option>
                <option value={99999}>No limit</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Output Format</label>
              <select value={format} onChange={(e) => setFormat(e.target.value as typeof format)} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none" style={inputStyle}>
                <option value="image/webp">WebP (Smallest)</option>
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
              </select>
            </div>
          </div>
        </div>

        {/* Upload zone */}
        <div
          className="glass rounded-3xl p-10 mb-6 text-center cursor-pointer transition-all hover:scale-[1.01]"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={(e) => { e.preventDefault(); e.stopPropagation(); handleFiles(e.dataTransfer.files); }}
        >
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
          <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
            {processing ? "Compressing..." : "Drop images here or click to upload"}
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Supports JPG, PNG, WebP, GIF &middot; Multiple files allowed</p>
        </div>

        {/* Results */}
        {images.length > 0 && (
          <>
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="glass rounded-2xl p-5 text-center">
                <div className="text-2xl mb-1">📁</div>
                <div className="text-xl font-black gradient-text">{images.length}</div>
                <div className="text-xs font-semibold mt-1" style={{ color: "var(--text-muted)" }}>Images</div>
              </div>
              <div className="glass rounded-2xl p-5 text-center">
                <div className="text-2xl mb-1">📉</div>
                <div className="text-xl font-black gradient-text">{totalSaved}%</div>
                <div className="text-xs font-semibold mt-1" style={{ color: "var(--text-muted)" }}>Saved</div>
              </div>
              <div className="glass rounded-2xl p-5 text-center">
                <div className="text-2xl mb-1">💾</div>
                <div className="text-xl font-black gradient-text">{formatBytes(totalOriginal - totalCompressed)}</div>
                <div className="text-xs font-semibold mt-1" style={{ color: "var(--text-muted)" }}>Reduced</div>
              </div>
            </div>

            {/* Image list */}
            <div className="space-y-3 mb-4">
              {images.map((img, i) => {
                const saved = Math.round((1 - img.compressedSize / img.originalSize) * 100);
                return (
                  <div key={i} className="glass rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ background: "var(--bg-card)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.compressedUrl} alt={img.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>{img.name}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {formatBytes(img.originalSize)} → {formatBytes(img.compressedSize)}
                        <span className="ml-2 font-bold" style={{ color: saved > 0 ? "#10B981" : "#EF4444" }}>
                          {saved > 0 ? `-${saved}%` : `+${Math.abs(saved)}%`}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => handleDownload(img)} className="p-2 rounded-xl transition-colors hover:bg-purple-500/10">
                      <Download className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                    </button>
                    <button onClick={() => handleRemove(i)} className="p-2 rounded-xl transition-colors hover:bg-red-500/10">
                      <Trash2 className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={handleDownloadAll} className="btn-primary flex-1 text-sm">
                <Download className="w-4 h-4 mr-2" /> Download All
              </button>
              <button onClick={handleClear} className="btn-ghost text-sm flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> Clear
              </button>
            </div>
          </>
        )}
      </div>
      <RelatedTools currentTool="image-compressor" />
    </div>
    </>
  );
}
