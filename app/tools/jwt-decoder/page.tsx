"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Check, ShieldAlert, KeyRound } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type ActiveTab = "header" | "payload" | "signature";

interface Decoded {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

function base64urlDecode(str: string): string {
  let s = str.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4 !== 0) s += "=";
  return atob(s);
}

function syntaxHighlight(obj: Record<string, unknown>): string {
  const json = JSON.stringify(obj, null, 2);
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        if (/^"/.test(match)) {
          if (/:$/.test(match)) return `<span style="color:#c084fc">${match}</span>`;
          return `<span style="color:#4ade80">${match}</span>`;
        }
        if (/true|false/.test(match)) return `<span style="color:#facc15">${match}</span>`;
        if (/null/.test(match)) return `<span style="color:#f87171">${match}</span>`;
        return `<span style="color:#60a5fa">${match}</span>`;
      }
    );
}

function formatUnix(ts: number): string {
  return new Date(ts * 1000).toLocaleString();
}

function getExpiryClaim(exp: number) {
  const now = Math.floor(Date.now() / 1000);
  const diff = exp - now;
  const absDays = Math.abs(Math.round(diff / 86400));
  if (diff < 0) return { label: `Expired ${absDays} day${absDays !== 1 ? "s" : ""} ago`, expired: true };
  return { label: `Expires in ${absDays} day${absDays !== 1 ? "s" : ""}`, expired: false };
}

const SPECIAL_CLAIMS: { key: string; label: string }[] = [
  { key: "iss", label: "Issuer" },
  { key: "sub", label: "Subject" },
  { key: "exp", label: "Expiry" },
  { key: "iat", label: "Issued At" },
  { key: "nbf", label: "Not Before" },
];

export default function JwtDecoderPage() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<Decoded | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("header");
  const [copied, setCopied] = useState<string | null>(null);

  const decode = useCallback((t: string) => {
    const trimmed = t.trim();
    if (!trimmed) {
      setDecoded(null);
      setError(null);
      return;
    }
    const parts = trimmed.split(".");
    if (parts.length !== 3) {
      setError("Invalid JWT: must have exactly 3 parts separated by dots.");
      setDecoded(null);
      return;
    }
    try {
      const header = JSON.parse(base64urlDecode(parts[0]));
      const payload = JSON.parse(base64urlDecode(parts[1]));
      setDecoded({ header, payload, signature: parts[2] });
      setError(null);
    } catch {
      setError("Failed to decode token. Make sure it is a valid JWT.");
      setDecoded(null);
    }
  }, []);

  // Debounced auto-decode
  useEffect(() => {
    const id = setTimeout(() => decode(token), 350);
    return () => clearTimeout(id);
  }, [token, decode]);

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const parts = token.trim().split(".");
  const hasParts = parts.length === 3;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-purple-600"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft className="w-4 h-4" /> All Tools
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ background: "linear-gradient(135deg, #7C3AED22, #2563EB22)", border: "1px solid var(--border-color)" }}
          >
            <KeyRound className="w-7 h-7" style={{ color: "#7C3AED" }} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3 gradient-text">JWT Decoder Tool</h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Decode any JSON Web Token instantly — see header, payload, and expiry
          </p>
        </div>

        {/* Security notice */}
        <div
          className="glass rounded-2xl p-4 mb-6 flex items-start gap-3"
          style={{ border: "1px solid #eab30855" }}
        >
          <ShieldAlert className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#eab308" }} />
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            <strong style={{ color: "#eab308" }}>Security Notice:</strong> This tool decodes JWT tokens
            client-side only. Never paste production tokens containing sensitive data.
          </p>
        </div>

        {/* Input */}
        <div className="glass rounded-3xl p-6 mb-6">
          <label className="block font-semibold text-sm mb-3" style={{ color: "var(--text-primary)" }}>
            Paste your JWT token here
          </label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            className="w-full rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{
              minHeight: 100,
              fontFamily: "monospace",
              fontSize: 13,
              background: "var(--bg-card-hover)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
              wordBreak: "break-all",
            }}
          />
          <div className="flex gap-2 mt-4">
            <button className="btn-primary" onClick={() => decode(token)}>
              Decode Token
            </button>
            <button className="btn-ghost" onClick={() => { setToken(""); setDecoded(null); setError(null); }}>
              Clear
            </button>
          </div>
        </div>

        {/* Token structure visualization */}
        {hasParts && token.trim().length > 0 && (
          <div className="glass rounded-2xl p-4 mb-6 overflow-x-auto">
            <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-muted)" }}>TOKEN STRUCTURE</p>
            <div className="flex flex-wrap gap-1 items-center text-xs font-mono">
              <span
                className="px-2 py-1 rounded-lg"
                style={{ background: "#c084fc22", color: "#c084fc", border: "1px solid #c084fc44", wordBreak: "break-all", maxWidth: "30%" }}
              >
                {parts[0]}
              </span>
              <span style={{ color: "var(--text-muted)" }}>.</span>
              <span
                className="px-2 py-1 rounded-lg"
                style={{ background: "#60a5fa22", color: "#60a5fa", border: "1px solid #60a5fa44", wordBreak: "break-all", maxWidth: "40%" }}
              >
                {parts[1]}
              </span>
              <span style={{ color: "var(--text-muted)" }}>.</span>
              <span
                className="px-2 py-1 rounded-lg"
                style={{ background: "#4ade8022", color: "#4ade80", border: "1px solid #4ade8044", wordBreak: "break-all", maxWidth: "25%" }}
              >
                {parts[2]}
              </span>
            </div>
            <div className="flex gap-4 mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
              <span style={{ color: "#c084fc" }}>■ Header</span>
              <span style={{ color: "#60a5fa" }}>■ Payload</span>
              <span style={{ color: "#4ade80" }}>■ Signature</span>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="glass rounded-2xl p-4 mb-6 text-sm"
            style={{ background: "#f871711a", border: "1px solid #f8717155", color: "#f87171" }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Decoded sections */}
        {decoded && (
          <div className="glass rounded-3xl p-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {(["header", "payload", "signature"] as ActiveTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={activeTab === tab ? "btn-primary" : "btn-ghost"}
                  style={{ padding: "0.4rem 1rem", fontSize: 13, textTransform: "capitalize" }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Header tab */}
            {activeTab === "header" && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Header</span>
                  <button
                    className="btn-ghost"
                    style={{ padding: "0.3rem 0.8rem", fontSize: 12 }}
                    onClick={() => handleCopy(JSON.stringify(decoded.header, null, 2), "header")}
                  >
                    {copied === "header" ? <Check size={13} className="mr-1" /> : <Copy size={13} className="mr-1" />}
                    {copied === "header" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre
                  className="rounded-xl p-4 text-sm overflow-auto"
                  style={{
                    fontFamily: "monospace",
                    background: "var(--bg-card-hover)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                  dangerouslySetInnerHTML={{ __html: syntaxHighlight(decoded.header) }}
                />
              </div>
            )}

            {/* Payload tab */}
            {activeTab === "payload" && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Payload</span>
                  <button
                    className="btn-ghost"
                    style={{ padding: "0.3rem 0.8rem", fontSize: 12 }}
                    onClick={() => handleCopy(JSON.stringify(decoded.payload, null, 2), "payload")}
                  >
                    {copied === "payload" ? <Check size={13} className="mr-1" /> : <Copy size={13} className="mr-1" />}
                    {copied === "payload" ? "Copied!" : "Copy"}
                  </button>
                </div>

                {/* Special claims chips */}
                {SPECIAL_CLAIMS.some((c) => decoded.payload[c.key] !== undefined) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {SPECIAL_CLAIMS.map(({ key, label }) => {
                      const val = decoded.payload[key];
                      if (val === undefined) return null;
                      const isTime = key === "exp" || key === "iat" || key === "nbf";
                      const tsNum = isTime ? Number(val) : null;

                      return (
                        <div
                          key={key}
                          className="glass rounded-xl px-3 py-2 text-xs"
                          style={{ border: "1px solid var(--border-color)" }}
                        >
                          <span className="font-semibold" style={{ color: "var(--text-muted)" }}>{label}: </span>
                          <span style={{ color: "var(--text-primary)", fontFamily: "monospace" }}>
                            {isTime && tsNum ? formatUnix(tsNum) : String(val)}
                          </span>
                          {key === "exp" && tsNum && (() => {
                            const { label: exLabel, expired } = getExpiryClaim(tsNum);
                            return (
                              <span
                                className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold"
                                style={{
                                  background: expired ? "#f871711a" : "#4ade8022",
                                  color: expired ? "#f87171" : "#4ade80",
                                  border: expired ? "1px solid #f8717155" : "1px solid #4ade8055",
                                }}
                              >
                                {expired ? "EXPIRED" : exLabel}
                              </span>
                            );
                          })()}
                        </div>
                      );
                    })}
                  </div>
                )}

                <pre
                  className="rounded-xl p-4 text-sm overflow-auto"
                  style={{
                    fontFamily: "monospace",
                    background: "var(--bg-card-hover)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                  dangerouslySetInnerHTML={{ __html: syntaxHighlight(decoded.payload) }}
                />
              </div>
            )}

            {/* Signature tab */}
            {activeTab === "signature" && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Signature</span>
                  <button
                    className="btn-ghost"
                    style={{ padding: "0.3rem 0.8rem", fontSize: 12 }}
                    onClick={() => handleCopy(decoded.signature, "signature")}
                  >
                    {copied === "signature" ? <Check size={13} className="mr-1" /> : <Copy size={13} className="mr-1" />}
                    {copied === "signature" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div
                  className="rounded-xl p-4 text-sm mb-4"
                  style={{
                    fontFamily: "monospace",
                    background: "var(--bg-card-hover)",
                    border: "1px solid var(--border-color)",
                    color: "#4ade80",
                    wordBreak: "break-all",
                  }}
                >
                  {decoded.signature}
                </div>
                <div
                  className="glass rounded-xl p-4 text-sm flex items-start gap-3"
                  style={{ border: "1px solid #60a5fa44" }}
                >
                  <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#60a5fa" }} />
                  <p style={{ color: "var(--text-secondary)" }}>
                    Signature verification requires the secret key and cannot be done client-side.
                    This tool only decodes the token structure.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
