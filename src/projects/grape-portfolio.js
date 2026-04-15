// src/projects/grape-portfolio.js
const grapePortfolio = {
  id: "grape-portfolio",
  name: "Grape Portfolio",
  x: 32,
  y: 22,
  color: "#8bb88a",
  date: "2025",
  skills: ["React", "Vite", "CSS", "GitHub Pages"],
  why: "I wanted a portfolio that felt uniquely me — playful, creative, and a little unexpected. Grapes became the motif that tied everything together.",
  steps: [
    {
      title: "Plan & Sketch",
      description:
        "Mapped out the sections, grape motifs, and color palette. Decided on a single-page scrolling layout with animated elements.",
    },
    {
      title: "Prototype",
      description:
        "Built the initial React/Vite scaffold. Experimented with grape cluster layouts and hover interactions.",
    },
    {
      title: "Develop",
      description:
        "Implemented responsive design using flexWrap and clamp() for natural adaptation. Built custom animations for grape elements.",
    },
    {
      title: "Launch",
      description:
        "Deployed to GitHub Pages, debugged image loading and mobile layout issues with scale transforms.",
    },
    {
      title: "What I Do Now",
      description:
        "Continuously refining interactions and adding new sections as my work grows.",
    },
  ],
};

export default grapePortfolio;
