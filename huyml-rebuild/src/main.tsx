import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { CourseHero } from "./pages/CourseHero";
import { installContainerFallback } from "./lib/containerFallback";
import "./styles.css";
installContainerFallback(import.meta.env.VITE_LEGACY_CSS === "only");

// Card preview is a development tool; it never ships in the production bundle.
const CanvasCardPreview = import.meta.env.DEV
  ? lazy(() =>
      import("./pages/CanvasCardPreview").then((m) => ({
        default: m.CanvasCardPreview,
      })),
    )
  : null;

createRoot(document.getElementById("root")!).render(
  CanvasCardPreview &&
    window.location.pathname.startsWith("/components/create-canvas") ? (
    <Suspense fallback={null}>
      <CanvasCardPreview />
    </Suspense>
  ) : (
    <CourseHero />
  ),
);
