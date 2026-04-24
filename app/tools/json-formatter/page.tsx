"use client";

import { useState, useCallback } from "react";
import { Copy, Download, Check, ChevronRight, ChevronDown, FileJson } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

type ViewMode = "formatted" | "minified" | "tree";
type IndentSize = 2 | 4;

interface Stats {
  keys: number;
  depth: number;
  size: string;
}

function countKeys(obj: unknown): number {
  if (typeof obj !== "object" || obj === null) return 0;
  if (Array.isArray(obj)) {
    return obj.reduce((acc: number, item) => acc + countKeys(item), 0);
  }
  const keys = Object.keys(obj as Record<string, unknown>);
  return keys.length + keys.reduce((acc, k) => acc + countKeys((obj as Record<string, unknown>)[k]), 0);
}

function maxDepth(obj: unknown, depth = 0): number {
  if (typeof obj !== "object" || obj === null) return depth;
  if (Array.isArray(obj)) {
    return obj.reduce((max: number, item) => Math.max(max, maxDepth(item, depth + 1)), depth + 1);
  }
  const vals = Object.values(obj as Record<string, unknown>);
  if (vals.length === 0) return depth + 1;
  return vals.reduce((max: number, v) => Math.max(max, maxDepth(v, depth + 1)), depth + 1);
}

function syntaxHighlight(json: string): string {
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            return `<span style="color:#c084fc">${match}</span>`;
          }
          return `<span style="color:#4ade80">${match}</span>`;
        }
        if (/true|false/.test(match)) {
          return `<span style="color:#facc15">${match}</span>`;
        }
        if (/null/.test(match)) {
          return `<span style="color:#f87171">${match}</span>`;
        }
        return `<span style="color:#60a5fa">${match}</span>`;
      }
    );
}

interface TreeNodeProps {
  data: unknown;
  keyName?: string;
  depth?: number;
}

function TreeNode({ data, keyName, depth = 0 }: TreeNodeProps) {
  const [open, setOpen] = useState(true);
  const isObject = typeof data === "object" && data !== null;
  const isArray = Array.isArray(data);

  const renderValue = () => {
    if (typeof data === "string") return <span style={{ color: "#4ade80" }}>"{data}"</span>;
    if (typeof data === "number") return <span style={{ color: "#60a5fa" }}>{data}</span>;
    if (typeof data === "boolean") return <span style={{ color: "#facc15" }}>{String(data)}</span>;
    if (data === null) return <span style={{ color: "#f87171" }}>null</span>;
    return null;
  };

  if (!isObject) {
    return (
      <div style={{ paddingLeft: depth * 16 + "px", fontFamily: "monospace", fontSize: 13 }}>
        {keyName !== undefined && (
          <span style={{ color: "#c084fc" }}>"{keyName}": </span>
        )}
        {renderValue()}
      </div>
    );
  }

  const entries = isArray
    ? (data as unknown[]).map((v, i) => [String(i), v] as [string, unknown])
    : Object.entries(data as Record<string, unknown>);

  return (
    <div style={{ paddingLeft: depth * 16 + "px", fontFamily: "monospace", fontSize: 13 }}>
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none" }}
        onClick={() => setOpen(!open)}
      >
        <span style={{ color: "var(--text-muted)", marginRight: 2 }}>
          {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </span>
        {keyName !== undefined && (
          <span style={{ color: "#c084fc" }}>"{keyName}": </span>
        )}
        <span style={{ color: "var(--text-muted)" }}>
          {isArray ? "[" : "{"}
          {!open && (
            <span style={{ color: "var(--text-muted)" }}>
              {entries.length} {isArray ? "items" : "keys"}…{isArray ? "]" : "}"}
            </span>
          )}
        </span>
      </div>
      {open && (
        <>
          {entries.map(([k, v]) => (
            <TreeNode key={k} data={v} keyName={isArray ? undefined : k} depth={depth + 1} />
          ))}
          <div style={{ paddingLeft: 0, color: "var(--text-muted)" }}>{isArray ? "]" : "}"}</div>
        </>
      )}
    </div>
  );
}

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState<IndentSize>(2);
  const [viewMode, setViewMode] = useState<ViewMode>("formatted");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [parsedData, setParsedData] = useState<unknown>(null);

  const processJson = useCallback(
    (text: string, mode: ViewMode, indent: IndentSize) => {
      if (!text.trim()) {
        setOutput("");
        setError(null);
        setStats(null);
        setParsedData(null);
        return;
      }
      try {
        const parsed = JSON.parse(text);
        setParsedData(parsed);
        setError(null);

        const keys = countKeys(parsed);
        const depth = maxDepth(parsed);
        const bytes = new TextEncoder().encode(text).length;
        const size = bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;
        setStats({ keys, depth, size });

        if (mode === "minified") {
          setOutput(JSON.stringify(parsed));
        } else {
          setOutput(JSON.stringify(parsed, null, indent));
        }
      } catch (e) {
        setError((e as SyntaxError).message);
        setOutput("");
        setStats(null);
        setParsedData(null);
      }
    },
    []
  );

  const handleFormat = () => {
    setViewMode("formatted");
    processJson(input, "formatted", indentSize);
  };

  const handleMinify = () => {
    setViewMode("minified");
    processJson(input, "minified", indentSize);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setStats(null);
    setParsedData(null);
  };

  const handleIndentChange = (size: IndentSize) => {
    setIndentSize(size);
    if (output) processJson(input, viewMode === "minified" ? "minified" : "formatted", size);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode !== "tree") processJson(input, mode, indentSize);
    else {
      try {
        const parsed = JSON.parse(input);
        setParsedData(parsed);
        setError(null);
      } catch (e) {
        setError((e as SyntaxError).message);
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-purple-600"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft className="w-4 h-4" /> All Tools
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: "linear-gradient(135deg, #7C3AED22, #2563EB22)", border: "1px solid var(--border-color)" }}>
            <FileJson className="w-7 h-7" style={{ color: "#7C3AED" }} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3 gradient-text">JSON Formatter &amp; Validator</h1>
          <p style={{ color: "var(--text-secondary)" }}>Format, validate, and explore JSON with syntax highlighting and tree view</p>
        </div>

        {/* Stat banner */}
        <div
          className="glass rounded-2xl p-4 mb-8 text-center text-sm font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          Used by 120K+ developers&nbsp;&nbsp;·&nbsp;&nbsp;Validates instantly&nbsp;&nbsp;·&nbsp;&nbsp;Works offline
        </div>

        {/* View mode tabs */}
        <div className="flex items-center gap-2 mb-6">
          {(["formatted", "minified", "tree"] as ViewMode[]).map((m) => (
            <button
              key={m}
              onClick={() => handleViewMode(m)}
              className={viewMode === m ? "btn-primary" : "btn-ghost"}
              style={{ padding: "0.4rem 1rem", fontSize: 13 }}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left panel — input */}
          <div className="glass rounded-3xl p-6 flex flex-col gap-4">
            <label className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
              Paste your JSON
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "ClickWise", "version": 1}'
              className="w-full rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{
                minHeight: 320,
                fontFamily: "monospace",
                fontSize: 13,
                background: "var(--bg-card-hover)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
              }}
            />

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              <button className="btn-primary" onClick={handleFormat}>
                Format &amp; Validate
              </button>
              <button className="btn-ghost" onClick={handleMinify}>
                Minify
              </button>
              <button className="btn-ghost" onClick={handleClear}>
                Clear
              </button>
            </div>

            {/* Indent toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>Indent:</span>
              {([2, 4] as IndentSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => handleIndentChange(s)}
                  style={{
                    padding: "0.25rem 0.75rem",
                    fontSize: 12,
                    borderRadius: 8,
                    border: "1px solid var(--border-color)",
                    background: indentSize === s ? "linear-gradient(135deg,#7C3AED,#2563EB)" : "var(--bg-card)",
                    color: indentSize === s ? "#fff" : "var(--text-primary)",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {s} spaces
                </button>
              ))}
            </div>

            {/* Char count */}
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {input.length.toLocaleString()} characters
            </p>
          </div>

          {/* Right panel — output */}
          <div className="glass rounded-3xl p-6 flex flex-col gap-4">
            {/* Output header */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Output</span>
              <div className="flex gap-2">
                <button
                  className="btn-ghost"
                  onClick={handleCopy}
                  style={{ padding: "0.35rem 0.9rem", fontSize: 12 }}
                  disabled={!output}
                >
                  {copied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  className="btn-ghost"
                  onClick={handleDownload}
                  style={{ padding: "0.35rem 0.9rem", fontSize: 12 }}
                  disabled={!output}
                >
                  <Download size={14} className="mr-1" /> Download
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="rounded-xl p-4 text-sm"
                style={{ background: "#f871711a", border: "1px solid #f8717155", color: "#f87171" }}
              >
                <strong>Parse Error:</strong> {error}
              </div>
            )}

            {/* Tree view */}
            {!error && viewMode === "tree" && parsedData !== null && (
              <div
                className="rounded-xl p-4 overflow-auto"
                style={{
                  minHeight: 320,
                  background: "var(--bg-card-hover)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                <TreeNode data={parsedData} />
              </div>
            )}

            {/* Formatted / minified view */}
            {!error && viewMode !== "tree" && output && (
              <pre
                className="rounded-xl p-4 overflow-auto text-sm"
                style={{
                  minHeight: 320,
                  fontFamily: "monospace",
                  background: "var(--bg-card-hover)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                }}
                dangerouslySetInnerHTML={{ __html: syntaxHighlight(output) }}
              />
            )}

            {/* Empty state */}
            {!error && !output && (
              <div
                className="rounded-xl flex items-center justify-center"
                style={{
                  minHeight: 320,
                  background: "var(--bg-card-hover)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-muted)",
                  fontSize: 14,
                }}
              >
                Formatted output will appear here
              </div>
            )}

            {/* Stats bar */}
            {stats && (
              <div className="flex flex-wrap gap-4 pt-2">
                {[
                  { label: "Keys", value: stats.keys.toLocaleString() },
                  { label: "Max Depth", value: stats.depth },
                  { label: "Size", value: stats.size },
                ].map(({ label, value }) => (
                  <div key={label} className="text-xs" style={{ color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>{value}</span> {label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <RelatedTools currentTool="json-formatter" />
    </div>
  );
}
