"use client";

interface FloatingBadgeProps {
  label: string;
  sublabel: string;
  color: string;
  bgColor: string;
  floatClass: string;
  positionStyle: React.CSSProperties;
}

export function FloatingBadge({
  label,
  sublabel,
  color,
  bgColor,
  floatClass,
  positionStyle,
}: FloatingBadgeProps) {
  return (
    <div
      className={floatClass}
      style={{
        position: "absolute",
        ...positionStyle,
        filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.10))",
        zIndex: 5,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderRadius: "16px",
          padding: "10px 16px",
          background: bgColor,
          border: "1px solid rgba(255,255,255,0.6)",
          backdropFilter: "blur(8px)",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 11,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {label.slice(0, 2)}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#111", lineHeight: 1.3 }}>{label}</div>
          <div style={{ fontSize: 11, color: "#888", lineHeight: 1.3 }}>{sublabel}</div>
        </div>
      </div>
    </div>
  );
}

interface SpeechBubbleProps {
  text: string;
  floatClass: string;
  positionStyle: React.CSSProperties;
}

export function SpeechBubble({ text, floatClass, positionStyle }: SpeechBubbleProps) {
  return (
    <div
      className={floatClass}
      style={{
        position: "absolute",
        ...positionStyle,
        filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.08))",
        zIndex: 5,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "8px 14px",
          border: "1px solid #f0f0f0",
          fontSize: 12,
          color: "#444",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    </div>
  );
}
