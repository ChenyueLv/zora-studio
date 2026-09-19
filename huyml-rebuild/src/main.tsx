import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CanvasCardPreview } from "./pages/CanvasCardPreview";
import { CourseHero } from "./pages/CourseHero";
import { App } from "./App";
import { installContainerFallback } from "./lib/containerFallback";
import "./styles.css";
installContainerFallback(import.meta.env.VITE_LEGACY_CSS === "only");
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {window.location.pathname.startsWith("/components/create-canvas") ? (
      <CanvasCardPreview />
    ) : window.location.pathname.startsWith("/ai-course/hero") ? (
      <CourseHero />
    ) : (
      <App />
    )}
  </BrowserRouter>,
);
