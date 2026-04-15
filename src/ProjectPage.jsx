import { useState, useEffect } from "react";

export default function ProjectPage({ project, onBack }) {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    setVisibleSteps(0);
    const timers = project.steps.map((_, i) =>
      setTimeout(() => setVisibleSteps((v) => v + 1), 300 + i * 180)
    );
    return () => timers.forEach(clearTimeout);
  }, [project]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <button
        onClick={onBack}
        style={{
          position: "fixed", top: 24, left: 24, zIndex: 500,
          background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(0,0,0,0.06)", borderRadius: 40,
          padding: "8px 20px", color: "var(--text-soft)",
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = project.color + "60"; e.currentTarget.style.color = project.color; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"; e.currentTarget.style.color = "var(--text-soft)"; }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        back to brain
      </button>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "100px 32px 80px" }}>
        <svg width="102" height="102" viewBox="0 0 28 28" style={{ marginBottom: 20, filter: `drop-shadow(0 0 6px ${project.color}60)`, animation: "sparkBreath 3.5s ease-in-out infinite" }}>
          <path d="M14 2 C14.6 10.5 17.5 13.4 26 14 C17.5 14.6 14.6 17.5 14 26 C13.4 17.5 10.5 14.6 2 14 C10.5 13.4 13.4 10.5 14 2Z" fill={project.color} opacity="0.7" />
        </svg>

        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px, 7vw, 56px)", fontWeight: 700, fontStyle: "italic", lineHeight: 1.1, margin: 0, color: "var(--text)" }}>
          {project.name}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "var(--text-soft)" }}>{project.date}</span>
          <span style={{ color: "var(--text-soft)", opacity: 0.3 }}>·</span>
          {project.skills.map((s) => (
            <span key={s} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, padding: "3px 12px", borderRadius: 16, background: project.color + "15", color: project.color, border: `1px solid ${project.color}25` }}>{s}</span>
          ))}
        </div>

        <div style={{ marginTop: 56 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 700, fontStyle: "italic", color: project.color, opacity: 0.7, margin: 0 }}>Why?</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.75, color: "var(--text-soft)", maxWidth: 480, marginTop: 12 }}>{project.why}</p>
        </div>

        <div style={{ margin: "28px 0", height: 1, backgroundImage: `repeating-linear-gradient(90deg, ${project.color}30 0, ${project.color}30 6px, transparent 6px, transparent 14px)` }} />

        {project.steps.map((step, i) => (
          <div key={i} style={{ marginBottom: 40, opacity: i < visibleSteps ? 1 : 0, transform: i < visibleSteps ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 64, fontWeight: 500, fontStyle: "italic", color: project.color, opacity: 0.5 }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 19, fontWeight: 600, margin: 0, color: "var(--text)" }}>{step.title}</h3>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: "var(--text-soft)", marginLeft: 46, marginTop: 4 }}>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}