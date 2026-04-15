import { useState, useEffect } from "react";
import PROJECTS from "./projects/index.js";

function BrainSVG() {
  return (
    <svg viewBox="0 0 520 400" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <path
        d={`
            M 90,200
            
            C 68,170 50,140 46,120
            C 44,105 50,90 72,72
            C 94,52 126,36 168,28
            C 210,20 258,10 310,18
            C 362,26 404,26 440,54
            C 470,82 474,80 478,118
            C 488,136 488,162 482,200
            C 490,238 478,264 462,284
            
            C 450,298 434,306 416,308
 
            C 398,304 388,292 368,300
            C 348,500 332,280 310,276
            C 290,272 274,278 258,284
            C 242,290 224,286 206,282
 
            C 178,248 148,222 124,210
 
            C 110,204 98,200 90,200
            Z
          `}
        fill="none"
        stroke="#e8a0b0"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function NeuronSpark({ project, isActive, onClick, onHover, onLeave }) {
  return (
    <div onClick={onClick} onMouseEnter={onHover} onMouseLeave={onLeave}
      style={{ position: "absolute", left: `${project.x}%`, top: `${project.y}%`, transform: "translate(-50%, -50%)", zIndex: 10, cursor: "pointer", width: 22, height: 22 }}>
      <div className="glow-ring" style={{ position: "absolute", top: "50%", left: "50%", width: 70, height: 70, marginLeft: -35, marginTop: -35, borderRadius: "50%", background: `radial-gradient(circle, ${project.color}40 0%, transparent 70%)` }} />
      <div className="glow-ring-delayed" style={{ position: "absolute", top: "50%", left: "50%", width: 50, height: 50, marginLeft: -25, marginTop: -25, borderRadius: "50%", background: `radial-gradient(circle, ${project.color}30 0%, transparent 70%)` }} />
      <svg className="star-beam" width="22" height="22" viewBox="0 0 28 28" style={{ filter: `drop-shadow(0 0 6px ${project.color})`, position: "relative", zIndex: 2, display: "block" }}>
        <path d="M14 2 C14.6 10.5 17.5 13.4 26 14 C17.5 14.6 14.6 17.5 14 26 C13.4 17.5 10.5 14.6 2 14 C10.5 13.4 13.4 10.5 14 2Z" fill={project.color} opacity="0.85" />
        <path d="M14 7 C14.3 11.5 16.5 13.7 21 14 C16.5 14.3 14.3 16.5 14 21 C13.7 16.5 11.5 14.3 7 14 C11.5 13.7 13.7 11.5 14 7Z" fill="white" opacity="0.6" />
      </svg>
    </div>
  );
}
 
function Tooltip({ project, visible }) {
  if (!visible) return null;
  return (
    <div style={{ position: "absolute", left: `${project.x}%`, top: `${project.y - 8}%`, transform: "translate(-50%, -100%)", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: `1px solid ${project.color}40`, borderRadius: 8, padding: "6px 14px", zIndex: 100, pointerEvents: "none", animation: "tipIn 0.2s ease-out", whiteSpace: "nowrap", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, fontWeight: 600, fontStyle: "italic", color: "#3a3a3a" }}>{project.name}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#999", marginTop: 1 }}>view this neuron</div>
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
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(24px, 4.5vw, 40px)", fontWeight: 500, fontStyle: "italic", margin: 0, letterSpacing: "0.04em", color: "var(--text)" }}>Peek Inside My Mind</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "var(--text-soft)", marginTop: 8 }}>Only 18 years old, MIND still developing ...</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: "var(--text-soft)", marginTop: 5 }}>click a spark to learn more</p>
      </div>
      <div style={{ position: "relative", width: "min(500px, 85vw)", aspectRatio: "1.3 / 1", opacity: loaded ? 1 : 0, transform: loaded ? "scale(1)" : "scale(0.95)", transition: "all 1s ease 0.4s" }}>
        <BrainSVG />
        <ConnectionLines />
        {PROJECTS.map((p) => <NeuronSpark key={p.id} project={p} isActive={hovered === p.id} onClick={() => onSelectProject(p)} onHover={() => setHovered(p.id)} onLeave={() => setHovered(null)} />)}
        {PROJECTS.map((p) => <Tooltip key={p.id + "-t"} project={p} visible={hovered === p.id} />)}
      </div>
    </div>
  );
}