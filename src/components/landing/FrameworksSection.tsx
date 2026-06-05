const frameworks = [
  {
    id: "hipaa",
    name: "HIPAA",
    fullName: "Health Insurance Portability & Accountability Act",
    category: "Healthcare",
    color: "#e11d48",
    bg: "#fff1f2",
    controls: 54,
    regions: ["USA"],
    desc: "Required for any software handling protected health information (PHI). Covers privacy, security, and breach notification rules.",
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    fullName: "Information Security Management System",
    category: "Information Security",
    color: "#2563eb",
    bg: "#eff6ff",
    controls: 114,
    regions: ["Global"],
    desc: "International standard for establishing, implementing, and maintaining an information security management system.",
  },
  {
    id: "soc2",
    name: "SOC 2",
    fullName: "Service Organization Control 2",
    category: "SaaS / Cloud",
    color: "#7c3aed",
    bg: "#f5f3ff",
    controls: 64,
    regions: ["USA", "Global"],
    desc: "Essential for B2B SaaS companies. Evaluates security, availability, processing integrity, confidentiality, and privacy.",
  },
  {
    id: "gdpr",
    name: "GDPR",
    fullName: "General Data Protection Regulation",
    category: "Privacy",
    color: "#059669",
    bg: "#ecfdf5",
    controls: 99,
    regions: ["EU", "EEA"],
    desc: "Comprehensive data protection law for any company processing EU citizens' data. Heavy emphasis on consent and data rights.",
  },
  {
    id: "dpdp",
    name: "DPDP",
    fullName: "Digital Personal Data Protection Act",
    category: "Privacy",
    color: "#d97706",
    bg: "#fffbeb",
    controls: 44,
    regions: ["India"],
    desc: "India's landmark data privacy law. Applies to all entities processing digital personal data in India or processing data of Indian citizens.",
  },
  {
    id: "pci",
    name: "PCI DSS",
    fullName: "Payment Card Industry Data Security Standard",
    category: "FinTech",
    color: "#0891b2",
    bg: "#ecfeff",
    controls: 251,
    regions: ["Global"],
    desc: "Required for any system that stores, processes, or transmits cardholder data. Prevents payment card fraud.",
  },
];

export function FrameworksSection() {
  return (
    <section id="frameworks" className="py-20 sm:py-32 px-6 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3.5 py-1.5 text-xs text-gray-600 font-medium mb-6 font-mono-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            supported_frameworks
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-4" style={{ letterSpacing: "-0.03em" }}>
            Every major framework.
            <br />
            <span className="font-serif-accent italic font-normal text-gray-400">One platform.</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Project June automatically detects which frameworks apply to your codebase based on
            industry, geography, and the data types you handle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {frameworks.map((fw) => (
            <div
              key={fw.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5"
                  style={{ background: fw.bg }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: fw.color }} />
                  <span className="font-display text-sm font-bold" style={{ color: fw.color }}>{fw.name}</span>
                </div>
                <span className="font-mono-accent text-xs text-gray-400 font-medium">{fw.controls} controls</span>
              </div>

              <p className="text-[10px] font-mono-accent text-gray-400 uppercase tracking-widest mb-1.5">{fw.category}</p>
              <h3 className="font-display text-sm font-semibold text-gray-900 mb-3 leading-snug" style={{ letterSpacing: "-0.01em" }}>{fw.fullName}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{fw.desc}</p>

              <div className="flex items-center gap-1.5 flex-wrap">
                {fw.regions.map((r) => (
                  <span
                    key={r}
                    className="text-xs bg-gray-50 border border-gray-100 text-gray-500 rounded-full px-2 py-0.5"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
