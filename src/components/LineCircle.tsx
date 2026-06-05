// src/components/LineCircle.tsx
import React, { useId } from "react";
import type { GradientStop } from "../tileData.ts";

interface LineCircleProps {
  color: string;
  flipped?: boolean;
  lineWidth?: number;
  gradientStops: GradientStop[];
}

export default function LineCircle({
  color,
  flipped = false,
  lineWidth = 80,
  gradientStops,
}: LineCircleProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `lcg-${uid}`;

  const DOT_R = 5;
  const STEM_H = 1.5;
  const VB_H = DOT_R * 2;
  const CY = VB_H / 2;
  const DOT_CX = lineWidth + DOT_R;
  const VB_W = DOT_CX + DOT_R;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        transform: flipped ? "scaleX(-1)" : "none",
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={CY}
          x2={lineWidth}
          y2={CY}
        >
          {gradientStops.map((s, i) => (
            <stop
              key={i}
              offset={s.offset}
              stopColor={color}
              stopOpacity={s.opacity}
            />
          ))}
        </linearGradient>
      </defs>

      <rect
        x="0"
        y={CY - STEM_H / 2}
        width={lineWidth}
        height={STEM_H}
        fill={`url(#${gradId})`}
      />
      <circle cx={DOT_CX} cy={CY} r={DOT_R} fill={color} />
    </svg>
  );
}
