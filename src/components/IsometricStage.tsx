// src/components/IsometricStage.tsx
import React, { useState, useEffect, useRef } from "react";
import TopElement from "./TopElement.tsx";
import BottomElement from "./BottomElement.tsx";
import EditableText from "./EditableText.tsx";
import { useIsMobile } from "../hooks/useIsMobile.ts";
import { TOP_TILES, BOTTOM_TILE } from "../tileData.ts";
import { FONT_FAMILY } from "../theme.ts";
import type { Colors } from "../theme.ts";

const MOBILE_BREAKPOINT = 900;

// ── Layout knobs ─────────────────────────────────────────────────────────────
const MOBILE_MAX_W = 440; // px — max tile width on mobile
const MOBILE_OVERLAP = 16; // % — how much bottom tile overlaps top on mobile

const DESKTOP_TILE_W = 480; // px — SVG tile render width
const DESKTOP_SIDE_W = 280; // px — space each side for connectors + labels
const DESKTOP_STAGE_H = 340; // px — total stage height
const DESKTOP_BOTTOM_TOP = 120; // px — top offset of bottom tile within stage
// ─────────────────────────────────────────────────────────────────────────────

interface IsometricStageProps {
  colors: Colors;
  loggedIn?: boolean;
  getText?: (id: string, fallback: string) => string;
  setText?: (id: string, value: string) => void;
}

export default function IsometricStage({
  colors,
  loggedIn = false,
  getText,
  setText,
}: IsometricStageProps) {
  const resolveText = (id: string, fallback: string) =>
    getText ? getText(id, fallback) : fallback;
  const commitText = (id: string, value: string): void => setText?.(id, value);
  const [entered, setEntered] = useState<boolean>(false);
  const [labelsVisible, setLabelsVisible] = useState<boolean>(false);
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);
  const [floating, setFloating] = useState<boolean>(false);
  const mobile = useIsMobile(MOBILE_BREAKPOINT);
  const [desktopScale, setDesktopScale] = useState<number>(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const TILE_W = DESKTOP_TILE_W;
  const STAGE_W = DESKTOP_TILE_W + DESKTOP_SIDE_W * 2;
  const STAGE_H = DESKTOP_STAGE_H;

  useEffect(() => {
    const t1 = setTimeout(() => setEntered(true), 80);
    const t2 = setTimeout(() => setLabelsVisible(true), 1600);
    const t3 = setTimeout(() => setFloating(true), 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (mobile) return;
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const available = entry.contentRect.width;
      setDesktopScale(Math.min(1, available / STAGE_W));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [mobile]);

  const SIDE_W = mobile ? 0 : DESKTOP_SIDE_W;

  const glowStyle: React.CSSProperties = {
    position: "absolute",
    top: "48%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "520px",
    height: "260px",
    background: `radial-gradient(ellipse, ${colors.glow} 0%, transparent 70%)`,
    borderRadius: "50%",
    pointerEvents: "none",
    transition: "background 0.5s",
  };

  const sharedTile: React.CSSProperties = mobile
    ? { position: "relative", width: "100%" }
    : { position: "absolute", width: `${TILE_W}px`, left: `${SIDE_W}px` };

  const bottomStyle: React.CSSProperties = mobile
    ? {
        ...sharedTile,
        marginTop: `-${MOBILE_OVERLAP}%`,
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(24px)",
        transition:
          "opacity 1s cubic-bezier(0.22,1,0.36,1) 0.85s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.85s",
        animation: floating
          ? "isoFloatDown 7s ease-in-out 0s infinite"
          : "none",
      }
    : {
        ...sharedTile,
        top: `${DESKTOP_BOTTOM_TOP}px`,
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(24px)",
        transition:
          "opacity 1s cubic-bezier(0.22,1,0.36,1) 0.85s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.85s",
        animation: floating
          ? "isoFloatDown 7s ease-in-out 0s infinite"
          : "none",
      };

  const topStyle: React.CSSProperties = mobile
    ? {
        ...sharedTile,
        zIndex: 1,
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(-18px)",
        transition:
          "opacity 1.1s cubic-bezier(0.22,1,0.36,1) 0.3s, transform 1.1s cubic-bezier(0.22,1,0.36,1) 0.3s",
        animation: floating
          ? "isoFloatUp 7s ease-in-out 0.2s infinite"
          : "none",
      }
    : {
        ...sharedTile,
        top: "0px",
        zIndex: 1,
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(-18px)",
        transition:
          "opacity 1.1s cubic-bezier(0.22,1,0.36,1) 0.3s, transform 1.1s cubic-bezier(0.22,1,0.36,1) 0.3s",
        animation: floating
          ? "isoFloatUp 7s ease-in-out 0.2s infinite"
          : "none",
      };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: mobile ? `${MOBILE_MAX_W}px` : `${STAGE_W}px`,
        margin: "0 auto",
      }}
    >
      {/* Inner div: fixed size on desktop, scaled down to fit; fluid on mobile */}
      <div
        ref={mobile ? undefined : wrapperRef}
        style={{
          position: "relative",
          width: mobile ? "100%" : `${STAGE_W}px`,
          height: mobile ? "auto" : `${STAGE_H}px`,
          transformOrigin: "top center",
          transform:
            !mobile && desktopScale < 1 ? `scale(${desktopScale})` : undefined,
          marginBottom:
            !mobile && desktopScale < 1
              ? `${STAGE_H * (desktopScale - 1)}px`
              : undefined,
        }}
      >
        <style>{`
          @keyframes mobileLabelIn {
            from { opacity: 0; transform: translateX(-24px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes isoFloatDown {
            0%, 100% { transform: translateY(0);   }
            50%       { transform: translateY(6px); }
          }
          @keyframes isoFloatUp {
            0%, 100% { transform: translateY(0);    }
            50%       { transform: translateY(-5px); }
          }
          @keyframes faceBorderFade {
            0%, 100% { opacity: 0.6; }
            50%      { opacity: 0.9; }
          }
          @keyframes iconGlow {
            0%      { opacity: 0; }
            60%     { opacity: 0; }
            70%     { opacity: 1; }
            80%     { opacity: 1; }
            90%     { opacity: 0; }
            100%    { opacity: 0; }
          }
          @keyframes perimeterTrace {
            0%      { stroke-dashoffset: var(--pl); opacity: 1; }
            8.93%   { stroke-dashoffset: 0;         opacity: 1; }
            50%     { stroke-dashoffset: 0;         opacity: 1; }
            57.14%  { stroke-dashoffset: 0;         opacity: 0; }
            57.15%  { stroke-dashoffset: var(--pl); opacity: 0; }
            100%    { stroke-dashoffset: var(--pl); opacity: 0; }
          }
          @keyframes perimeterTraceBottom {
            0%      { stroke-dashoffset: var(--pl); opacity: 0; }
            8.93%   { stroke-dashoffset: var(--pl); opacity: 1; }
            17.86%  { stroke-dashoffset: 0;         opacity: 1; }
            50%     { stroke-dashoffset: 0;         opacity: 1; }
            57.14%  { stroke-dashoffset: 0;         opacity: 0; }
            57.15%  { stroke-dashoffset: var(--pl); opacity: 0; }
            100%    { stroke-dashoffset: var(--pl); opacity: 0; }
          }
          @keyframes perimeterGlow {
            0%      { opacity: 0; }
            21.43%  { opacity: 0; }
            28.57%  { opacity: 1; }
            35.71%  { opacity: 1; }
            42.86%  { opacity: 0; }
            100%    { opacity: 0; }
          }
        `}</style>

        {!mobile && <div style={glowStyle} />}
        {mobile ? (
          <>
            <div style={topStyle}>
              <TopElement
                colors={colors}
                tileWidth={TILE_W}
                mobile={mobile}
                labelsVisible={labelsVisible}
                loggedIn={loggedIn}
                getText={resolveText}
                setText={commitText}
                hoveredTile={hoveredTile}
                setHoveredTile={setHoveredTile}
              />
            </div>
            <div style={bottomStyle}>
              <BottomElement
                colors={colors}
                tileWidth={TILE_W}
                mobile={mobile}
                labelsVisible={labelsVisible}
                loggedIn={loggedIn}
                getText={resolveText}
                setText={commitText}
                hovered={hoveredTile === BOTTOM_TILE.id}
                setHovered={(h) => setHoveredTile(h ? BOTTOM_TILE.id : null)}
              />
            </div>
          </>
        ) : (
          <>
            <div style={bottomStyle}>
              <BottomElement
                colors={colors}
                tileWidth={TILE_W}
                mobile={mobile}
                labelsVisible={labelsVisible}
                loggedIn={loggedIn}
                getText={resolveText}
                setText={commitText}
                hovered={hoveredTile === BOTTOM_TILE.id}
                setHovered={(h) => setHoveredTile(h ? BOTTOM_TILE.id : null)}
              />
            </div>
            <div style={topStyle}>
              <TopElement
                colors={colors}
                tileWidth={TILE_W}
                mobile={mobile}
                labelsVisible={labelsVisible}
                loggedIn={loggedIn}
                getText={resolveText}
                setText={commitText}
                hoveredTile={hoveredTile}
                setHoveredTile={setHoveredTile}
              />
            </div>
          </>
        )}
      </div>

      {mobile && (
        <ul
          style={{
            listStyle: "none",
            margin: "24px 0 0",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: loggedIn ? "0px" : "8px",
          }}
        >
          {[...TOP_TILES, BOTTOM_TILE].map(({ id, label }, index) => {
            const text = resolveText(id, label);
            return (
              <li
                key={id}
                onClick={() =>
                  setHoveredTile(hoveredTile === id ? null : id)
                }
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: 700,
                  fontSize: "22px",
                  lineHeight: loggedIn ? 1.1 : "normal",
                  color: hoveredTile === id ? colors.labelHover : colors.label,
                  letterSpacing: "0.01em",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  transition: "color 0.2s",
                  opacity: labelsVisible ? 1 : 0,
                  animation: labelsVisible
                    ? `mobileLabelIn 0.5s ease-out ${index * 90}ms both`
                    : "none",
                }}
              >
                <EditableText
                  id={id}
                  loggedIn={loggedIn}
                  title="Edit Label Text"
                  value={text}
                  maxLength={25}
                  colors={colors}
                  onCommit={(next: string) => commitText(id, next)}
                  iconStyle={{ width: "28px", height: "28px", fontSize: "22" }}
                >
                  {text}
                </EditableText>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
