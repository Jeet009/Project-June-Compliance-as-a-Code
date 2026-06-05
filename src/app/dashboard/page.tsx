import { auth } from "@/lib/auth";
import Link from "next/link";
import { Octokit } from "@octokit/rest";
import { getMode } from "@/lib/mode";
import { ModeBadge, InDevelopment } from "@/components/dashboard/InDevelopment";

const frameworkStats = [
  { label: "HIPAA", pct: 72, color: "#e11d48", bg: "#fff1f2", trend: "+4%", controls: 54 },
  { label: "SOC 2", pct: 88, color: "#7c3aed", bg: "#f5f3ff", trend: "+11%", controls: 64 },
  { label: "ISO 27001", pct: 61, color: "#2563eb", bg: "#eff6ff", trend: "+2%", controls: 114 },
  { label: "GDPR", pct: 79, color: "#059669", bg: "#ecfdf5", trend: "+7%", controls: 99 },
];

const recentFindings = [
  {
    repo: "api-service",
    finding: "Missing encryption at rest for user PII in UserService.ts",
    severity: "critical",
    framework: "HIPAA",
    file: "src/services/UserService.ts:142",
    ago: "2h ago",
  },
  {
    repo: "auth-module",
    finding: "Audit logging incomplete — failed login attempts not recorded",
    severity: "high",
    framework: "SOC 2",
    file: "src/controllers/AuthController.ts:89",
    ago: "5h ago",
  },
  {
    repo: "payment-gateway",
    finding: "MFA not enforced on admin routes",
    severity: "high",
    framework: "PCI DSS",
    file: "src/routes/admin.ts:34",
    ago: "1d ago",
  },
  {
    repo: "api-service",
    finding: "Data retention policy not implemented for session tokens",
    severity: "medium",
    framework: "GDPR",
    file: "src/middleware/session.ts:67",
    ago: "1d ago",
  },
  {
    repo: "frontend",
    finding: "Cookie consent banner missing for analytics tracking",
    severity: "medium",
    framework: "GDPR",
    file: "src/app/layout.tsx:12",
    ago: "2d ago",
  },
];

const recentScans = [
  { repo: "api-service", owner: "acme-corp", status: "completed", score: 72, framework: "HIPAA", ago: "2h ago" },
  { repo: "auth-module", owner: "acme-corp", status: "completed", score: 88, framework: "SOC 2", ago: "5h ago" },
  { repo: "payment-gateway", owner: "acme-corp", status: "running", score: null, framework: "PCI DSS", ago: "12m ago" },
  { repo: "frontend", owner: "acme-corp", status: "completed", score: 79, framework: "GDPR", ago: "1d ago" },
];

const severityColor = {
  critical: { dot: "#e11d48", badge: "bg-red-50 text-red-600 border-red-100" },
  high: { dot: "#f97316", badge: "bg-orange-50 text-orange-600 border-orange-100" },
  medium: { dot: "#d97706", badge: "bg-amber-50 text-amber-600 border-amber-100" },
  low: { dot: "#6b7280", badge: "bg-gray-50 text-gray-600 border-gray-100" },
};

export default async function DashboardPage() {
  const session = await auth();
  const mode = await getMode();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  // In dev mode, fetch the REAL connected-repo count
  let repoCount = 0;
  if (mode === "dev" && session?.accessToken) {
    try {
      const octokit = new Octokit({ auth: session.accessToken });
      const all = await octokit.paginate(octokit.repos.listForAuthenticatedUser, {
        per_page: 100,
        affiliation: "owner,collaborator,organization_member",
      });
      // Dedupe by full_name (owner/repo) — pagination + affiliation can return repeats
      repoCount = new Set(all.map((r) => r.full_name.toLowerCase())).size;
    } catch {
      repoCount = 0;
    }
  }

  return (
    <div className="p-5 sm:p-8 max-w-[1200px]">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h1 className="font-display text-2xl font-semibold text-gray-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Welcome back, {firstName}
            </h1>
            <ModeBadge mode={mode} />
          </div>
          <p className="text-sm text-gray-500">
            {mode === "demo"
              ? "Here's your compliance posture across all connected repositories."
              : "Showing only shipped features. Switch to Demo data in Settings to preview the full experience."}
          </p>
        </div>
        <Link
          href="/dashboard/repos"
          className="flex items-center justify-center gap-2 bg-black text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-800 transition-colors flex-shrink-0 self-start"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {mode === "demo" ? "Analyze new repo" : "Browse repositories"}
        </Link>
      </div>

      {mode === "dev" ? (
        <DevOverview repoCount={repoCount} />
      ) : (
      <>
      {/* Framework score cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {frameworkStats.map(({ label, pct, color, bg, trend, controls }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-bold px-2 py-1 rounded-lg"
                style={{ background: bg, color }}
              >
                {label}
              </span>
              <span className="text-xs text-green-600 font-medium">{trend}</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{pct}%</div>
            <div className="text-xs text-gray-400 mb-3">{controls} controls</div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, background: color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Two-column grid */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Recent findings — wider */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between p-5 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900 text-sm">Recent findings</h2>
            <Link href="/dashboard/reports" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentFindings.map(({ repo, finding, severity, framework, file, ago }) => {
              const s = severityColor[severity as keyof typeof severityColor];
              return (
                <div key={finding} className="p-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: s.dot }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-medium text-gray-900">{finding}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-gray-400 font-mono">{repo}</span>
                        <span className="text-gray-200">·</span>
                        <span className="text-xs text-gray-400 font-mono truncate">{file}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border ${s.badge}`}
                      >
                        {framework}
                      </span>
                      <span className="text-[10px] text-gray-400">{ago}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent scans — narrower */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between p-5 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900 text-sm">Recent scans</h2>
            <Link href="/dashboard/repos" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentScans.map(({ repo, owner, status, score, framework, ago }) => (
              <div key={`${owner}/${repo}`} className="p-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{repo}</p>
                    <p className="text-xs text-gray-400">{framework} · {ago}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    {status === "running" ? (
                      <div className="flex items-center gap-1.5 text-xs text-blue-600 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Running
                      </div>
                    ) : (
                      <div className="text-sm font-bold text-gray-900">{score}%</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick action */}
          <div className="p-4 border-t border-gray-50">
            <Link
              href="/dashboard/repos"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-dashed border-gray-200 text-xs text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Scan a new repository
            </Link>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
}

/* ── Dev mode overview — only real / shipped things ── */
function DevOverview({ repoCount }: { repoCount: number }) {
  const stats = [
    {
      label: "Connected repositories",
      value: repoCount,
      sub: "Live from GitHub",
      href: "/dashboard/repos",
      live: true,
    },
    {
      label: "Frameworks available",
      value: 6,
      sub: "Reference knowledge base",
      href: "/dashboard/frameworks",
      live: true,
    },
    { label: "Analyses run", value: 0, sub: "Engine in development", href: null, live: false },
    { label: "Reports generated", value: 0, sub: "Engine in development", href: null, live: false },
  ];

  return (
    <div>
      {/* Real stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => {
          const card = (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 h-full hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400 font-medium">{s.label}</span>
                <span
                  className={`font-mono-accent text-[10px] px-1.5 py-0.5 rounded border ${
                    s.live
                      ? "text-emerald-600 bg-emerald-50 border-emerald-100"
                      : "text-gray-400 bg-gray-50 border-gray-100"
                  }`}
                >
                  {s.live ? "live" : "soon"}
                </span>
              </div>
              <div className="font-display text-3xl font-semibold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
            </div>
          );
          return s.href ? (
            <Link key={s.label} href={s.href}>
              {card}
            </Link>
          ) : (
            <div key={s.label}>{card}</div>
          );
        })}
      </div>

      {/* Honest in-development notice */}
      <InDevelopment
        title="Compliance scanning & reports"
        description="The analysis engine — repo scoring, gap detection, evidence collection and report generation — is being built. Your repositories are already connected and ready; scanning lands soon."
      />
    </div>
  );
}
