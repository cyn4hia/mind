import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Change "/peek-inside-my-brain/" to match your GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: "/mind/",
});