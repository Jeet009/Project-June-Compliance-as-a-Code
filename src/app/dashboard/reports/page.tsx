const reports = [
  { id: "r1", repo: "api-service", framework: "HIPAA", score: 72, findings: 8, date: "Jun 3, 2026", status: "completed", color: "#e11d48", bg: "#fff1f2" },
  { id: "r2", repo: "auth-module", framework: "SOC 2", score: 88, findings: 3, date: "Jun 3, 2026", status: "completed", color: "#7c3aed", bg: "#f5f3ff" },
  { id: "r3", repo: "payment-gateway", framework: "PCI DSS", score: null, findings: 0, date: "Jun 4, 2026", status: "running", color: "#0891b2", bg: "#ecfeff" },
  { id: "r4", repo: "frontend", framework: "GDPR", score: 79, findings: 5, date: "Jun 2, 2026", status: "completed", color: "#059669", bg: "#ecfdf5" },
];

import { getMode } from "@/lib/mode";
import { ModeBadge, InDevelopment } from "@/components/dashboard/InDevelopment";

export default async function ReportsPage() {
  const mode = await getMode();

  return (
    <div className="p-5 sm:p-8 max-w-[1200px]">
      <div className="mb-8 pb-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-semibold text-gray-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>Reports</h1>
            <ModeBadge mode={mode} />
          </div>
          <p className="text-sm text-gray-500 mt-1">All compliance scan reports across your repositories.</p>
        </div>
        {mode === "demo" && (
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export all
          </button>
        )}
      </div>

      {mode === "dev" ? (
        <InDevelopment
          title="No reports yet"
          description="Reports are generated after a compliance scan completes. The scanning engine is still in development — once it ships, your reports will appear here."
        />
      ) : (
      <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Repository</th>
              <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Framework</th>
              <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Score</th>
              <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Findings</th>
              <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Date</th>
              <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {reports.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{r.repo}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-lg"
                    style={{ background: r.bg, color: r.color }}
                  >
                    {r.framework}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {r.score !== null ? (
                    <span className="text-sm font-semibold text-gray-900">{r.score}%</span>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-600">{r.findings || "—"}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-400">{r.date}</span>
                </td>
                <td className="px-5 py-4">
                  {r.status === "running" ? (
                    <span className="flex items-center gap-1.5 text-xs text-blue-600 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      Running
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Completed
                    </span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
