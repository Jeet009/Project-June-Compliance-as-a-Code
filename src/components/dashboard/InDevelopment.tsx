export function InDevelopment({
  title = "In development",
  description,
}: {
  title?: string;
  description: string;
}) {
  return (
    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
      <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div className="font-mono-accent inline-flex items-center gap-1.5 text-[11px] text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-1 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        dev_mode
      </div>
      <h3 className="font-display text-sm font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">{description}</p>
    </div>
  );
}

export function ModeBadge({ mode }: { mode: "demo" | "dev" }) {
  const isDev = mode === "dev";
  return (
    <span
      className={`font-mono-accent inline-flex items-center gap-1.5 text-[11px] leading-none rounded-full px-2.5 py-1.5 border ${
        isDev
          ? "text-amber-600 bg-amber-50 border-amber-100"
          : "text-violet-600 bg-violet-50 border-violet-100"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isDev ? "bg-amber-500" : "bg-violet-500"}`} />
      <span className="relative top-px">{isDev ? "dev_mode" : "demo_data"}</span>
    </span>
  );
}
