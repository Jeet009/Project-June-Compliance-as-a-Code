"use client";

import { signIn } from "next-auth/react";

export function CTASection() {
  return (
    <section className="py-20 sm:py-32 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <div
          className="relative rounded-3xl p-8 sm:p-16 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
          }}
        >
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Compliance color blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: "#7c3aed" }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: "#2563eb" }} />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 text-xs text-gray-300 font-medium mb-6 font-mono-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              $ npx project-june init
            </div>
            <h2 className="font-display text-4xl font-semibold text-white mb-4 tracking-tight" style={{ letterSpacing: "-0.03em" }}>
              Start your first{" "}
              <span className="font-serif-accent italic font-normal text-gray-400">compliance scan</span>
              <br />in under five minutes
            </h2>
            <p className="text-gray-400 mb-10 leading-relaxed">
              Free forever for open-source projects. No credit card, no setup fees.
              <br />
              Connect your repo and get a full evidence-backed report instantly.
            </p>

            <button
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              className="inline-flex items-center gap-2.5 bg-white text-black font-semibold px-7 py-3.5 rounded-full hover:bg-gray-100 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub — it&apos;s free
            </button>

            <div className="flex items-center justify-center gap-6 mt-8 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Open source
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Self-hostable
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                MIT Licensed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
