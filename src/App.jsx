import { useState, useEffect, useCallback } from "react";
import HomePage from "./HomePage.jsx";
import ProjectPage from "./ProjectPage.jsx";
import PROJECTS from "./projects/index.js";

export default function App() {
  const [currentProject, setCurrentProject] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [dark, setDark] = useState(false);

  // Apply theme to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty("--bg", dark ? "#0a0a0a" : "#ffffff");
    document.documentElement.style.setProperty("--text", dark ? "#f0ece4" : "#000000");
    document.documentElement.style.setProperty("--text-soft", dark ? "#8a8a86" : "#9a9a96");
  }, [dark]);

  const navigateTo = useCallback((project) => {
    setTransitioning(true);
    setTimeout(() => { setCurrentProject(project); setTransitioning(false); window.scrollTo(0, 0); }, 350);
  }, []);

  const navigateHome = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => { setCurrentProject(null); setTransitioning(false); }, 350);
  }, []);

  useEffect(() => {
    if (currentProject) return;
    let idx = -1;
    const handler = (e) => {
      if (e.key === "ArrowRight") { idx = (idx + 1) % PROJECTS.length; navigateTo(PROJECTS[idx]); }
      else if (e.key === "ArrowLeft") { idx = (idx - 1 + PROJECTS.length) % PROJECTS.length; navigateTo(PROJECTS[idx]); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentProject, navigateTo]);

  const sparkColor = dark ? "#f0b8c0" : "#c4707e";

  return (
    <>
      {/* Dark mode toggle — neuron spark */}
      <button
        onClick={() => setDark(!dark)}
        style={{
          position: "fixed", top: 20, right: 20, zIndex: 1000,
          background: "none", border: "none", cursor: "pointer",
          padding: 8,
        }}
        title={dark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <div style={{
          position: "relative", width: 32, height: 32,
        }}>
          {/* Glow behind spark */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 40, height: 40, marginLeft: -20, marginTop: -20,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${sparkColor}40 0%, transparent 70%)`,
            animation: "sparkTogglePulse 2s ease-in-out infinite",
          }} />
          <svg width="32" height="32" viewBox="0 0 28 28" style={{
            position: "relative", zIndex: 2, display: "block",
            filter: `drop-shadow(0 0 6px ${sparkColor}80)`,
            transition: "filter 0.3s ease",
          }}>
            <path d="M14 2 C14.6 10.5 17.5 13.4 26 14 C17.5 14.6 14.6 17.5 14 26 C13.4 17.5 10.5 14.6 2 14 C10.5 13.4 13.4 10.5 14 2Z" fill={sparkColor} />
          </svg>
        </div>
      </button>

      <div style={{ opacity: transitioning ? 0 : 1, transition: "opacity 0.35s ease" }}>
        {currentProject ? (
          <ProjectPage project={currentProject} onBack={navigateHome} />
        ) : (
          <HomePage onSelectProject={navigateTo} />
        )}
      </div>
    </>
  );
}