import { useState, useEffect } from "react";
import PROJECTS from "./projects/index.js";

function BrainSVG() {
  return (
    <img
      src={import.meta.env.BASE_URL + "brain.png"}
      alt="Brain"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        userSelect: "none",
        pointerEvents: "none",
      }}
    />
  );
}

function NeuronSpark({ project, index, isActive, onClick, onHover, onLeave }) {
  const delay = 0.5 + index * 0.35;
  const [phase, setPhase] = useState("hidden");
  const [pulseScale, setPulseScale] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("flying"), delay * 1000);
    const t2 = setTimeout(() => setPhase("landed"), (delay + 0.8) * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [delay]);

  // JS-driven pulse after landing
  useEffect(() => {
    if (phase !== "landed") return;
    let frame;
    const start = Date.now();
    const animate = () => {
      const t = ((Date.now() - start) % 1500) / 1500;
      const s = 1 + 0.3 * Math.sin(t * Math.PI * 2);
      setPulseScale(s);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  const isFlying = phase === "flying";
  const isLanded = phase === "landed";

  const angle = Math.atan2(project.y - (-10), project.x - (-10)) * (180 / Math.PI);
  const trailAngle = angle + 180;

  return (
    <div onClick={isLanded ? onClick : undefined}
      onMouseEnter={isLanded ? onHover : undefined}
      onMouseLeave={isLanded ? onLeave : undefined}
      style={{
        position: "absolute",
        left: isFlying || isLanded ? `${project.x}%` : "-10%",
        top: isFlying || isLanded ? `${project.y}%` : "-10%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
        cursor: isLanded ? "pointer" : "default",
        width: 32, height: 32,
        transition: isFlying || isLanded
          ? "left 0.7s cubic-bezier(0.2, 0.8, 0.3, 1), top 0.7s cubic-bezier(0.2, 0.8, 0.3, 1), opacity 0.15s ease"
          : "none",
        opacity: phase === "hidden" ? 0 : 1,
      }}>
      {isFlying && (
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 120, height: 0,
          marginTop: 0, marginLeft: 0,
          borderRadius: 8,
          transformOrigin: "left center",
          transform: `rotate(${trailAngle}deg)`,
          animation: "trailFade 0.8s ease-out forwards",
          boxShadow: `0 0 12px 4px ${project.color}50, 0 0 24px 8px ${project.color}25`,
          background: `linear-gradient(to right, ${project.color}40, transparent)`,
        }} />
      )}
      {isLanded && (
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 60, height: 60, marginLeft: -30, marginTop: -30,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${project.color}50 0%, ${project.color}20 40%, transparent 70%)`,
          transform: `scale(${pulseScale})`,
          opacity: 0.3 + 0.6 * (pulseScale - 1) / 0.3,
        }} />
      )}
      <div style={{
        position: "relative", zIndex: 2,
        width: 32, height: 32,
        filter: `drop-shadow(0 0 ${isLanded ? 6 + 10 * (pulseScale - 1) / 0.3 : isFlying ? 12 : 8}px ${project.color})`,
        transform: isLanded ? `scale(${pulseScale})` : isFlying ? "scale(1.3)" : "scale(1)",
      }}>
        <svg width="32" height="32" viewBox="0 0 28 28" style={{ display: "block" }}>
          <path d="M14 2 C14.6 10.5 17.5 13.4 26 14 C17.5 14.6 14.6 17.5 14 26 C13.4 17.5 10.5 14.6 2 14 C10.5 13.4 13.4 10.5 14 2Z" fill={project.color} />
        </svg>
      </div>
    </div>
  );
}
 
function Tooltip({ project, visible }) {
  if (!visible) return null;
  return (
    <div style={{ position: "absolute", left: `${project.x}%`, top: `${project.y - 8}%`, transform: "translate(-50%, -100%)", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: `1px solid ${project.color}40`, borderRadius: 8, padding: "6px 14px", zIndex: 100, pointerEvents: "none", animation: "tipIn 0.2s ease-out", whiteSpace: "nowrap", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, fontWeight: 600, fontStyle: "italic", color: "#3a3a3a" }}>{project.name}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#999", marginTop: 1 }}>click to explore</div>
    </div>
  );
}
 
function ConnectionLines() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 5 }} viewBox="0 0 100 100" preserveAspectRatio="none">
      {PROJECTS.map((p, i) => PROJECTS.slice(i + 1).map((q, j) => (
        <line key={`${i}-${j}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={p.color} strokeWidth="0.12" opacity="0.25" strokeDasharray="0.8 1.2">
          <animate attributeName="stroke-dashoffset" from="0" to="4" dur={`${4 + i}s`} repeatCount="indefinite" />
        </line>
      )))}
    </svg>
  );
}
 
export default function HomePage({ onSelectProject }) {
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
 
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 16, position: "relative", zIndex: 2, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(-14px)", transition: "all 0.8s ease 0.2s" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(24px, 4.5vw, 40px)", fontWeight: 500, fontStyle: "italic", margin: 0, letterSpacing: "0.04em", color: "var(--text)" }}>Peek Inside My Brain</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "var(--text-soft)", marginTop: 8 }}>mind still developing.</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "var(--text-soft)", marginTop: 4 }}>click a spark to learn more</p>
      </div>
      <div style={{ position: "relative", width: "min(500px, 85vw)", aspectRatio: "1.3 / 1", opacity: loaded ? 1 : 0, transform: loaded ? "scale(1)" : "scale(0.95)", transition: "all 1s ease 0.4s" }}>
        <BrainSVG />
        <ConnectionLines />
        {PROJECTS.map((p, i) => <NeuronSpark key={p.id} project={p} index={i} isActive={hovered === p.id} onClick={() => onSelectProject(p)} onHover={() => setHovered(p.id)} onLeave={() => setHovered(null)} />)}
        {PROJECTS.map((p) => <Tooltip key={p.id + "-t"} project={p} visible={hovered === p.id} />)}
      </div>
    </div>
  );
}