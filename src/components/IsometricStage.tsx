// src/components/IsometricStage.tsx
import React, { useState, useEffect } from "react";
import TopElement from "./TopElement.tsx";
import BottomElement from "./BottomElement.tsx";
import { TOP_TILES, BOTTOM_TILE } from "../tileData.ts";
import type { Colors } from "../theme.ts";

const MOBILE_BREAKPOINT = 600;

interface IsometricStageProps {
  colors: Colors;
}

export default function IsometricStage({ colors }: IsometricStageProps) {
  const [entered, setEntered] = useState<boolean>(false);
  const [floating, setFloating] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(
    () => window.innerWidth < MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    const t1 = setTimeout(() => setEntered(true), 80);
    const t2 = setTimeout(() => setFloating(true), 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // TILE_W: rendered pixel width of each SVG tile element
  // SIDE_W: space on each side for labels (connector 100px + text ~160px + padding)
  const TILE_W = 480;
  const SIDE_W = mobile ? 0 : 280;
  const STAGE_W = TILE_W + SIDE_W * 2;
  const STAGE_H = 340;

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

  const sharedTile: React.CSSProperties = {
    position: "absolute",
    width: `${TILE_W}px`,
    left: `${SIDE_W}px`,
  };

  const bottomStyle: React.CSSProperties = {
    ...sharedTile,
    top: "162px",
    opacity: entered ? 1 : 0,
    transform: entered ? "translateY(0)" : "translateY(24px)",
    transition:
      "opacity 1s cubic-bezier(0.22,1,0.36,1) 0.3s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.3s",
    animation: floating ? "isoFloatDown 7s ease-in-out 0s infinite" : "none",
  };

  const topStyle: React.CSSProperties = {
    ...sharedTile,
    top: "0px",
    zIndex: 1,
    opacity: entered ? 1 : 0,
    transform: entered ? "translateY(0)" : "translateY(-18px)",
    transition:
      "opacity 1.1s cubic-bezier(0.22,1,0.36,1) 0.85s, transform 1.1s cubic-bezier(0.22,1,0.36,1) 0.85s",
    animation: floating ? "isoFloatUp 7s ease-in-out 0.2s infinite" : "none",
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          width: `${STAGE_W}px`,
          height: `${STAGE_H}px`,
          margin: "0 auto",
        }}
      >
        <style>{`
          @keyframes isoFloatDown {
            0%, 100% { transform: translateY(0);   }
            50%       { transform: translateY(6px); }
          }
          @keyframes isoFloatUp {
            0%, 100% { transform: translateY(0);    }
            50%       { transform: translateY(-5px); }
          }
        `}</style>

        <div style={glowStyle} />
        <div style={bottomStyle}>
          <BottomElement colors={colors} tileWidth={TILE_W} mobile={mobile} />
        </div>
        <div style={topStyle}>
          <TopElement colors={colors} tileWidth={TILE_W} mobile={mobile} />
        </div>
      </div>

      {mobile && (
        <ul
          style={{
            listStyle: "none",
            margin: "24px 0 0",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {[...TOP_TILES, BOTTOM_TILE].map(({ id, label }) => (
            <li
              key={id}
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 700,
                fontSize: "22px",
                color: colors.label,
                letterSpacing: "0.01em",
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
