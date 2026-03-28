"use client";

import { useState, useMemo } from "react";
import { Copy, Download, Check, Search, Globe } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type ContentType = "JSON" | "XML" | "Text";
type ViewMode = "formatted" | "raw" | "table";

const METHOD_COLORS: Record<Method, { bg: string; color: string }> = {
  GET:    { bg: "#4ade8022", color: "#4ade80" },
  POST:   { bg: "#60a5fa22", color: "#60a5fa" },
  PUT:    { bg: "#fb923c22", color: "#fb923c" },
  DELETE: { bg: "#f8717122", color: "#f87171" },
  PATCH:  { bg: "#facc1522", color: "#facc15" },
};

function statusStyle(code: string): { background: string; color: string } {
  const n = parseInt(code);
  if (n >= 200 && n < 300) return { background: "#4ade8022", color: "#4ade80" };
  if (n >= 300 && n < 400) return { background: "#facc1522", color: "#facc15" };
  if (n >= 400 && n < 500) return { background: "#fb923c22", color: "#fb923c" };
  if (n >= 500)            return { background: "#f8717122", color: "#f87171" };
  return { background: "var(--bg-card-hover)", color: "var(--text-muted)" };
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
          if (/:$/.test(match)) return `<span style="color:#c084fc">${match}</span>`;
          return `<span style="color:#4ade80">${match}</span>`;
        }
        if (/true|false/.test(match)) return `<span style="color:#facc15">${match}</span>`;
        if (/null/.test(match))       return `<span style="color:#f87171">${match}</span>`;
        return `<span style="color:#60a5fa">${match}</span>`;
      }
    );
}

function highlightXml(xml: string): string {
  return xml
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(&lt;\/?[\w:\-]+)/g, `<span style="color:#60a5fa">$1</span>`)
    .replace(/([\w:\-]+=)/g, `<span style="color:#c084fc">$1</span>`)
    .replace(/"([^"]*)"/g, `"<span style="color:#4ade80">$1</span>"`)
    .replace(/&gt;/g, `<span style="color:#60a5fa">&gt;</span>`);
}

function prettyXml(xml: string): string {
  let formatted = "";
  let indent = 0;
  const parts = xml.replace(/>\s*</g, "><").split(">");
  parts.forEach((part) => {
    if (!part.trim()) return;
    const chunk = part + ">";
    if (chunk.match(/^<\/\w/)) indent--;
    formatted += "  ".repeat(Math.max(0, indent)) + chunk + "\n";
    if (chunk.match(/^<\w[^/]*[^/]>$/) && !chunk.match(/^<.+\/>/)) indent++;
  });
  return formatted.trim();
}

function countJsonKeys(obj: unknown): number {
  if (typeof obj !== "object" || obj === null) return 0;
  if (Array.isArray(obj)) return (obj as unknown[]).reduce((a: number, v) => a + countJsonKeys(v), 0);
  const keys = Object.keys(obj as Record<string, unknown>);
  return keys.length + keys.reduce((a, k) => a + countJsonKeys((obj as Record<string, unknown>)[k]), 0);
}

function maxJsonDepth(obj: unknown, d = 0): number {
  if (typeof obj !== "object" || obj === null) return d;
  if (Array.isArray(obj)) return (obj as unknown[]).reduce((m: number, v) => Math.max(m, maxJsonDepth(v, d + 1)), d + 1);
  const vals = Object.values(obj as Record<string, unknown>);
  if (!vals.length) return d + 1;
  return vals.reduce((m: number, v) => Math.max(m, maxJsonDepth(v, d + 1)), d + 1);
}

const EXAMPLES = [
  {
    label: "GitHub User API",
    method: "GET" as Method,
    status: "200",
    type: "JSON" as ContentType,
    body: JSON.stringify({
      login: "octocat",
      id: 1,
      avatar_url: "https://github.com/images/error/octocat_happy.gif",
      url: "https://api.github.com/users/octocat",
      name: "The Octocat",
      company: "@github",
      blog: "https://github.com/blog",
      location: "San Francisco",
      public_repos: 8,
      followers: 20,
      following: 0,
    }, null, 2),
  },
  {
    label: "Weather API",
    method: "GET" as Method,
    status: "200",
    type: "JSON" as ContentType,
    body: JSON.stringify({
      city: "London",
      temperature: { celsius: 14, fahrenheit: 57.2 },
      condition: "Partly Cloudy",
      humidity: 72,
      wind: { speed_kmh: 18, direction: "SW" },
      forecast: [
        { day: "Mon", high: 16, low: 10 },
        { day: "Tue", high: 13, low: 8 },
      ],
    }, null, 2),
  },
  {
    label: "Error 404 Response",
    method: "GET" as Method,
    status: "404",
    type: "JSON" as ContentType,
    body: JSON.stringify({
      error: "Not Found",
      status: 404,
      message: "The requested resource could not be found.",
      path: "/api/users/9999",
      timestamp: "2026-03-29T10:00:00Z",
    }, null, 2),
  },
];

export default function ApiResponseViewerPage() {
  const [input, setInput]             = useState("");
  const [method, setMethod]           = useState<Method>("GET");
  const [statusCode, setStatusCode]   = useState("");
  const [contentType, setContentType] = useState<ContentType>("JSON");
  const [parsed, setParsed]           = useState<unknown>(null);
  const [error, setError]             = useState<string | null>(null);
  const [viewMode, setViewMode]       = useState<ViewMode>("formatted");
  const [copied, setCopied]           = useState(false);
  const [searchTerm, setSearchTerm]   = useState("");

  const parseInput = (text: string, type: ContentType) => {
    if (!text.trim()) { setParsed(null); setError(null); return; }
    if (type === "JSON") {
      try {
        setParsed(JSON.parse(text));
        setError(null);
      } catch (e) {
        setError((e as SyntaxError).message);
        setParsed(null);
      }
    } else {
      setParsed(text);
      setError(null);
    }
  };

  const handleParse = () => parseInput(input, contentType);

  const handleClear = () => {
    setInput(""); setParsed(null); setError(null); setSearchTerm("");
  };

  const handleCopy = async () => {
    const text = contentType === "JSON" && parsed ? JSON.stringify(parsed, null, 2) : input;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = contentType === "JSON" && parsed ? JSON.stringify(parsed, null, 2) : input;
    const ext = contentType === "JSON" ? "json" : contentType === "XML" ? "xml" : "txt";
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `response.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadExample = (ex: typeof EXAMPLES[0]) => {
    setInput(ex.body);
    setMethod(ex.method);
    setStatusCode(ex.status);
    setContentType(ex.type);
    setError(null);
    setSearchTerm("");
    try {
      setParsed(JSON.parse(ex.body));
    } catch {
      setParsed(null);
    }
  };

  // Stats
  const stats = useMemo(() => {
    if (!parsed || contentType !== "JSON") return null;
    const keys = countJsonKeys(parsed);
    const depth = maxJsonDepth(parsed);
    const isArray = Array.isArray(parsed);
    const arrayLen = isArray ? (parsed as unknown[]).length : null;
    return { keys, depth, arrayLen };
  }, [parsed, contentType]);

  // Table view: flat array of objects
  const tableData = useMemo(() => {
    if (!parsed || !Array.isArray(parsed)) return null;
    const arr = parsed as unknown[];
    if (arr.length === 0) return null;
    if (typeof arr[0] !== "object" || arr[0] === null) return null;
    const headers = Object.keys(arr[0] as Record<string, unknown>);
    return { headers, rows: arr as Record<string, unknown>[] };
  }, [parsed]);

  // Search filter for formatted JSON
  const filteredOutput = useMemo(() => {
    if (!parsed || contentType !== "JSON") return null;
    const json = JSON.stringify(parsed, null, 2);
    if (!searchTerm.trim()) return json;
    const lower = searchTerm.toLowerCase();
    const lines = json.split("\n").filter((line) => line.toLowerCase().includes(lower));
    return lines.length > 0 ? lines.join("\n") : "(no matches)";
  }, [parsed, contentType, searchTerm]);

  const stStyle = statusCode ? statusStyle(statusCode) : { background: "var(--bg-card-hover)", color: "var(--text-muted)" };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Globe className="w-7 h-7" style={{ color: "#7C3AED" }} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3 gradient-text">API Response Viewer</h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Paste any API response to instantly format, explore, and analyse it
          </p>
        </div>

        {/* Input panel */}
        <div className="glass rounded-3xl p-6 mb-6">
          {/* Method + status row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {(Object.keys(METHOD_COLORS) as Method[]).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                style={{
                  padding: "0.3rem 0.85rem",
                  fontSize: 12,
                  fontWeight: 700,
                  borderRadius: 9999,
                  border: `1px solid ${METHOD_COLORS[m].color}44`,
                  background: method === m ? METHOD_COLORS[m].bg : "transparent",
                  color: METHOD_COLORS[m].color,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  opacity: method === m ? 1 : 0.55,
                }}
              >
                {m}
              </button>
            ))}

            <input
              type="text"
              value={statusCode}
              onChange={(e) => setStatusCode(e.target.value)}
              placeholder="Status: 200"
              maxLength={3}
              style={{
                width: 110,
                padding: "0.35rem 0.75rem",
                fontSize: 13,
                fontWeight: 700,
                borderRadius: 9999,
                border: `1px solid ${stStyle.color}55`,
                background: stStyle.background,
                color: stStyle.color,
                outline: "none",
                fontFamily: "monospace",
              }}
            />
          </div>

          {/* Content type tabs */}
          <div className="flex gap-2 mb-4">
            {(["JSON", "XML", "Text"] as ContentType[]).map((t) => (
              <button
                key={t}
                onClick={() => setContentType(t)}
                className={contentType === t ? "btn-primary" : "btn-ghost"}
                style={{ padding: "0.3rem 0.9rem", fontSize: 12 }}
              >
                {t}
              </button>
            ))}
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your API response here..."
            className="w-full rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{
              minHeight: 200,
              fontFamily: "monospace",
              fontSize: 13,
              background: "var(--bg-card-hover)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
            }}
          />

          <div className="flex flex-wrap gap-2 mt-4">
            <button className="btn-primary" onClick={handleParse}>Parse &amp; View</button>
            <button className="btn-ghost" onClick={handleClear}>Clear</button>
          </div>
        </div>

        {/* Example loaders */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs self-center" style={{ color: "var(--text-muted)" }}>Load example:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              className="btn-ghost"
              style={{ padding: "0.3rem 0.9rem", fontSize: 12 }}
              onClick={() => loadExample(ex)}
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div
            className="glass rounded-2xl p-4 mb-6 text-sm"
            style={{ background: "#f871711a", border: "1px solid #f8717155", color: "#f87171" }}
          >
            <strong>Parse Error:</strong> {error}
          </div>
        )}

        {/* Output panel */}
        {parsed !== null && !error && (
          <div className="glass rounded-3xl p-6">
            {/* Output controls */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {/* View mode */}
              <div className="flex gap-1">
                {(["formatted", "raw", "table"] as ViewMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setViewMode(m)}
                    className={viewMode === m ? "btn-primary" : "btn-ghost"}
                    style={{ padding: "0.3rem 0.85rem", fontSize: 12 }}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>

              <div className="flex-1" />

              {/* Search */}
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-1.5"
                style={{ background: "var(--bg-card-hover)", border: "1px solid var(--border-color)" }}
              >
                <Search size={13} style={{ color: "var(--text-muted)" }} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search keys / values..."
                  style={{ background: "transparent", border: "none", outline: "none", fontSize: 12, color: "var(--text-primary)", width: 160 }}
                />
              </div>

              <button
                className="btn-ghost"
                style={{ padding: "0.3rem 0.8rem", fontSize: 12 }}
                onClick={handleCopy}
              >
                {copied ? <Check size={13} className="mr-1" /> : <Copy size={13} className="mr-1" />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                className="btn-ghost"
                style={{ padding: "0.3rem 0.8rem", fontSize: 12 }}
                onClick={handleDownload}
              >
                <Download size={13} className="mr-1" /> Download
              </button>
            </div>

            {/* Table view */}
            {viewMode === "table" && tableData ? (
              <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border-color)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "var(--bg-card-hover)" }}>
                      {tableData.headers.map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "0.6rem 1rem",
                            textAlign: "left",
                            fontWeight: 700,
                            color: "#c084fc",
                            borderBottom: "1px solid var(--border-color)",
                            fontFamily: "monospace",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.rows.map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        {tableData.headers.map((h) => {
                          const v = row[h];
                          const display = v === null ? "null" : typeof v === "object" ? JSON.stringify(v) : String(v);
                          return (
                            <td
                              key={h}
                              style={{
                                padding: "0.5rem 1rem",
                                color: "var(--text-primary)",
                                fontFamily: "monospace",
                                maxWidth: 200,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {display}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : viewMode === "table" && !tableData ? (
              <div
                className="rounded-xl p-4 text-sm text-center"
                style={{ background: "var(--bg-card-hover)", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
              >
                Table view requires a JSON array of objects at the top level.
              </div>
            ) : viewMode === "raw" ? (
              <pre
                className="rounded-xl p-4 overflow-auto text-sm"
                style={{
                  fontFamily: "monospace",
                  background: "var(--bg-card-hover)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  maxHeight: 480,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                }}
              >
                {input}
              </pre>
            ) : contentType === "JSON" ? (
              <pre
                className="rounded-xl p-4 overflow-auto text-sm"
                style={{
                  fontFamily: "monospace",
                  background: "var(--bg-card-hover)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  maxHeight: 480,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                }}
                dangerouslySetInnerHTML={{ __html: syntaxHighlight(filteredOutput ?? "") }}
              />
            ) : contentType === "XML" ? (
              <pre
                className="rounded-xl p-4 overflow-auto text-sm"
                style={{
                  fontFamily: "monospace",
                  background: "var(--bg-card-hover)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  maxHeight: 480,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                }}
                dangerouslySetInnerHTML={{ __html: highlightXml(prettyXml(input)) }}
              />
            ) : (
              <pre
                className="rounded-xl p-4 overflow-auto text-sm"
                style={{
                  fontFamily: "monospace",
                  background: "var(--bg-card-hover)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  maxHeight: 480,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                }}
              >
                {input}
              </pre>
            )}

            {/* Stats */}
            {stats && (
              <div className="flex flex-wrap gap-4 mt-4">
                {[
                  { label: "Keys", value: stats.keys.toLocaleString() },
                  { label: "Max Depth", value: stats.depth },
                  ...(stats.arrayLen !== null ? [{ label: "Array Length", value: stats.arrayLen }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="text-xs" style={{ color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>{value}</span> {label}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
