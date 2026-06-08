// src/components/HeroSection.tsx
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  buildColors,
  DEFAULT_HUE,
  DEFAULT_DARKMODE,
  DEFAULT_SATURATION,
  DEFAULT_LIGHTNESS,
  FONT_FAMILY,
} from "../theme.ts";
import ThemeControls from "./ThemeControls.tsx";
import IsometricStage from "./IsometricStage.tsx";
import EditIconButton from "./EditIconButton.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { useIsMobile } from "../hooks/useIsMobile.ts";

const MOBILE_BREAKPOINT = 600;
const LOGIN_STORAGE_KEY = "dt-hero-login";
const THEME_STORAGE_KEY = "dt-hero-theme";
const TEXT_STORAGE_KEY = "dt-hero-text";

export const HEADING_TEXT_ID = "heading";
const DEFAULT_HEADING = "Experience our product & service suite";

interface ThemeState {
  hue: number;
  darkMode: boolean;
  saturation: number;
  lightness: number;
}

const DEFAULT_THEME: ThemeState = {
  hue: DEFAULT_HUE,
  darkMode: DEFAULT_DARKMODE,
  saturation: DEFAULT_SATURATION,
  lightness: DEFAULT_LIGHTNESS,
};

const DEFAULT_TEXT: Record<string, string> = {
  [HEADING_TEXT_ID]: DEFAULT_HEADING,
};

export default function HeroSection() {
  const [theme, setTheme, resetTheme] = useLocalStorage<ThemeState>(
    THEME_STORAGE_KEY,
    DEFAULT_THEME,
  );
  const { hue, darkMode, saturation, lightness } = theme;
  const [textOverrides, setTextOverrides, resetText] = useLocalStorage<
    Record<string, string>
  >(TEXT_STORAGE_KEY, DEFAULT_TEXT);
  const [loggedIn, setLoggedIn] = useState<boolean>(
    () => localStorage.getItem(LOGIN_STORAGE_KEY) === "true",
  );
  const mobile = useIsMobile(MOBILE_BREAKPOINT);

  const getText = useCallback(
    (id: string, fallback: string) => textOverrides[id] ?? fallback,
    [textOverrides],
  );

  const setText = useCallback(
    (id: string, value: string) => {
      setTextOverrides((prev) => ({ ...prev, [id]: value }));
    },
    [setTextOverrides],
  );

  const controlsRef = useRef<HTMLDivElement>(null);
  const [controlsHeight, setControlsHeight] = useState(0);

  useEffect(() => {
    const node = controlsRef.current;
    if (!node) return;
    const measure = () => setControlsHeight(node.scrollHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const toggleLoggedIn = useCallback(() => {
    setLoggedIn((prev) => {
      const next = !prev;
      localStorage.setItem(LOGIN_STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const colors = buildColors(hue, darkMode, saturation, lightness);

  const setHue = useCallback(
    (next: number) => setTheme((prev) => ({ ...prev, hue: next })),
    [setTheme],
  );
  const setDarkMode = useCallback(
    (next: boolean) => setTheme((prev) => ({ ...prev, darkMode: next })),
    [setTheme],
  );
  const setSaturation = useCallback(
    (next: number) => setTheme((prev) => ({ ...prev, saturation: next })),
    [setTheme],
  );
  const setLightness = useCallback(
    (next: number) => setTheme((prev) => ({ ...prev, lightness: next })),
    [setTheme],
  );

  const handleReset = useCallback(() => {
    resetTheme();
    resetText();
  }, [resetTheme, resetText]);

  const isThemeDefault =
    hue === DEFAULT_HUE &&
    darkMode === DEFAULT_DARKMODE &&
    saturation === DEFAULT_SATURATION &&
    lightness === DEFAULT_LIGHTNESS;

  const isTextDefault = Object.keys(textOverrides).length === 0;

  const heading = getText(HEADING_TEXT_ID, DEFAULT_HEADING);

  const sectionStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: colors.bg,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "96px 24px 48px",
    overflow: "visible",
    transition: "background 0.4s",
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontWeight: 600,
    fontSize: "clamp(28px, 5vw, 64px)",
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    color: colors.heading,
    textAlign: "center",
    marginBottom: "40px",
    maxWidth: "684px",
    transition: "color 0.4s",
  };

  const loginButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "24px",
    right: "24px",
    fontFamily: FONT_FAMILY,
    fontSize: "14px",
    fontWeight: 700,
    color: "#fff",
    background: "#1488fc",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    transition: "background 0.2s",
  };

  return (
    <section style={{ ...sectionStyle, position: "relative" }}>
      <button
        style={loginButtonStyle}
        onClick={toggleLoggedIn}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#6b7280")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#1488fc")}
      >
        {loggedIn ? "Logout" : "Login"}
      </button>
      <div style={{ position: "relative", display: "inline-block" }}>
        {loggedIn && (
          <EditIconButton
            id={HEADING_TEXT_ID}
            title="Edit Heading Text"
            value={heading}
            maxLength={50}
            colors={colors}
            onCommit={(next: string) => setText(HEADING_TEXT_ID, next)}
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translate(-50%, -28px)",
            }}
          />
        )}
        <h1 style={headingStyle}>{heading}</h1>
      </div>

      <div style={{ display: "flex", gap: "24px", marginBottom: "32px" }}>
        <a
          href="https://www.directtransact-home.co.za/developers"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={(e) => (e.currentTarget.style.color = "#9aa0a6")}
          onMouseLeave={(e) => (e.currentTarget.style.color = colors.heading)}
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: "16px",
            fontWeight: 700,
            color: colors.heading,
            textDecoration: "none",
            transition: "color 0.2s",
          }}
        >
          See Original &gt;
        </a>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IsometricStage
          colors={colors}
          loggedIn={loggedIn}
          getText={getText}
          setText={setText}
        />
        <div
          style={{
            width: "100%",
            padding: mobile ? "12px 24px 8px" : "32px 24px 8px",
            overflow: "hidden",
            maxHeight: loggedIn ? `${controlsHeight + 40}px` : "0px",
            opacity: loggedIn ? 1 : 0,
            transition:
              "max-height 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease",
            pointerEvents: loggedIn ? "auto" : "none",
          }}
        >
          <div ref={controlsRef}>
            <ThemeControls
              hue={hue}
              setHue={setHue}
              saturation={saturation}
              setSaturation={setSaturation}
              lightness={lightness}
              setLightness={setLightness}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onReset={handleReset}
              canReset={!isThemeDefault || !isTextDefault}
              position="bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
