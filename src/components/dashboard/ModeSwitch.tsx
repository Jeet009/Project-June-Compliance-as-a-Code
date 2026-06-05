"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { AppMode } from "@/lib/mode";

const options: { id: AppMode; title: string; desc: string }[] = [
  {
    id: "demo",
    title: "Demo data",
    desc: "Show the full experience with sample scores, findings and scans. Great for demos and exploring the vision.",
  },
  {
    id: "dev",
    title: "Dev mode",
    desc: "Show only features that actually work today. Demo-only screens display honest “in development” states.",
  },
];

export function ModeSwitch({ initial }: { initial: AppMode }) {
  const router = useRouter();
  const [mode, setMode] = useState<AppMode>(initial);
  const [pending, start] = useTransition();

  const choose = (m: AppMode) => {
    if (m === mode) return;
    setMode(m);
    document.cookie = `pj_mode=${m}; path=/; max-age=31536000; samesite=lax`;
    start(() => router.refresh());
  };

  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        const active = mode === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => choose(opt.id)}
            disabled={pending}
            className={`relative text-left rounded-xl border-2 p-4 transition-all ${
              active ? "border-black bg-gray-50" : "border-gray-100 hover:border-gray-200 bg-white"
            } ${pending ? "opacity-70" : ""}`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-display text-sm font-semibold text-gray-900">{opt.title}</span>
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                  active ? "bg-black" : "border-2 border-gray-200"
                }`}
              >
                {active && (
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{opt.desc}</p>
          </button>
        );
      })}
    </div>
  );
}
