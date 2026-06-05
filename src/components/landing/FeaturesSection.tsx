const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Deep code analysis",
    desc: "Our agent reads your actual source code — not just configs. It understands encryption usage, auth patterns, data handling, and logging across your full codebase.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Multi-framework support",
    desc: "HIPAA, ISO 27001, SOC 2 Type II, GDPR, DPDP, PCI-DSS, and more. Each framework has a curated knowledge base that maps controls to code evidence.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Evidence-backed reports",
    desc: "Every gap and control is linked to exact file paths, line numbers, and evidence snippets. Auditors get what they need, engineers know exactly what to fix.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Auto-categorization",
    desc: "Project June detects your industry from the codebase — FinTech, HealthTech, EdTech, SaaS — and pre-selects the most relevant compliance frameworks automatically.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "GitHub native",
    desc: "Connect with your GitHub account in one click. Analyze any repo you have access to, private or public. No code leaves your infrastructure unless you choose.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: "Fix recommendations",
    desc: "Not just gaps — Project June generates actionable remediation steps with code examples specific to your stack, so your team can fix issues directly.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3.5 py-1.5 text-xs text-gray-600 font-medium mb-6 font-mono-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            how_it_works
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-4" style={{ letterSpacing: "-0.03em" }}>
            Compliance that works{" "}
            <span className="font-serif-accent italic font-normal text-gray-400">the way</span>
            <br />
            engineers actually do
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            No more spreadsheets and checkbox exercises. Project June reads your code like a senior
            security engineer would — open source, transparent, and self-hostable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl border border-gray-100 p-6 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 mb-4 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">
                {icon}
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-2" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
