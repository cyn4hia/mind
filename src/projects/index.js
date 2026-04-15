// Import each project from its own file
import grapePortfolio from "./grape-portfolio";
import tftStats from "./tft-stats";
import nextProject from "./next-project";
import hciProject from "./hci-project";

// To add a new project:
// 1. Create a new .js file in this folder (copy any existing one)
// 2. Import it above
// 3. Add it to the array below

const PROJECTS = [grapePortfolio, tftStats, hciProject, nextProject];

export default PROJECTS;
