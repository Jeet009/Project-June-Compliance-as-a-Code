import { getMode } from "@/lib/mode";
import { ModeBadge } from "@/components/dashboard/InDevelopment";

const frameworks = [
  { id: "hipaa", label: "HIPAA", fullName: "Health Insurance Portability & Accountability Act", color: "#e11d48", bg: "#fff1f2", controls: 54, category: "Healthcare", active: true },
  { id: "iso27001", label: "ISO 27001", fullName: "Information Security Management System", color: "#2563eb", bg: "#eff6ff", controls: 114, category: "Information Security", active: true },
  { id: "soc2", label: "SOC 2", fullName: "Service Organization Control 2", color: "#7c3aed", bg: "#f5f3ff", controls: 64, category: "SaaS / Cloud", active: false },
  { id: "gdpr", label: "GDPR", fullName: "General Data Protection Regulation", color: "#059669", bg: "#ecfdf5", controls: 99, category: "Privacy", active: true },
  { id: "dpdp", label: "DPDP", fullName: "Digital Personal Data Protection Act", color: "#d97706", bg: "#fffbeb", controls: 44, category: "Privacy", active: false },
  { id: "pci", label: "PCI DSS", fullName: "Payment Card Industry Data Security Standard", color: "#0891b2", bg: "#ecfeff", controls: 251, category: "FinTech", active: false },
];

export default async function FrameworksPage() {
  const mode = await getMode();

  return (
    <div className="p-5 sm:p-8 max-w-[1200px]">
      <div className="mb-8 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold text-gray-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>Frameworks</h1>
          <ModeBadge mode={mode} />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {mode === "demo"
            ? "Configure which compliance frameworks are applied to your scans."
            : "Reference knowledge base of supported frameworks. Per-workspace activation ships with the scanning engine."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {frameworks.map((fw) => (
          <div
            key={fw.id}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2"
                style={{ background: fw.bg }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: fw.color }} />
                <span className="font-display text-sm font-bold leading-none" style={{ color: fw.color }}>{fw.label}</span>
              </div>
              {mode === "demo" && (
                <div
                  className={`relative w-9 h-5 rounded-full transition-all cursor-pointer ${fw.active ? "bg-black" : "bg-gray-200"}`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${fw.active ? "left-4" : "left-0.5"}`}
                  />
                </div>
              )}
            </div>
            <p className="font-mono-accent text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">{fw.category}</p>
            <h3 className="font-display text-sm font-semibold text-gray-900 mb-3 leading-snug">{fw.fullName}</h3>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-mono-accent">{fw.controls} controls</span>
              {mode === "demo" && (
                <span className={fw.active ? "text-green-600 font-medium" : "text-gray-400"}>
                  {fw.active ? "Active" : "Inactive"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
