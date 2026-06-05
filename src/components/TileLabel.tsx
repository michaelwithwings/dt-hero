// src/components/TileLabel.tsx
import React from "react";
import LineCircle from "./LineCircle.tsx";
import type { Colors } from "../theme.ts";
import type { Side, GradientStop } from "../tileData.ts";

interface TileLabelProps {
  label: string;
  side: Side;
  colors: Colors;
  hovered: boolean;
  lineWidth: number;
  gradientStops: GradientStop[];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function TileLabel({
  label,
  side,
  colors,
  hovered,
  lineWidth,
  gradientStops,
  onMouseEnter,
  onMouseLeave,
}: TileLabelProps) {
  const isLeft = side === "left";

  const DOT_DIAMETER = 18;
  const svgVbH = 10;
  const scale = DOT_DIAMETER / svgVbH;
  const svgVbW = lineWidth + 10;
  const connW = svgVbW * scale;

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    display: "flex",
    flexDirection: isLeft ? "row-reverse" : "row",
    alignItems: "center",
    gap: 0,
    pointerEvents: onMouseEnter ? "auto" : "none",
    top: "50%",
    transform: "translateY(-50%)",
    whiteSpace: "nowrap",
    ...(isLeft ? { right: 0 } : { left: 0 }),
  };

  const connectorStyle: React.CSSProperties = {
    width: `${connW}px`,
    height: `${DOT_DIAMETER}px`,
    flexShrink: 0,
  };

  const textStyle: React.CSSProperties = {
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontWeight: 700,
    fontSize: "22px",
    transform: hovered ? "scale(1.23)" : "scale(1)",
    transformOrigin: isLeft ? "right center" : "left center",
    transition: "transform 0.2s ease",
    lineHeight: 1.15,
    color: colors.label,
    letterSpacing: "0.01em",
    width: "12rem",
    maxWidth: "12rem",
    whiteSpace: "break-spaces",
    ...(isLeft ? { paddingRight: "16px", textAlign: "right" } : { paddingLeft: "16px" }),
  };

  return (
    <div style={containerStyle}>
      <div style={connectorStyle}>
        <LineCircle
          color={colors.connector}
          flipped={isLeft}
          lineWidth={lineWidth}
          gradientStops={gradientStops}
        />
      </div>
      <span
        style={{ ...textStyle, cursor: onMouseEnter ? "pointer" : "default" }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >{label}</span>
    </div>
  );
}
