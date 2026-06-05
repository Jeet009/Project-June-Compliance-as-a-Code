interface WordmarkProps {
  /** size of the logo glyph box in px */
  size?: number;
  /** font size of the text in px */
  fontSize?: number;
  /** "dark" = for light backgrounds, "light" = for dark backgrounds */
  variant?: "dark" | "light";
  /** show the logo glyph */
  showGlyph?: boolean;
}

export function Wordmark({
  size = 28,
  fontSize = 17,
  variant = "dark",
  showGlyph = true,
}: WordmarkProps) {
  const isDark = variant === "dark";
  const glyphBg = isDark ? "#0a0a0a" : "#ffffff";
  const dotColor = isDark ? "#ffffff" : "#0f0f0f";
  const projectColor = isDark ? "#0a0a0a" : "#ffffff";
  const juneColor = isDark ? "#0a0a0a" : "#ffffff";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      {showGlyph && (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: size * 0.3,
            background: glyphBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 14 14" fill="none">
            <circle cx="4" cy="4" r="2" fill={dotColor} />
            <circle cx="10" cy="4" r="2" fill={dotColor} opacity="0.5" />
            <circle cx="4" cy="10" r="2" fill={dotColor} opacity="0.5" />
            <circle cx="10" cy="10" r="2" fill={dotColor} />
          </svg>
        </div>
      )}
      <span style={{ display: "inline-flex", alignItems: "baseline", gap: 5 }}>
        <span
          className="font-display"
          style={{
            fontSize,
            fontWeight: 600,
            color: projectColor,
            letterSpacing: "-0.03em",
          }}
        >
          Project
        </span>
        <span
          className="font-serif-accent"
          style={{
            fontSize: fontSize * 1.18,
            fontStyle: "italic",
            color: juneColor,
            letterSpacing: "0",
            lineHeight: 1,
          }}
        >
          June
        </span>
      </span>
    </div>
  );
}
