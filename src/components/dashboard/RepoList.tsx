"use client";

import { useState } from "react";
import Link from "next/link";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  Ruby: "#701516",
  PHP: "#4F5D95",
  "C#": "#178600",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
};

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  private: boolean;
  updated_at: string | null;
  stargazers_count: number;
  owner: { login: string };
}

export function RepoList({ repos, viewerLogin = "" }: { repos: Repo[]; viewerLogin?: string }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "owned" | "public" | "private">("all");

  const ownedCount = viewerLogin
    ? repos.filter((r) => r.owner.login.toLowerCase() === viewerLogin.toLowerCase()).length
    : 0;

  const filtered = repos.filter((r) => {
    const matchSearch =
      r.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description ?? "").toLowerCase().includes(search.toLowerCase());
    let matchFilter = true;
    if (filter === "private") matchFilter = r.private;
    else if (filter === "public") matchFilter = !r.private;
    else if (filter === "owned")
      matchFilter = r.owner.login.toLowerCase() === viewerLogin.toLowerCase();
    return matchSearch && matchFilter;
  });

  const filters: ("all" | "owned" | "public" | "private")[] = viewerLogin
    ? ["all", "owned", "public", "private"]
    : ["all", "public", "private"];

  return (
    <div>
      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="relative w-full sm:flex-1 sm:max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search repositories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-300 bg-white"
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 overflow-x-auto scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all capitalize whitespace-nowrap ${
                  filter === f
                    ? "bg-black text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {f === "owned" ? `Owned${ownedCount ? ` (${ownedCount})` : ""}` : f}
              </button>
            ))}
          </div>
          <span className="text-xs text-gray-400 flex-shrink-0">{filtered.length} repos</span>
        </div>
      </div>

      {repos.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-3">
          {filtered.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400 text-sm">
              No repositories match &ldquo;{search}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  const langColor = repo.language ? (languageColors[repo.language] ?? "#6b7280") : null;
  const updatedAt = repo.updated_at
    ? new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm hover:border-gray-200 transition-all group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <div className="w-5 h-5 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-900 truncate">
              <span className="font-normal text-gray-400">{repo.owner.login}/</span>
              {repo.name}
            </span>
            <span
              className={`inline-flex items-center leading-none text-[10px] font-medium px-2 py-1 rounded-full border ${
                repo.private
                  ? "text-gray-500 border-gray-200 bg-gray-50"
                  : "text-green-600 border-green-100 bg-green-50"
              }`}
            >
              {repo.private ? "Private" : "Public"}
            </span>
          </div>
          {repo.description && (
            <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
              {repo.description}
            </p>
          )}
          <div className="flex items-center gap-4 text-xs text-gray-400">
            {langColor && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: langColor }} />
                {repo.language}
              </span>
            )}
            {repo.stargazers_count > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {repo.stargazers_count}
              </span>
            )}
            {updatedAt && <span>Updated {updatedAt}</span>}
          </div>
        </div>

        <Link
          href={`/dashboard/${repo.owner.login}/${repo.name}`}
          className="flex items-center gap-2 bg-black text-white text-xs font-medium px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-800 flex-shrink-0 translate-x-2 group-hover:translate-x-0"
        >
          Analyze
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
      <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      </div>
      <h3 className="text-sm font-semibold text-gray-900 mb-1">No repositories found</h3>
      <p className="text-sm text-gray-400 max-w-xs mx-auto">
        Make sure your GitHub OAuth app has repository access. You may need to re-authorize.
      </p>
    </div>
  );
}
