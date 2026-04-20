"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check, RefreshCw, Shield, ShieldCheck, ShieldAlert } from "lucide-react";

const CHARSETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function getStrength(password: string): { label: string; score: number; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", score: 1, color: "#EF4444" };
  if (score <= 3) return { label: "Fair", score: 2, color: "#F59E0B" };
  if (score <= 4) return { label: "Good", score: 3, color: "#3B82F6" };
  if (score <= 5) return { label: "Strong", score: 4, color: "#10B981" };
  return { label: "Very Strong", score: 5, color: "#059669" };
}

function estimateCrackTime(password: string): string {
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/\d/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;
  if (poolSize === 0) return "Instant";

  const combinations = Math.pow(poolSize, password.length);
  const guessesPerSecond = 1e10; // 10 billion guesses/sec
  const seconds = combinations / guessesPerSecond;

  if (seconds < 1) return "Instant";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000 * 1000) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 31536000 * 1e6) return `${Math.round(seconds / 31536000 / 1000)}K years`;
  if (seconds < 31536000 * 1e9) return `${Math.round(seconds / 31536000 / 1e6)}M years`;
  return "Billions of years";
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const generatePassword = useCallback(() => {
    let chars = "";
    if (useLower) chars += CHARSETS.lowercase;
    if (useUpper) chars += CHARSETS.uppercase;
    if (useNumbers) chars += CHARSETS.numbers;
    if (useSymbols) chars += CHARSETS.symbols;

    if (!chars) {
      setPassword("");
      return;
    }

    if (excludeAmbiguous) {
      chars = chars.replace(/[0OIl1|]/g, "");
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }

    setPassword(result);
    setCopied(false);
    setHistory((prev) => [result, ...prev.slice(0, 4)]);
  }, [length, useLower, useUpper, useNumbers, useSymbols, excludeAmbiguous]);

  function handleCopy(text?: string) {
    const toCopy = text || password;
    if (!toCopy) return;
    navigator.clipboard.writeText(toCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const strength = password ? getStrength(password) : null;
  const crackTime = password ? estimateCrackTime(password) : null;

  const StrengthIcon = strength?.score === 5 ? ShieldCheck : strength && strength.score >= 3 ? Shield : ShieldAlert;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Password Generator",
    description: "Generate strong, secure passwords using cryptographic randomness. Includes strength meter and crack time estimate.",
    url: "https://clickwise.website/tools/password-generator",
    applicationCategory: "SecurityApplication",
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
          <span className="text-5xl mb-4 block">🔐</span>
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: "var(--text-primary)" }}>Password Generator</h1>
          <p style={{ color: "var(--text-secondary)" }}>Generate strong, secure passwords using cryptographic randomness</p>
        </div>

        {/* Settings */}
        <div className="glass rounded-3xl p-6 mb-6">
          {/* Length slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Password Length</label>
              <span className="text-sm font-black gradient-text">{length}</span>
            </div>
            <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-purple-600" />
            <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              <span>4</span><span>64</span>
            </div>
          </div>

          {/* Character options */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {[
              { label: "Lowercase (a-z)", checked: useLower, set: setUseLower },
              { label: "Uppercase (A-Z)", checked: useUpper, set: setUseUpper },
              { label: "Numbers (0-9)", checked: useNumbers, set: setUseNumbers },
              { label: "Symbols (!@#$)", checked: useSymbols, set: setUseSymbols },
              { label: "Exclude Ambiguous", checked: excludeAmbiguous, set: setExcludeAmbiguous },
            ].map(({ label, checked, set }) => (
              <label key={label} className="glass rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all hover:scale-[1.02]">
                <input type="checkbox" checked={checked} onChange={(e) => set(e.target.checked)} className="w-4 h-4 accent-purple-600 rounded" />
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{label}</span>
              </label>
            ))}
          </div>

          <button onClick={generatePassword} className="btn-primary w-full text-base">
            <RefreshCw className="w-4 h-4 mr-2" /> Generate Password
          </button>
        </div>

        {/* Generated password */}
        {password && (
          <>
            <div className="glass rounded-3xl p-6 mb-4">
              <div
                className="w-full rounded-xl px-4 py-4 text-center font-mono text-lg sm:text-xl font-bold break-all select-all"
                style={{ background: "var(--bg-card)", border: "1.5px solid var(--border-color)", color: "var(--text-primary)" }}
              >
                {password}
              </div>
              <div className="flex items-center justify-center gap-3 mt-4">
                <button onClick={() => handleCopy()} className="btn-primary text-sm">
                  {copied ? <><Check className="w-4 h-4 mr-2" /> Copied!</> : <><Copy className="w-4 h-4 mr-2" /> Copy</>}
                </button>
                <button onClick={generatePassword} className="btn-ghost text-sm flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Regenerate
                </button>
              </div>
            </div>

            {/* Strength meter */}
            {strength && (
              <div className="glass rounded-2xl p-5 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <StrengthIcon className="w-5 h-5" style={{ color: strength.color }} />
                  <span className="font-bold" style={{ color: strength.color }}>{strength.label}</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--border-color)" }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(strength.score / 5) * 100}%`, background: strength.color }} />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Time to Crack</div>
                    <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{crackTime}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Characters</div>
                    <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{password.length}</div>
                  </div>
                </div>
              </div>
            )}

            {/* History */}
            {history.length > 1 && (
              <div className="glass rounded-3xl p-6">
                <h2 className="font-bold text-sm mb-3" style={{ color: "var(--text-muted)" }}>Recent Passwords</h2>
                <div className="space-y-2">
                  {history.slice(1).map((pw, i) => (
                    <div key={i} className="flex items-center gap-3 glass rounded-xl p-3">
                      <span className="font-mono text-xs truncate flex-1" style={{ color: "var(--text-secondary)" }}>{pw}</span>
                      <button onClick={() => handleCopy(pw)} className="p-1.5 rounded-lg transition-colors hover:bg-purple-500/10">
                        <Copy className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </>
  );
}
