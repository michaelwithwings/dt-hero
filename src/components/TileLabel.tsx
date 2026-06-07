// src/components/TileLabel.tsx
import React from "react";
import LineCircle from "./LineCircle.tsx";
import EditIconButton from "./EditIconButton.tsx";
import { FONT_FAMILY } from "../theme.ts";
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
  loggedIn?: boolean;
  editId?: string;
  onCommitLabel?: (next: string) => void;
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
  loggedIn = false,
  editId,
  onCommitLabel,
}: TileLabelProps) {
  const isLeft = side === "left";

  const DOT_DIAMETER = 18;
  const svgVbH = 10;
  const scale = DOT_DIAMETER / svgVbH;
  const svgVbW = lineWidth + 10;
  const connW = svgVbW * scale;
  const dotOffset = ((lineWidth + 5) / svgVbW) * connW;

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    display: "flex",
    flexDirection: isLeft ? "row-reverse" : "row",
    alignItems: "center",
    gap: "16px",
    pointerEvents: "none",
    top: "50%",
    transform: "translateY(-50%)",
    whiteSpace: "nowrap",
    ...(isLeft ? { right: 0 } : { left: 0 }),
  };

  const editIconStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    ...(isLeft ? { right: `${dotOffset}px` } : { left: `${dotOffset}px` }),
    transform: `translate(${isLeft ? "50%" : "-50%"}, calc(-50% - ${DOT_DIAMETER / 2 + 18}px))`,
    pointerEvents: "auto",
  };

  const connectorStyle: React.CSSProperties = {
    position: "relative",
    width: `${connW}px`,
    height: `${DOT_DIAMETER}px`,
    flexShrink: 0,
    transform: hovered
      ? `translateX(${isLeft ? -6 : 6}px) scale(1.08)`
      : "translateX(0) scale(1)",
    transformOrigin: isLeft ? "left center" : "right center",
    transition: "transform 0.2s ease",
  };

  const textStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontWeight: 700,
    fontSize: "22px",
    transform: hovered
      ? `translateX(${isLeft ? 2 : -2}px) scale(1.23)`
      : "translateX(0) scale(1)",
    transformOrigin: isLeft ? "right center" : "left center",
    transition: "color 0.2s ease, transform 0.2s ease",
    lineHeight: 1.15,
    color: hovered ? colors.labelHover : colors.label,
    letterSpacing: "0.01em",
    width: "12rem",
    maxWidth: "12rem",
    whiteSpace: "break-spaces",
    ...(isLeft ? { textAlign: "right" } : {}),
  };

  return (
    <div style={containerStyle}>
      <div style={connectorStyle}>
        <LineCircle
          color={hovered ? colors.labelHover : colors.connector}
          flipped={isLeft}
          lineWidth={lineWidth}
          gradientStops={gradientStops}
        />
      </div>
      {editId && onCommitLabel && loggedIn && (
        <EditIconButton
          id={editId}
          title="Edit Label Text"
          value={label}
          maxLength={25}
          colors={colors}
          onCommit={onCommitLabel}
          style={editIconStyle}
        />
      )}
      <span
        style={{
          ...textStyle,
          cursor: onMouseEnter ? "pointer" : "default",
          pointerEvents: onMouseEnter || loggedIn ? "auto" : "none",
          display: "inline-flex",
          alignItems: "baseline",
          justifyContent: isLeft ? "flex-end" : "flex-start",
          gap: "6px",
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {label}
      </span>
    </div>
  );
}
