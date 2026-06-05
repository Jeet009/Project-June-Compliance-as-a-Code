import { auth } from "@/lib/auth";
import { AnalysisView } from "@/components/dashboard/AnalysisView";
import { getMode } from "@/lib/mode";
import { ModeBadge, InDevelopment } from "@/components/dashboard/InDevelopment";

export default async function RepoAnalysisPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const { owner, repo } = await params;
  const session = await auth();
  const mode = await getMode();

  return (
    <div className="p-5 sm:p-8 max-w-[1200px]">
      <div className="mb-8 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <a href="/dashboard/repos" className="hover:text-gray-600 transition-colors">
            Repositories
          </a>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-700 font-medium">
            {owner}/{repo}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold text-gray-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
            {repo}
          </h1>
          <ModeBadge mode={mode} />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {mode === "demo"
            ? "Select frameworks and run a compliance gap analysis on this repository."
            : "This repository is connected. Automated analysis is coming soon."}
        </p>
      </div>

      {mode === "demo" ? (
        <AnalysisView owner={owner} repo={repo} accessToken={session?.accessToken ?? ""} />
      ) : (
        <InDevelopment
          title="Compliance analysis is in development"
          description="Framework selection, code scanning, gap detection and report generation aren't shipped yet. The repository is connected and ready — switch to Demo data in Settings to preview how the analysis flow will work."
        />
      )}
    </div>
  );
}
