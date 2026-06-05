export default function ApiKeysPage() {
  return (
    <div className="p-5 sm:p-8 max-w-[1200px]">
      <div className="mb-8 pb-6 border-b border-gray-100">
        <h1 className="font-display text-2xl font-semibold text-gray-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>API Keys</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage API keys for integrating Project June into your CI/CD pipelines.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Active keys</h2>
            <p className="text-xs text-gray-400 mt-0.5">Keys are shown once. Store them securely.</p>
          </div>
          <button className="flex items-center gap-2 bg-black text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Generate key
          </button>
        </div>

        <div className="text-center py-12 text-gray-400 text-sm">
          No API keys yet. Generate one to get started.
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Usage example</h3>
        <pre className="text-xs font-mono text-gray-500 leading-relaxed overflow-x-auto">
{`curl -X POST https://api.project-june.dev/v1/scan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"repo": "owner/repo", "frameworks": ["hipaa", "soc2"]}'`}
        </pre>
      </div>
    </div>
  );
}
