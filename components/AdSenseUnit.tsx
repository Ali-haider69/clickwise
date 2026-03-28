"use client";

interface AdSenseUnitProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export default function AdSenseUnit({
  format = "auto",
  className = "",
}: AdSenseUnitProps) {
  // Ad slots commented out — uncomment the return below when AdSense is ready
  return null;

  /* return (
    <div
      className={`glass rounded-2xl flex items-center justify-center text-xs font-medium ${
        format === "rectangle" ? "min-h-[250px]" : "min-h-[90px]"
      } ${className}`}
      style={{ color: "var(--text-muted)" }}
    >
      <div className="text-center">
        <div className="mb-1" style={{ color: "var(--text-muted)" }}>Advertisement</div>
        <div className="text-[10px]" style={{ color: "var(--border-color)" }}>Google AdSense Unit</div>
      </div>
    </div>
  ); */
}
