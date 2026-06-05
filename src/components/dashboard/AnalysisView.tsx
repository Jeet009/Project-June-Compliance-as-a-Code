"use client";

import { useState } from "react";

const frameworks = [
  { id: "hipaa", label: "HIPAA", color: "#e11d48", bg: "#fff1f2", desc: "Healthcare data protection" },
  { id: "iso27001", label: "ISO 27001", color: "#2563eb", bg: "#eff6ff", desc: "Information security" },
  { id: "soc2", label: "SOC 2", color: "#7c3aed", bg: "#f5f3ff", desc: "Service organization controls" },
  { id: "gdpr", label: "GDPR", color: "#059669", bg: "#ecfdf5", desc: "EU data privacy" },
  { id: "dpdp", label: "DPDP", color: "#d97706", bg: "#fffbeb", desc: "India data protection" },
  { id: "pci", label: "PCI DSS", color: "#0891b2", bg: "#ecfeff", desc: "Payment security" },
];

const mockFindings = [
  {
    id: "f1",
    control: "§164.312(a)(1)",
    title: "Access control — unique user identification",
    desc: "No per-user access control found in database queries. All DB calls use a shared service account.",
    severity: "critical",
    framework: "hipaa",
    file: "src/db/client.ts",
    line: 23,
    recommendation: "Implement row-level security or user-scoped database connections. Consider using Prisma's middleware to inject user context into all queries.",
  },
  {
    id: "f2",
    control: "§164.312(b)",
    title: "Audit controls — activity logging",
    desc: "Failed authentication attempts are not logged. Successful logins log user ID but not IP address or device.",
    severity: "high",
    framework: "hipaa",
    file: "src/auth/login.ts",
    line: 87,
    recommendation: "Add structured logging for all auth events including IP, user agent, timestamp, and outcome. Use a SIEM-compatible format.",
  },
  {
    id: "f3",
    control: "CC6.1",
    title: "Logical access — MFA enforcement",
    desc: "Multi-factor authentication is available but not enforced for privileged admin routes.",
    severity: "high",
    framework: "soc2",
    file: "src/middleware/auth.ts",
    line: 34,
    recommendation: "Add MFA requirement middleware to all /admin/* routes. Consider using TOTP (e.g., speakeasy library) or delegating to an identity provider.",
  },
  {
    id: "f4",
    control: "Art. 25",
    title: "Data minimisation — PII in logs",
    desc: "User email addresses and IP addresses are logged in plain text in application logs.",
    severity: "medium",
    framework: "gdpr",
    file: "src/utils/logger.ts",
    line: 12,
    recommendation: "Mask or hash PII in logs. Use a log redaction library or add a serializer that strips sensitive fields before writing.",
  },
  {
    id: "f5",
    control: "Art. 7",
    title: "Consent management — cookie tracking",
    desc: "Analytics and marketing cookies set without explicit user consent. No consent management platform detected.",
    severity: "medium",
    framework: "gdpr",
    file: "src/app/layout.tsx",
    line: 8,
    recommendation: "Integrate a CMP (e.g., Cookiebot, OneTrust) or implement a custom consent banner that gates analytics script loading.",
  },
];

const sevColor = {
  critical: { dot: "#e11d48", badge: "bg-red-50 text-red-600 border-red-100", label: "Critical" },
  high: { dot: "#f97316", badge: "bg-orange-50 text-orange-600 border-orange-100", label: "High" },
  medium: { dot: "#d97706", badge: "bg-amber-50 text-amber-600 border-amber-100", label: "Medium" },
  low: { dot: "#6b7280", badge: "bg-gray-50 text-gray-500 border-gray-100", label: "Low" },
};

type Phase = "select" | "scanning" | "results";

export function AnalysisView({
  owner,
  repo,
  accessToken,
}: {
  owner: string;
  repo: string;
  accessToken: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>("select");
  const [scanProgress, setScanProgress] = useState(0);
  const [activeFramework, setActiveFramework] = useState<string>("all");
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const startScan = () => {
    if (selected.length === 0) return;
    setPhase("scanning");
    setScanProgress(0);

    const steps = [
      { delay: 600, pct: 15 },
      { delay: 1400, pct: 35 },
      { delay: 2400, pct: 58 },
      { delay: 3600, pct: 76 },
      { delay: 4800, pct: 91 },
      { delay: 6000, pct: 100 },
    ];

    steps.forEach(({ delay, pct }) => {
      setTimeout(() => {
        setScanProgress(pct);
        if (pct === 100) {
          setTimeout(() => {
            setPhase("results");
            setActiveFramework("all");
          }, 600);
        }
      }, delay);
    });
  };

  const findings = mockFindings.filter(
    (f) => selected.includes(f.framework) || selected.some((s) => f.framework === s)
  );
  const filteredFindings =
    activeFramework === "all"
      ? findings
      : findings.filter((f) => f.framework === activeFramework);

  const selectedFrameworkObjs = frameworks.filter((f) => selected.includes(f.id));

  if (phase === "select") {
    return (
      <div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Choose compliance frameworks</h2>
          <p className="text-xs text-gray-400 mb-5">
            Select the frameworks you want to check this repository against.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {frameworks.map((fw) => {
              const isSelected = selected.includes(fw.id);
              return (
                <button
                  key={fw.id}
                  onClick={() => toggle(fw.id)}
                  className={`relative flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? "border-black bg-gray-50"
                      : "border-gray-100 hover:border-gray-200 bg-white"
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: fw.color }}
                  >
                    {fw.label.slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{fw.label}</div>
                    <div className="text-xs text-gray-400">{fw.desc}</div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-4 h-4 bg-black rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {selected.length === 0
              ? "No frameworks selected"
              : `${selected.length} framework${selected.length > 1 ? "s" : ""} selected`}
          </span>
          <button
            onClick={startScan}
            disabled={selected.length === 0}
            className="flex items-center gap-2 bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Run analysis
          </button>
        </div>
      </div>
    );
  }

  if (phase === "scanning") {
    const scanSteps = [
      { label: "Cloning repository", done: scanProgress >= 15 },
      { label: "Parsing source files", done: scanProgress >= 35 },
      { label: "Classifying codebase", done: scanProgress >= 58 },
      { label: "Running compliance checks", done: scanProgress >= 76 },
      { label: "Collecting evidence", done: scanProgress >= 91 },
      { label: "Generating report", done: scanProgress >= 100 },
    ];

    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-lg">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Analyzing {owner}/{repo}</p>
              <p className="text-xs text-gray-400">
                Checking against {selected.length} framework{selected.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-black rounded-full transition-all duration-700"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-right">{scanProgress}%</p>
        </div>

        <div className="space-y-2.5">
          {scanSteps.map(({ label, done }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  done ? "bg-black" : "border-2 border-gray-200"
                }`}
              >
                {done && (
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className={`text-sm ${done ? "text-gray-900" : "text-gray-400"}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Results
  const criticalCount = findings.filter((f) => f.severity === "critical").length;
  const highCount = findings.filter((f) => f.severity === "high").length;
  const mediumCount = findings.filter((f) => f.severity === "medium").length;

  return (
    <div>
      {/* Score summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 lg:col-span-1">
          <p className="text-xs text-gray-400 mb-2">Overall score</p>
          <div className="text-4xl font-bold text-gray-900 mb-1">74%</div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-black rounded-full" style={{ width: "74%" }} />
          </div>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
          <p className="text-xs text-red-400 mb-2">Critical</p>
          <div className="text-4xl font-bold text-red-600">{criticalCount}</div>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
          <p className="text-xs text-orange-400 mb-2">High</p>
          <div className="text-4xl font-bold text-orange-600">{highCount}</div>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs text-amber-400 mb-2">Medium</p>
          <div className="text-4xl font-bold text-amber-600">{mediumCount}</div>
        </div>
      </div>

      {/* Framework filter tabs */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setActiveFramework("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            activeFramework === "all"
              ? "bg-black text-white"
              : "bg-white border border-gray-200 text-gray-500 hover:text-gray-700"
          }`}
        >
          All findings ({findings.length})
        </button>
        {selectedFrameworkObjs.map((fw) => {
          const count = findings.filter((f) => f.framework === fw.id).length;
          return (
            <button
              key={fw.id}
              onClick={() => setActiveFramework(fw.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFramework === fw.id ? "text-white" : "bg-white border border-gray-200 text-gray-500 hover:text-gray-700"
              }`}
              style={activeFramework === fw.id ? { background: fw.color } : {}}
            >
              {fw.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Findings list */}
      <div className="space-y-3">
        {filteredFindings.map((finding) => {
          const s = sevColor[finding.severity as keyof typeof sevColor];
          const fw = frameworks.find((f) => f.id === finding.framework);
          const isExpanded = expandedFinding === finding.id;

          return (
            <div
              key={finding.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setExpandedFinding(isExpanded ? null : finding.id)}
                className="w-full flex items-start gap-4 p-5 text-left hover:bg-gray-50/50 transition-colors"
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: s.dot }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-semibold text-gray-900">{finding.title}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{finding.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
                    <code className="font-mono bg-gray-50 px-1.5 py-0.5 rounded">
                      {finding.file}:{finding.line}
                    </code>
                    <span className="text-gray-300">·</span>
                    <span className="font-mono text-gray-400">{finding.control}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {fw && (
                    <span
                      className="text-[10px] font-bold px-2 py-1 rounded-lg"
                      style={{ background: fw.bg, color: fw.color }}
                    >
                      {fw.label}
                    </span>
                  )}
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${s.badge}`}>
                    {s.label}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 border-t border-gray-50 bg-gray-50/30">
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Remediation
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">{finding.recommendation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Rescan */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => { setPhase("select"); setSelected([]); }}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Run another analysis
        </button>
      </div>
    </div>
  );
}
