# Project June

> ⚠️ **"Project June" is a placeholder / working name.** The product is branded "Project June" throughout the UI for now — it will be replaced once a final name is chosen.

**Open-source compliance intelligence for software teams.**

Project June connects to your GitHub repositories and produces compliance gap analysis against major frameworks — **HIPAA, ISO 27001, SOC 2, GDPR, DPDP, and PCI-DSS** — powered by an agent that reads your *actual codebase*, not just checklists.

The goal: replace manual, spreadsheet-driven compliance audits with an automated, evidence-backed workflow engineers can actually use.

---

## ✨ What it does (the vision)

1. **Connect** — sign in with GitHub, pick a repository.
2. **Classify** — detect the project's domain (FinTech, HealthTech, SaaS, …) and suggest relevant frameworks.
3. **Analyze** — run a gap analysis of the code against a framework knowledge base.
4. **Evidence** — link every finding to exact files, line numbers, and control references.
5. **Report** — generate an evidence-backed report with prioritized, actionable remediation steps.

High-level flow (from the original design notes):

```
Web Portal → Login/Register → Connect GitHub → Extract codebase
   → Analyze & categorize (FinTech / EdTech / SaaS …)
   → Select frameworks (DPDP / ISO / HIPAA …) from a JSON knowledge base
   → Gap Analysis (Code + Framework via LLM agent)
   → Evidence Collection → Report Generation → Remediation recommendations
```

---

## 🚦 Project status

This repository currently contains the **product shell** — the parts needed to demo the vision and to build the real engine on top of:

| Area | Status |
|------|--------|
| Landing page | ✅ Done |
| GitHub OAuth sign-in | ✅ Done |
| Live repository listing (paginated, owner-aware) | ✅ Done |
| Dashboard UI (overview, reports, frameworks, settings, API keys) | ✅ Done (UI) |
| Compliance **scanning engine** | 🚧 In development |
| Report generation & evidence collection | 🚧 In development |

To keep the difference honest, the app has a **display-mode toggle** (**Settings → Display mode**):

- **Demo data** — shows the full intended experience with sample scores, findings, and scans. Good for demos.
- **Dev mode** — shows only what actually works today (real repo data), with clear *"in development"* states everywhere the engine isn't built yet.

---

## 🧱 Tech stack

- **[Next.js](https://nextjs.org) (App Router)** + **React** + **TypeScript**
- **Tailwind CSS v4** for styling
- **NextAuth v5** for GitHub OAuth
- **@octokit/rest** for the GitHub API
- **Fonts:** Space Grotesk (display) · Poppins (body) · Instrument Serif (accent) · JetBrains Mono (code)

> ℹ️ This project tracks a custom build of Next.js whose APIs/conventions may differ from upstream — see `AGENTS.md`.

---

## 🚀 Getting started

### 1. Prerequisites
- **Node.js 20+** (Node 22 recommended)

### 2. Install
```bash
npm install
```

### 3. Create a GitHub OAuth App
**GitHub → Settings → Developers → OAuth Apps → New OAuth App**:

- **Homepage URL:** `http://localhost:3000`
- **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`

Copy the **Client ID** and generate a **Client secret**.

### 4. Configure environment
Create `.env.local` in the project root:

```bash
# GitHub OAuth
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret

# NextAuth — generate with:  npx auth secret   (or: openssl rand -base64 33)
AUTH_SECRET=your_generated_secret
AUTH_URL=http://localhost:3000
```

> `.env.local` is gitignored — never commit your secrets.

### 5. Run
```bash
npm run dev
```
Open **http://localhost:3000**.

---

## 📁 Project structure

```
src/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout + fonts
│   ├── globals.css               # Design tokens, animations, font helpers
│   ├── api/auth/[...nextauth]/   # NextAuth route handlers
│   └── dashboard/
│       ├── layout.tsx            # Dashboard shell (sidebar + panel)
│       ├── page.tsx              # Overview
│       ├── repos/                # GitHub repository list (real data)
│       ├── [owner]/[repo]/       # Per-repo analysis view
│       ├── reports/              # Reports
│       ├── frameworks/           # Framework knowledge base
│       ├── api-keys/             # API keys
│       └── settings/             # Account + display-mode toggle
├── components/
│   ├── landing/                  # Navbar, Hero, Features, Frameworks, CTA
│   ├── dashboard/                # Sidebar, RepoList, AnalysisView, ModeSwitch …
│   └── Wordmark.tsx              # Mixed-font logo
└── lib/
    ├── auth.ts                   # NextAuth config (GitHub provider)
    ├── mode.ts                   # Demo/Dev display-mode helper
    └── utils.ts
```

---

## 🔌 Building the analysis engine

The shell already captures what an analysis backend needs:

- The authenticated user's **GitHub access token** (`session.accessToken`, server-side only) with `repo` scope.
- Per-repo **metadata** (`full_name`, `default_branch`, `language`, `private`, `description`, …).

A real `/api/analyze` endpoint would accept a payload like:

```json
{
  "repo": "owner/repo",
  "branch": "main",
  "frameworks": ["hipaa", "soc2"],
  "metadata": { "language": "TypeScript", "private": true }
}
```

…then use the token to pull the repo tree / tarball + file contents, run the gap analysis against the framework knowledge base, and return findings with evidence.

---

## 🤝 Contributing

This is an open-source project. Issues, ideas, and PRs are welcome. Contribution guidelines will be added as the project matures.

## 📄 License

MIT (license file to be added).
