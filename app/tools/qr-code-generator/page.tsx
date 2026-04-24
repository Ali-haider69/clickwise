"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Copy, Check, QrCode } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

const TABS = ["URL", "Text", "Email", "WiFi", "Phone"] as const;
type Tab = (typeof TABS)[number];

export default function QRCodeGenerator() {
  const [tab, setTab] = useState<Tab>("URL");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [email, setEmail] = useState({ to: "", subject: "", body: "" });
  const [wifi, setWifi] = useState({ ssid: "", password: "", encryption: "WPA" });
  const [phone, setPhone] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState(256);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function getData(): string {
    switch (tab) {
      case "URL": return url;
      case "Text": return text;
      case "Email": return `mailto:${email.to}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
      case "WiFi": return `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};;`;
      case "Phone": return `tel:${phone}`;
    }
  }

  const generate = useCallback(async () => {
    setError("");
    setCopied(false);
    const data = getData();
    if (!data || (tab === "URL" && !url) || (tab === "Text" && !text) || (tab === "Email" && !email.to) || (tab === "WiFi" && !wifi.ssid) || (tab === "Phone" && !phone)) {
      setError("Please fill in the required fields.");
      return;
    }

    try {
      const QRCode = (await import("qrcode")).default;
      const dataUrl = await QRCode.toDataURL(data, {
        width: size,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: "H",
      });
      setQrDataUrl(dataUrl);
    } catch {
      setError("Failed to generate QR code. Check your input.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, url, text, email, wifi, phone, fgColor, bgColor, size]);

  function handleDownload() {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `qrcode-${Date.now()}.png`;
    a.click();
  }

  function handleCopy() {
    if (!qrDataUrl) return;
    fetch(qrDataUrl)
      .then((r) => r.blob())
      .then((blob) => navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]))
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); })
      .catch(() => {});
  }

  const inputStyle = {
    background: "var(--bg-card)",
    border: "1.5px solid var(--border-color)",
    color: "var(--text-primary)",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free QR Code Generator",
    description: "Generate custom QR codes for URLs, text, WiFi, email, and phone numbers. Customize colors and download as PNG.",
    url: "https://clickwise.website/tools/qr-code-generator",
    applicationCategory: "UtilitiesApplication",
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
          <span className="text-5xl mb-4 block">📱</span>
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: "var(--text-primary)" }}>QR Code Generator</h1>
          <p style={{ color: "var(--text-secondary)" }}>Generate custom QR codes for URLs, text, WiFi, email, and phone numbers</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setQrDataUrl(""); setError(""); }}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: tab === t ? "linear-gradient(135deg,#7C3AED,#2563EB)" : "var(--bg-card)",
                color: tab === t ? "#fff" : "var(--text-secondary)",
                border: tab === t ? "none" : "1.5px solid var(--border-color)",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Input section */}
        <div className="glass rounded-3xl p-6 mb-6">
          {tab === "URL" && (
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Website URL</label>
              <input type="url" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none" style={inputStyle} />
            </div>
          )}
          {tab === "Text" && (
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Text Content</label>
              <textarea placeholder="Enter any text..." value={text} onChange={(e) => setText(e.target.value)} rows={4} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none resize-none" style={inputStyle} />
            </div>
          )}
          {tab === "Email" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Email Address</label>
                <input type="email" placeholder="name@example.com" value={email.to} onChange={(e) => setEmail({ ...email, to: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none" style={inputStyle} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Subject</label>
                <input type="text" placeholder="Email subject" value={email.subject} onChange={(e) => setEmail({ ...email, subject: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none" style={inputStyle} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Body</label>
                <textarea placeholder="Email body..." value={email.body} onChange={(e) => setEmail({ ...email, body: e.target.value })} rows={3} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none resize-none" style={inputStyle} />
              </div>
            </div>
          )}
          {tab === "WiFi" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Network Name (SSID)</label>
                <input type="text" placeholder="My WiFi Network" value={wifi.ssid} onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none" style={inputStyle} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Password</label>
                <input type="text" placeholder="WiFi password" value={wifi.password} onChange={(e) => setWifi({ ...wifi, password: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none" style={inputStyle} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Encryption</label>
                <select value={wifi.encryption} onChange={(e) => setWifi({ ...wifi, encryption: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none" style={inputStyle}>
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </div>
            </div>
          )}
          {tab === "Phone" && (
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Phone Number</label>
              <input type="tel" placeholder="+1 234 567 8900" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none" style={inputStyle} />
            </div>
          )}

          {/* Customization */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>QR Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0" />
                <span className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>{fgColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Background</label>
              <div className="flex items-center gap-3">
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0" />
                <span className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>{bgColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Size</label>
              <select value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none" style={inputStyle}>
                <option value={128}>128 x 128</option>
                <option value={256}>256 x 256</option>
                <option value={512}>512 x 512</option>
                <option value={1024}>1024 x 1024</option>
              </select>
            </div>
          </div>

          {error && <p className="mt-4 text-sm font-medium" style={{ color: "#EF4444" }}>{error}</p>}

          <button onClick={generate} className="btn-primary mt-6 w-full text-base">
            <QrCode className="w-4 h-4 mr-2" /> Generate QR Code
          </button>
        </div>

        {/* Result */}
        {qrDataUrl && (
          <div className="glass rounded-3xl p-6 text-center">
            <div className="inline-block p-4 rounded-2xl mb-6" style={{ background: bgColor }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="Generated QR Code" width={size > 512 ? 512 : size} height={size > 512 ? 512 : size} className="mx-auto" />
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex items-center justify-center gap-3">
              <button onClick={handleDownload} className="btn-primary text-sm">
                <Download className="w-4 h-4 mr-2" /> Download PNG
              </button>
              <button onClick={handleCopy} className="btn-ghost text-sm flex items-center gap-2">
                {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>
            <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
              {size} x {size}px &middot; PNG &middot; High error correction
            </p>
          </div>
        )}
      </div>
      <RelatedTools currentTool="qr-code-generator" />
    </div>
    </>
  );
}
