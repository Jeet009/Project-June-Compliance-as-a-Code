"use client";

import { signIn } from "next-auth/react";

const leftBadges = [
  { label: "HIPAA",     sub: "Healthcare",    color: "#e11d48", bg: "#fef2f3" },
  { label: "ISO 27001", sub: "Info Security", color: "#2563eb", bg: "#f1f6ff" },
  { label: "SOC 2",     sub: "Cloud",         color: "#7c3aed", bg: "#f6f4ff" },
];

const rightBadges = [
  { label: "GDPR",    sub: "EU Privacy", color: "#059669", bg: "#f0fdf7" },
  { label: "DPDP",    sub: "India",      color: "#d97706", bg: "#fffbf0" },
  { label: "PCI DSS", sub: "Payments",   color: "#0891b2", bg: "#f0fdff" },
];

const stats = [
  { value: "6+",   label: "Frameworks"      },
  { value: "500+", label: "Controls mapped" },
  { value: "<5m",  label: "To first report" },
];

export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#ffffff",
        paddingTop: 96,
        paddingBottom: 80,
      }}
    >
      {/* Very faint dot grid, fading toward center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, #e2e2e2 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 75% 55% at 50% 42%, transparent 35%, #000 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 55% at 50% 42%, transparent 35%, #000 90%)",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />

      {/* ── LEFT badges ── */}
      <div
        className="hero-badges"
        style={{
          position: "absolute",
          left: "clamp(16px, 5vw, 88px)",
          top: "50%",
          transform: "translateY(-58%)",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {leftBadges.map((b, i) => (
          <FrameworkPill key={b.label} {...b} floatIndex={i} align="left" />
        ))}
      </div>

      {/* ── RIGHT badges ── */}
      <div
        className="hero-badges"
        style={{
          position: "absolute",
          right: "clamp(16px, 5vw, 88px)",
          top: "50%",
          transform: "translateY(-58%)",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {rightBadges.map((b, i) => (
          <FrameworkPill key={b.label} {...b} floatIndex={i + 3} align="right" />
        ))}
      </div>

      {/* ── Center content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 24px",
          maxWidth: 720,
          width: "100%",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.8)",
            border: "1px solid #ececec",
            borderRadius: 999,
            padding: "5px 13px",
            fontSize: 12.5,
            color: "#6b7280",
            fontWeight: 500,
            marginBottom: 30,
            backdropFilter: "blur(8px)",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
          Open-source compliance, built for engineers
        </div>

        {/* Headline — mixed font: geometric display + serif italic accent */}
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(42px, 6vw, 72px)",
            fontWeight: 600,
            lineHeight: 1.07,
            letterSpacing: "-0.035em",
            marginBottom: 22,
            color: "#0a0a0a",
          }}
        >
          Compliance that{" "}
          <span
            className="font-serif-accent"
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              background: "linear-gradient(120deg, #3f3f46 0%, #09090b 45%, #52525b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            understands
          </span>
          <br />
          your codebase
        </h1>

        {/* Sub */}
        <p
          style={{
            fontSize: 18,
            color: "#71717a",
            maxWidth: 524,
            lineHeight: 1.65,
            marginBottom: 38,
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          Connect your GitHub repositories and get instant gap analysis against
          HIPAA, ISO&nbsp;27001, SOC&nbsp;2, GDPR and more — from an AI agent that
          reads your actual codebase, not just checklists.
        </p>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 44 }}>
          <PremiumGitHubButton />
        </div>

        {/* Stats */}
        <div style={{ display: "flex", alignItems: "center", gap: 36, flexWrap: "wrap", justifyContent: "center" }}>
          {stats.map(({ value, label }, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 36 }}>
              <div style={{ textAlign: "center" }}>
                <div className="font-display" style={{ fontSize: 22, fontWeight: 600, color: "#18181b", letterSpacing: "-0.02em" }}>{value}</div>
                <div style={{ fontSize: 12, color: "#a1a1aa", fontWeight: 500, marginTop: 2 }}>{label}</div>
              </div>
              {i < stats.length - 1 && <div style={{ width: 1, height: 28, background: "#ececec" }} />}
            </div>
          ))}
        </div>
      </div>

      {/* ── Dashboard preview ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: 72,
          width: "100%",
          maxWidth: 980,
          padding: "0 32px",
        }}
      >
        <DashboardPreview />
      </div>
    </section>
  );
}

/* ── Premium GitHub CTA ── */
function PremiumGitHubButton() {
  return (
    <button
      onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      className="font-display pj-cta"
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 11,
        fontWeight: 500,
        fontSize: 15.5,
        color: "#fff",
        padding: "15px 28px",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.12)",
        cursor: "pointer",
        letterSpacing: "-0.01em",
        background:
          "linear-gradient(180deg, #27272a 0%, #0a0a0a 100%)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.12) inset, 0 1px 2px rgba(0,0,0,0.2), 0 10px 30px -10px rgba(0,0,0,0.5)",
        overflow: "hidden",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow =
          "0 1px 0 rgba(255,255,255,0.16) inset, 0 2px 4px rgba(0,0,0,0.2), 0 18px 40px -12px rgba(0,0,0,0.55)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.boxShadow =
          "0 1px 0 rgba(255,255,255,0.12) inset, 0 1px 2px rgba(0,0,0,0.2), 0 10px 30px -10px rgba(0,0,0,0.5)";
      }}
    >
      {/* top sheen */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 80% at 50% -20%, rgba(255,255,255,0.18), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ position: "relative" }}>
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
      <span style={{ position: "relative" }}>Start free with GitHub</span>
      <svg
        className="pj-cta-arrow"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        style={{ position: "relative", transition: "transform 0.18s ease", opacity: 0.85 }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}

/* ── Framework pill ── */
function FrameworkPill({
  label, sub, color, bg, floatIndex, align,
}: {
  label: string; sub: string; color: string; bg: string; floatIndex: number; align: "left" | "right";
}) {
  const animClass = `float-${(floatIndex % 6) + 1}`;
  return (
    <div
      className={animClass}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        background: "rgba(255,255,255,0.7)",
        border: "1px solid #efefef",
        borderRadius: 16,
        padding: "9px 15px 9px 9px",
        boxShadow: "0 4px 20px -6px rgba(0,0,0,0.08)",
        backdropFilter: "blur(10px)",
        whiteSpace: "nowrap",
        userSelect: "none",
        flexDirection: align === "right" ? "row-reverse" : "row",
        textAlign: align === "right" ? "right" : "left",
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: "-0.02em" }}>
          {label.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#18181b", lineHeight: 1.2 }}>{label}</div>
        <div style={{ fontSize: 11, color: "#a1a1aa", lineHeight: 1.2, marginTop: 1 }}>{sub}</div>
      </div>
    </div>
  );
}

/* ── Dashboard preview card ── */
function DashboardPreview() {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid #ececec",
        overflow: "hidden",
        boxShadow: "0 32px 80px -24px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.02)",
        background: "#fff",
      }}
    >
      {/* Chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "11px 16px",
          background: "#fcfcfc",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
        <div
          className="font-mono-accent"
          style={{
            marginLeft: 10,
            fontSize: 11,
            color: "#b0b0b0",
            background: "#f3f3f3",
            borderRadius: 6,
            padding: "3px 12px",
          }}
        >
          project-june.dev/dashboard
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", minHeight: 300 }}>
        {/* Sidebar */}
        <div style={{ width: 190, background: "#0f0f0f", flexShrink: 0, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px", marginBottom: 14 }}>
            <div style={{ width: 22, height: 22, borderRadius: 7, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <circle cx="4" cy="4" r="2" fill="#0f0f0f" />
                <circle cx="10" cy="4" r="2" fill="#0f0f0f" opacity="0.4" />
                <circle cx="4" cy="10" r="2" fill="#0f0f0f" opacity="0.4" />
                <circle cx="10" cy="10" r="2" fill="#0f0f0f" />
              </svg>
            </div>
            <span style={{ display: "inline-flex", alignItems: "baseline", gap: 4 }}>
              <span className="font-display" style={{ color: "#fff", fontSize: 12, fontWeight: 600, letterSpacing: "-0.02em" }}>Project</span>
              <span className="font-serif-accent" style={{ color: "#fff", fontSize: 14, fontStyle: "italic" }}>June</span>
            </span>
          </div>
          <p style={{ fontSize: 9, color: "#444", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 8px", marginBottom: 4 }}>Workspace</p>
          {[
            { label: "Overview", active: true },
            { label: "Repositories", active: false },
            { label: "Reports", active: false },
            { label: "Frameworks", active: false },
            { label: "Settings", active: false },
          ].map(({ label, active }) => (
            <div key={label} style={{ fontSize: 12, padding: "7px 10px", borderRadius: 8, color: active ? "#fff" : "rgba(255,255,255,0.35)", background: active ? "rgba(255,255,255,0.1)" : "transparent", fontWeight: active ? 500 : 400 }}>
              {label}
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, background: "#f9fafb", padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#111", letterSpacing: "-0.02em" }}>Compliance Overview</div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>4 frameworks · last scan 2h ago</div>
            </div>
            <div style={{ fontSize: 11, background: "#0a0a0a", color: "#fff", padding: "6px 13px", borderRadius: 8, fontWeight: 500 }}>Run scan</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
            {[
              { label: "HIPAA",     pct: 72, color: "#e11d48", bg: "#fef2f3" },
              { label: "SOC 2",     pct: 88, color: "#7c3aed", bg: "#f6f4ff" },
              { label: "ISO 27001", pct: 61, color: "#2563eb", bg: "#f1f6ff" },
              { label: "GDPR",      pct: 79, color: "#059669", bg: "#f0fdf7" },
            ].map(({ label, pct, color, bg }) => (
              <div key={label} style={{ background: "#fff", borderRadius: 12, padding: "12px 12px 10px", border: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color, background: bg, padding: "2px 7px", borderRadius: 5 }}>{label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#111" }}>{pct}%</span>
                </div>
                <div style={{ height: 4, background: "#f0f0f0", borderRadius: 4 }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #f0f0f0", overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid #f5f5f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>Recent findings</span>
              <span style={{ fontSize: 10, color: "#9ca3af" }}>8 total</span>
            </div>
            {[
              { text: "Missing encryption at rest — UserService.ts:142", sev: "Critical", color: "#e11d48", bg: "#fef2f3" },
              { text: "Audit logging incomplete — AuthController.ts:89",  sev: "High",     color: "#f97316", bg: "#fff7ed" },
              { text: "MFA not enforced on admin routes — routes/admin.ts", sev: "High",   color: "#f97316", bg: "#fff7ed" },
            ].map(({ text, sev, color, bg }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderBottom: "1px solid #fafafa" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "#444", flex: 1 }}>{text}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color, background: bg, padding: "2px 7px", borderRadius: 5, flexShrink: 0 }}>{sev}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
