"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400 mb-6">
            <Mail className="w-4 h-4" /> Get in Touch
          </div>
          <h1 className="text-4xl font-black mb-4">
            <span className="gradient-text">Contact Us</span>
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Have a question, partnership inquiry, or want to suggest a review? We'd love to hear from you.
          </p>
        </div>

        {submitted ? (
          <div className="glass rounded-3xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Message Sent!</h2>
            <p style={{ color: "var(--text-muted)" }}>We typically respond within 24–48 hours. Thanks for reaching out.</p>
          </div>
        ) : (
          <div className="glass rounded-3xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    style={{ color: "var(--text-primary)" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    style={{ color: "var(--text-primary)" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  style={{ color: form.subject ? "var(--text-primary)" : "var(--text-muted)", background: "var(--bg-card)" }}
                >
                  <option value="">Select a topic</option>
                  <option>General Inquiry</option>
                  <option>Partnership / Sponsorship</option>
                  <option>Suggest a Review</option>
                  <option>Report an Error</option>
                  <option>Press Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what's on your mind..."
                  className="w-full glass rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                  style={{ color: "var(--text-primary)", fontFamily: "inherit" }}
                />
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>

            <div className="mt-8 pt-6 flex items-center gap-3 text-sm" style={{ borderTop: "1px solid var(--border-color)", color: "var(--text-muted)" }}>
              <MessageSquare className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <span>We respond to all messages within 24–48 hours. For urgent matters, include "URGENT" in your subject line.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
