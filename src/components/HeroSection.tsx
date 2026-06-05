// src/components/HeroSection.tsx
import React, { useState, useCallback } from "react";
import { buildColors, DEFAULT_HUE, DEFAULT_DARKMODE } from "../theme.ts";
import ThemeControls from "./ThemeControls.tsx";
import IsometricStage from "./IsometricStage.tsx";

export default function HeroSection() {
  const [hue, setHue] = useState<number>(DEFAULT_HUE);
  const [darkMode, setDarkMode] = useState<boolean>(DEFAULT_DARKMODE);

  const colors = buildColors(hue, darkMode);

  const handleReset = useCallback(() => {
    setHue(DEFAULT_HUE);
    setDarkMode(DEFAULT_DARKMODE);
  }, []);

  const sectionStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: colors.bg,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 24px",
    overflow: "hidden",
    transition: "background 0.4s",
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontWeight: 700,
    fontSize: "clamp(28px, 5vw, 64px)",
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    color: colors.heading,
    textAlign: "center",
    marginBottom: "40px",
    maxWidth: "860px",
    transition: "color 0.4s",
  };

  return (
    <section style={sectionStyle}>
      <h1 style={headingStyle}>
        Experience our product
        <br />
        &amp; service suite
      </h1>

      <IsometricStage colors={colors} />

      <ThemeControls
        hue={hue}
        setHue={setHue}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onReset={handleReset}
        position="bottom"
      />
    </section>
  );
}
