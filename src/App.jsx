// src/App.jsx
import { useState, useEffect, useCallback } from "react";
import HomePage from "./HomePage";
import ProjectPage from "./ProjectPage";
import PROJECTS from "./projects";

export default function App() {
  const [currentProject, setCurrentProject] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const navigateTo = useCallback((project) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentProject(project);
      setTransitioning(false);
      window.scrollTo(0, 0);
    }, 350);
  }, []);

  const navigateHome = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentProject(null);
      setTransitioning(false);
    }, 350);
  }, []);

  // Arrow key navigation on homepage
  useEffect(() => {
    if (currentProject) return;
    let idx = -1;
    const handler = (e) => {
      if (e.key === "ArrowRight") {
        idx = (idx + 1) % PROJECTS.length;
        navigateTo(PROJECTS[idx]);
      } else if (e.key === "ArrowLeft") {
        idx = (idx - 1 + PROJECTS.length) % PROJECTS.length;
        navigateTo(PROJECTS[idx]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentProject, navigateTo]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        :root { --bg: #fafaf8; --text: #3a3a3a; --text-soft: #9a9a96; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: var(--bg); }
        @keyframes sparkBreath { 0%, 100% { transform: scale(1); opacity: 0.45; } 50% { transform: scale(1.3); opacity: 0.75; } }
        @keyframes sparkPulse { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes sparkleOut { 0% { transform: translate(0,0) scale(1); opacity: 0.7; } 100% { transform: translate(8px,-12px) scale(0); opacity: 0; } }
        @keyframes tipIn { from { opacity: 0; transform: translate(-50%, -92%); } to { opacity: 1; transform: translate(-50%, -100%); } }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 3px; }
      `}</style>

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
