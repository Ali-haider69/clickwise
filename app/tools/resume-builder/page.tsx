"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Download, Eye, FileText } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string;
  experience: Experience[];
  education: Education[];
}

const TEMPLATES = [
  { id: "professional", label: "Professional", color: "#1E40AF" },
  { id: "modern", label: "Modern", color: "#7C3AED" },
  { id: "minimal", label: "Minimal", color: "#111827" },
] as const;

type Template = (typeof TEMPLATES)[number]["id"];

const uid = () => Math.random().toString(36).slice(2, 9);

const emptyResume: ResumeData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  skills: "",
  experience: [{ id: uid(), title: "", company: "", duration: "", description: "" }],
  education: [{ id: uid(), degree: "", school: "", year: "" }],
};

function generateResumeHTML(data: ResumeData, template: Template): string {
  const colors: Record<Template, { primary: string; bg: string }> = {
    professional: { primary: "#1E40AF", bg: "#EFF6FF" },
    modern: { primary: "#7C3AED", bg: "#F5F3FF" },
    minimal: { primary: "#111827", bg: "#F9FAFB" },
  };

  const c = colors[template];

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',system-ui,-apple-system,sans-serif;color:#1F2937;line-height:1.5;max-width:800px;margin:0 auto;padding:40px}
h1{font-size:28px;color:${c.primary};margin-bottom:4px}
h2{font-size:14px;text-transform:uppercase;letter-spacing:1.5px;color:${c.primary};border-bottom:2px solid ${c.primary};padding-bottom:4px;margin:24px 0 12px}
h3{font-size:16px;color:#111827}
.header{text-align:${template === "modern" ? "center" : "left"};padding-bottom:16px;border-bottom:${template === "minimal" ? "1px solid #E5E7EB" : `3px solid ${c.primary}`};margin-bottom:20px;${template === "modern" ? `background:${c.bg};margin:-40px -40px 20px;padding:40px 40px 20px;` : ""}}
.contact{font-size:13px;color:#6B7280;margin-top:6px}
.contact span{margin:0 6px}
.summary{font-size:14px;color:#374151;margin-bottom:8px}
.entry{margin-bottom:14px}
.entry-header{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap}
.entry-header .right{font-size:13px;color:#6B7280}
.entry p{font-size:13px;color:#4B5563;margin-top:4px}
.skills{display:flex;flex-wrap:wrap;gap:6px}
.skill{background:${c.bg};color:${c.primary};padding:3px 10px;border-radius:4px;font-size:12px;font-weight:600}
@media print{body{padding:20px}@page{margin:0.5in}}
</style></head><body>
<div class="header">
<h1>${data.fullName || "Your Name"}</h1>
<div class="contact">
${[data.email, data.phone, data.location].filter(Boolean).join(' <span>|</span> ')}
</div>
</div>
${data.summary ? `<h2>Summary</h2><p class="summary">${data.summary}</p>` : ""}
${data.experience.some((e) => e.title) ? `<h2>Experience</h2>${data.experience.filter((e) => e.title).map((e) => `
<div class="entry">
<div class="entry-header"><h3>${e.title}</h3><span class="right">${e.duration}</span></div>
<div style="font-size:13px;color:${c.primary};font-weight:600">${e.company}</div>
${e.description ? `<p>${e.description}</p>` : ""}
</div>`).join("")}` : ""}
${data.education.some((e) => e.degree) ? `<h2>Education</h2>${data.education.filter((e) => e.degree).map((e) => `
<div class="entry">
<div class="entry-header"><h3>${e.degree}</h3><span class="right">${e.year}</span></div>
<div style="font-size:13px;color:${c.primary};font-weight:600">${e.school}</div>
</div>`).join("")}` : ""}
${data.skills ? `<h2>Skills</h2><div class="skills">${data.skills.split(",").map((s) => `<span class="skill">${s.trim()}</span>`).join("")}</div>` : ""}
</body></html>`;
}

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(emptyResume);
  const [template, setTemplate] = useState<Template>("professional");
  const [showPreview, setShowPreview] = useState(false);

  function updateField(field: keyof ResumeData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function updateExperience(id: string, field: keyof Experience, value: string) {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  }

  function addExperience() {
    setData((prev) => ({
      ...prev,
      experience: [...prev.experience, { id: uid(), title: "", company: "", duration: "", description: "" }],
    }));
  }

  function removeExperience(id: string) {
    setData((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }));
  }

  function updateEducation(id: string, field: keyof Education, value: string) {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  }

  function addEducation() {
    setData((prev) => ({
      ...prev,
      education: [...prev.education, { id: uid(), degree: "", school: "", year: "" }],
    }));
  }

  function removeEducation(id: string) {
    setData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  }

  function handleExportPDF() {
    const html = generateResumeHTML(data, template);
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
  }

  function handleDownloadHTML() {
    const html = generateResumeHTML(data, template);
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${(data.fullName || "resume").replace(/\s+/g, "-").toLowerCase()}-resume.html`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const inputStyle = {
    background: "var(--bg-card)",
    border: "1.5px solid var(--border-color)",
    color: "var(--text-primary)",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Resume Builder",
    description: "Build a professional resume in minutes. Choose from multiple templates and export as PDF or HTML.",
    url: "https://clickwise.website/tools/resume-builder",
    applicationCategory: "BusinessApplication",
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
          <span className="text-5xl mb-4 block">📄</span>
          <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: "var(--text-primary)" }}>Resume Builder</h1>
          <p style={{ color: "var(--text-secondary)" }}>Build a professional resume in minutes — export as PDF or HTML</p>
        </div>

        {/* Template selector */}
        <div className="flex gap-3 mb-6 justify-center">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: template === t.id ? t.color : "var(--bg-card)",
                color: template === t.id ? "#fff" : "var(--text-secondary)",
                border: template === t.id ? "none" : "1.5px solid var(--border-color)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Personal Info */}
        <div className="glass rounded-3xl p-6 mb-4">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <FileText className="w-5 h-5" style={{ color: "#7C3AED" }} /> Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Full Name</label>
              <input type="text" placeholder="John Doe" value={data.fullName} onChange={(e) => updateField("fullName", e.target.value)} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Email</label>
              <input type="email" placeholder="john@example.com" value={data.email} onChange={(e) => updateField("email", e.target.value)} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Phone</label>
              <input type="tel" placeholder="+1 234 567 8900" value={data.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Location</label>
              <input type="text" placeholder="New York, NY" value={data.location} onChange={(e) => updateField("location", e.target.value)} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none" style={inputStyle} />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Professional Summary</label>
            <textarea placeholder="Brief summary of your experience and goals..." value={data.summary} onChange={(e) => updateField("summary", e.target.value)} rows={3} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none resize-none" style={inputStyle} />
          </div>
        </div>

        {/* Experience */}
        <div className="glass rounded-3xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg flex items-center gap-2" style={{ color: "var(--text-primary)" }}>Work Experience</h2>
            <button onClick={addExperience} className="text-sm font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:opacity-80">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={exp.id} className="glass rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>Experience #{i + 1}</span>
                  {data.experience.length > 1 && (
                    <button onClick={() => removeExperience(exp.id)} className="p-1 rounded-lg hover:bg-red-500/10"><Trash2 className="w-3.5 h-3.5" style={{ color: "#EF4444" }} /></button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" placeholder="Job Title" value={exp.title} onChange={(e) => updateExperience(exp.id, "title", e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle} />
                  <input type="text" placeholder="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle} />
                </div>
                <input type="text" placeholder="Duration (e.g., Jan 2022 - Present)" value={exp.duration} onChange={(e) => updateExperience(exp.id, "duration", e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none mt-3" style={inputStyle} />
                <textarea placeholder="Key responsibilities and achievements..." value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} rows={2} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none mt-3" style={inputStyle} />
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="glass rounded-3xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg flex items-center gap-2" style={{ color: "var(--text-primary)" }}>Education</h2>
            <button onClick={addEducation} className="text-sm font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:opacity-80">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={edu.id} className="glass rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>Education #{i + 1}</span>
                  {data.education.length > 1 && (
                    <button onClick={() => removeEducation(edu.id)} className="p-1 rounded-lg hover:bg-red-500/10"><Trash2 className="w-3.5 h-3.5" style={{ color: "#EF4444" }} /></button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle} />
                  <input type="text" placeholder="School" value={edu.school} onChange={(e) => updateEducation(edu.id, "school", e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle} />
                  <input type="text" placeholder="Year" value={edu.year} onChange={(e) => updateEducation(edu.id, "year", e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none" style={inputStyle} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="glass rounded-3xl p-6 mb-6">
          <h2 className="font-bold text-lg mb-4" style={{ color: "var(--text-primary)" }}>Skills</h2>
          <input type="text" placeholder="e.g., JavaScript, React, Project Management, SEO" value={data.skills} onChange={(e) => updateField("skills", e.target.value)} className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none" style={inputStyle} />
          <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>Separate skills with commas</p>
          {data.skills && (
            <div className="flex flex-wrap gap-2 mt-3">
              {data.skills.split(",").filter(Boolean).map((s, i) => (
                <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(124,58,237,0.1)", color: "#7C3AED" }}>
                  {s.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setShowPreview(!showPreview)} className="btn-ghost text-sm flex items-center gap-2 flex-1">
            <Eye className="w-4 h-4" /> {showPreview ? "Hide Preview" : "Preview"}
          </button>
          <button onClick={handleExportPDF} className="btn-primary flex-1 text-sm">
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </button>
          <button onClick={handleDownloadHTML} className="btn-ghost text-sm flex items-center gap-2 flex-1">
            <Download className="w-4 h-4" /> HTML
          </button>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="glass rounded-3xl p-2 mt-6 overflow-hidden">
            <iframe
              srcDoc={generateResumeHTML(data, template)}
              className="w-full rounded-2xl"
              style={{ height: 700, background: "#fff" }}
              title="Resume Preview"
            />
          </div>
        )}
      </div>
      <RelatedTools currentTool="resume-builder" />
    </div>
    </>
  );
}
