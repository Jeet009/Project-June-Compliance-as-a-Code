"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/Wordmark";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="px-4 md:px-7"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        background: scrolled ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.0)",
        backdropFilter: scrolled ? "blur(14px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(160%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
        transition: "background 0.25s, border-color 0.25s, backdrop-filter 0.25s",
      }}
    >
      {/* Wordmark */}
      <Link href="/" style={{ textDecoration: "none" }}>
        <Wordmark size={28} fontSize={17} variant="dark" />
      </Link>

      {/* Center nav pill */}
      <div
        className="hidden md:flex"
        style={{
          alignItems: "center",
          gap: 2,
          background: "rgba(245,245,245,0.7)",
          borderRadius: 999,
          padding: "4px 6px",
          border: "1px solid rgba(0,0,0,0.05)",
          backdropFilter: "blur(8px)",
        }}
      >
        {[
          { label: "Features", href: "#features" },
          { label: "Frameworks", href: "#frameworks" },
          { label: "Pricing", href: "#pricing" },
          { label: "Docs", href: "#docs" },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="font-display"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#52525b",
              padding: "5px 14px",
              borderRadius: 999,
              textDecoration: "none",
              letterSpacing: "-0.01em",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#fff";
              (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#52525b";
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* GitHub icon link — repo to be added later */}
        <a
          href="#"
          aria-label="View on GitHub"
          title="View on GitHub"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            background: "#fff",
            color: "#18181b",
            borderRadius: 10,
            border: "1px solid #e7e7e7",
            textDecoration: "none",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#0a0a0a";
            (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#fff";
            (e.currentTarget as HTMLAnchorElement).style.color = "#18181b";
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>

        {/* Sign in */}
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="font-display"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#0a0a0a",
            color: "#fff",
            fontSize: 13,
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            letterSpacing: "-0.01em",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#27272a";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#0a0a0a";
          }}
        >
          Sign in
        </button>
      </div>
    </nav>
  );
}
