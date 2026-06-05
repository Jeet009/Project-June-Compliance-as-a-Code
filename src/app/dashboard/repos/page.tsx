import { auth } from "@/lib/auth";
import { Octokit } from "@octokit/rest";
import { RepoList } from "@/components/dashboard/RepoList";

export default async function ReposPage() {
  const session = await auth();
  const token = session?.accessToken;

  let repos: Array<{
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    language: string | null;
    private: boolean;
    updated_at: string | null;
    stargazers_count: number;
    owner: { login: string };
  }> = [];

  let viewerLogin = "";

  if (token) {
    try {
      const octokit = new Octokit({ auth: token });
      // Viewer's GitHub login — used for the "Owned" filter
      try {
        const me = await octokit.users.getAuthenticated();
        viewerLogin = me.data.login;
      } catch {
        viewerLogin = "";
      }
      // Paginate to fetch ALL repos (owner + collaborator + org member), not just the first page
      const data = await octokit.paginate(octokit.repos.listForAuthenticatedUser, {
        sort: "updated",
        per_page: 100,
        affiliation: "owner,collaborator,organization_member",
      });
      // Dedupe by full_name (owner/repo) — guards against true pagination repeats.
      // Different owners with the same repo name are kept (they're distinct repos).
      const seen = new Set<string>();
      const unique = data.filter((r) => {
        const key = r.full_name.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      repos = unique.map((r) => ({
        id: r.id,
        name: r.name,
        full_name: r.full_name,
        description: r.description,
        language: r.language ?? null,
        private: r.private,
        updated_at: r.updated_at ?? null,
        stargazers_count: r.stargazers_count ?? 0,
        owner: { login: r.owner?.login ?? "" },
      }));
    } catch {
      // token invalid or insufficient scope — show empty state
    }
  }

  return (
    <div className="p-5 sm:p-8 max-w-[1200px]">
      <div className="mb-8 pb-6 border-b border-gray-100">
        <h1 className="font-display text-2xl font-semibold text-gray-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>Repositories</h1>
        <p className="text-sm text-gray-500 mt-1">
          Select a repository to run a compliance scan against your chosen frameworks.
        </p>
      </div>
      <RepoList repos={repos} viewerLogin={viewerLogin} />
    </div>
  );
}
