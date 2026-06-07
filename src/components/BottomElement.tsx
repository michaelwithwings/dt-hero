// src/components/BottomElement.tsx
import React, { useState, useRef, useEffect } from "react";
import TileLabel from "./TileLabel.tsx";
import { BOTTOM_TILE } from "../tileData.ts";
import type { Colors } from "../theme.ts";

interface BottomElementProps {
  colors: Colors;
  tileWidth: number;
  mobile?: boolean;
  labelsVisible?: boolean;
  loggedIn?: boolean;
  getText?: (id: string, fallback: string) => string;
  setText?: (id: string, value: string) => void;
}

export default function BottomElement({ colors, mobile, labelsVisible = false, loggedIn = false, getText, setText }: BottomElementProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const perimeterRef = useRef<SVGPathElement>(null);
  const innerFaceRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = perimeterRef.current;
    if (!el) return;
    el.style.setProperty("--pl", `${el.getTotalLength()}`);
  }, [colors.isDark]);

  useEffect(() => {
    const el = innerFaceRef.current;
    if (!el) return;
    el.style.setProperty("--pl", `${el.getTotalLength()}`);
  }, []);


  const bodyHighlight: React.CSSProperties = hovered
    ? {
        filter: `brightness(1.4) drop-shadow(0 0 6px ${colors.icon})`,
        transition: "filter 0.25s",
      }
    : { filter: "none", transition: "filter 0.25s" };

  const faceBorderStyle: React.CSSProperties = {
    fill: "none",
    stroke: colors.bodyStroke,
    strokeWidth: "0.9px",
    animation: "faceBorderFade 6s ease-in-out infinite",
  };

  const faceBorderHoverStyle: React.CSSProperties = {
    fill: "none",
    stroke: hovered ? colors.iconHover : "none",
    strokeWidth: "0.6px",
    opacity: hovered ? 1 : 0,
    filter: hovered
      ? `drop-shadow(0 0 3px ${colors.iconHoverGlow1}) drop-shadow(0 0 6px ${colors.iconHoverGlow2})`
      : "none",
    pointerEvents: "none",
    transition: "opacity 0.25s, stroke 0.25s, filter 0.25s",
  };

  const logoStyle: React.CSSProperties = {
    fill: hovered ? colors.iconHover : colors.logo,
    stroke: "none",
    transition: "fill 0.25s",
  };

  const innerTraceStyle: React.CSSProperties = {
    strokeDasharray: "var(--pl, 9999) var(--pl, 9999)",
    strokeDashoffset: hovered ? "0" : "var(--pl, 9999)",
    opacity: hovered ? 1 : 0,
    transition: hovered
      ? "stroke-dashoffset 0.45s ease-out, opacity 0.1s"
      : "stroke-dashoffset 0.3s ease-in, opacity 0.3s 0.1s",
  };

  const logoGlowStyle: React.CSSProperties = {
    fill: hovered ? colors.iconHover : colors.logo,
    stroke: "none",
    filter: hovered
      ? `drop-shadow(0 0 4px ${colors.iconHoverGlow1}) drop-shadow(0 0 12px ${colors.iconHoverGlow2})`
      : `drop-shadow(0 0 4px ${colors.logoGlow1}) drop-shadow(0 0 12px ${colors.logoGlow2})`,
    transition: "fill 0.25s, filter 0.25s",
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg
        viewBox="0 0 230.25 87.117"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "auto",
          overflow: "visible",
          display: "block",
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id="botPerimGlow" x="-50%" y="-100%" width="200%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient
            id="botSideLitGrad"
            gradientUnits="userSpaceOnUse"
            x1="11" y1="42" x2="-219" y2="42"
          >
            <stop offset="0"    stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="0.43" stopColor="#ffffff" stopOpacity="0.13" />
            <stop offset="0.49" stopColor="#000000" stopOpacity="0.13" />
            <stop offset="1"    stopColor="#000000" stopOpacity="0.19" />
          </linearGradient>
          {/* Top face overlay — diagonal TL→BR, white highlight to black shadow */}
          <linearGradient
            id="botFaceGrad"
            gradientUnits="userSpaceOnUse"
            x1="-205" y1="0" x2="-115" y2="38"
          >
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="1" stopColor="#000000" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <g transform="translate(218.55 1.8521)">
          {/* Side extrusion */}
          <path
            fill={colors.side}
            stroke={colors.sideStroke}
            strokeWidth="0.4px"
            d="m-218.35 35.235c-0.14698 0.5976-0.0607 1.1927-0.0894 1.6242l0.21704 9.7674c0.032 2.8562 1.3234 3.5503 1.9813 3.8489l103.28 32.554c8.4171 3.0353 14.574 2.7928 23.188-0.46147l100.36-32.208c0.37598-0.2153 0.96124-0.21942 0.99684-2.8613l0.0181-10.919c-9e-3 -0.13758-0.04-0.206-0.0527-0.33072-0.21314 0.87502-1.0585 1.6873-2.7936 2.2846l-100.15 31.727c-8.9115 3.1554-15.789 2.4443-24.37-0.0176l-99.418-31.708c-2.055-0.91802-3.0056-2.08-3.1642-3.3006z"
          />

          {/* Side lighting overlay */}
          <path
            fill="url(#botSideLitGrad)"
            stroke="none"
            d="m-218.35 35.235c-0.14698 0.5976-0.0607 1.1927-0.0894 1.6242l0.21704 9.7674c0.032 2.8562 1.3234 3.5503 1.9813 3.8489l103.28 32.554c8.4171 3.0353 14.574 2.7928 23.188-0.46147l100.36-32.208c0.37598-0.2153 0.96124-0.21942 0.99684-2.8613l0.0181-10.919c-9e-3 -0.13758-0.04-0.206-0.0527-0.33072-0.21314 0.87502-1.0585 1.6873-2.7936 2.2846l-100.15 31.727c-8.9115 3.1554-15.789 2.4443-24.37-0.0176l-99.418-31.708c-2.055-0.91802-3.0056-2.08-3.1642-3.3006z"
          />

          {/* Outer face */}
          <path
            fill={colors.body}
            stroke={colors.bodyStroke}
            strokeWidth="0.3px"
            style={bodyHighlight}
            d="m-102.43-1.7479c-1.4557-0.0245-2.5252 0.22391-3.6964 0.4625l-110.76 34.895c-0.94483 0.44042-1.3186 1.0344-1.464 1.6257 0.15858 1.2206 1.1091 2.3826 3.1642 3.3006l99.418 31.708c8.5808 2.4619 15.459 3.173 24.37 0.0176l100.15-31.727c1.7351-0.59734 2.5805-1.4096 2.7936-2.2846-0.21866-2.1459-0.91816-2.5128-2.9042-3.0856l-107.84-34.327c-1.0316-0.24444-1.8499-0.60844-3.2267-0.58394z"
          />
          <path
            fill="url(#botFaceGrad)"
            stroke="none"
            d="m-102.43-1.7479c-1.4557-0.0245-2.5252 0.22391-3.6964 0.4625l-110.76 34.895c-0.94483 0.44042-1.3186 1.0344-1.464 1.6257 0.15858 1.2206 1.1091 2.3826 3.1642 3.3006l99.418 31.708c8.5808 2.4619 15.459 3.173 24.37 0.0176l100.15-31.727c1.7351-0.59734 2.5805-1.4096 2.7936-2.2846-0.21866-2.1459-0.91816-2.5128-2.9042-3.0856l-107.84-34.327c-1.0316-0.24444-1.8499-0.60844-3.2267-0.58394z"
          />
          <path
            style={faceBorderStyle}
            d="m-102.43-1.7479c-1.4557-0.0245-2.5252 0.22391-3.6964 0.4625l-110.76 34.895c-0.94483 0.44042-1.3186 1.0344-1.464 1.6257 0.15858 1.2206 1.1091 2.3826 3.1642 3.3006l99.418 31.708c8.5808 2.4619 15.459 3.173 24.37 0.0176l100.15-31.727c1.7351-0.59734 2.5805-1.4096 2.7936-2.2846-0.21866-2.1459-0.91816-2.5128-2.9042-3.0856l-107.84-34.327c-1.0316-0.24444-1.8499-0.60844-3.2267-0.58394z"
          />
          <path
            style={faceBorderHoverStyle}
            d="m-102.43-1.7479c-1.4557-0.0245-2.5252 0.22391-3.6964 0.4625l-110.76 34.895c-0.94483 0.44042-1.3186 1.0344-1.464 1.6257 0.15858 1.2206 1.1091 2.3826 3.1642 3.3006l99.418 31.708c8.5808 2.4619 15.459 3.173 24.37 0.0176l100.15-31.727c1.7351-0.59734 2.5805-1.4096 2.7936-2.2846-0.21866-2.1459-0.91816-2.5128-2.9042-3.0856l-107.84-34.327c-1.0316-0.24444-1.8499-0.60844-3.2267-0.58394z"
          />

          {/* Inner face */}
          <path
            fill={colors.inner}
            stroke={colors.innerStroke}
            strokeWidth="0.3px"
            d="m-108.68 12.034c5.034-1.0634 6.3262-1.0026 11.632 0.34619l65.256 21.437c2.2234 1.1251 3.1338 2.7653-0.0455 3.8587l-62.924 20.345c-5.6592 2.0018-9.785 1.8647-15.234 0.3029l-63.134-20.115c-6.5633-1.8716-2.9183-4.0408 0.37375-5.3066z"
          />
          <path
            ref={innerFaceRef}
            d="m-108.68 12.034c5.034-1.0634 6.3262-1.0026 11.632 0.34619l65.256 21.437c2.2234 1.1251 3.1338 2.7653-0.0455 3.8587l-62.924 20.345c-5.6592 2.0018-9.785 1.8647-15.234 0.3029l-63.134-20.115c-6.5633-1.8716-2.9183-4.0408 0.37375-5.3066z"
            fill="none"
            stroke={colors.perimeterStroke}
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pointerEvents="none"
            style={innerTraceStyle}
          />

          {/* Logo blobs — always visible base */}
          <path
            style={logoStyle}
            d="m-100.42 35.856c7.4038 1.476 14.484 2.0557 22.027-0.70012 4.4664-2.1198 3.5958-4.8562-3.5006-6.8396-9.8717-2.8639-25.772-0.80917-23.696 4.2007 0.88359 1.8065 2.8677 2.9705 5.1701 3.339zm-19.119-4.1468c-2.8094-0.65696-6.3567 0.0194-8.8861 0.80782-5.887 2.398-3.2783 4.2764-2.4235 5.9241 1.3056 1.5846 8.7653 4.4471 14.272 5.7086 7.775 1.2377 15.525 2.0218 23.158 0.70011 3.1068-0.44718 7.494-2.183 2.962-4.093z"
          />
          {/* Logo blobs — glow overlay, opacity animated */}
          <path
            style={{
              ...logoGlowStyle,
              opacity: 0,
              animation: "iconGlow 10s ease-in-out 1s infinite",
            }}
            d="m-100.42 35.856c7.4038 1.476 14.484 2.0557 22.027-0.70012 4.4664-2.1198 3.5958-4.8562-3.5006-6.8396-9.8717-2.8639-25.772-0.80917-23.696 4.2007 0.88359 1.8065 2.8677 2.9705 5.1701 3.339zm-19.119-4.1468c-2.8094-0.65696-6.3567 0.0194-8.8861 0.80782-5.887 2.398-3.2783 4.2764-2.4235 5.9241 1.3056 1.5846 8.7653 4.4471 14.272 5.7086 7.775 1.2377 15.525 2.0218 23.158 0.70011 3.1068-0.44718 7.494-2.183 2.962-4.093z"
          />

          {colors.isDark && (
            <>
              {/* Glow bloom — filtered duplicate, only visible during glow phase */}
              <path
                d="m-102.43-1.7486c-1.4557-0.0245-2.5261 0.2243-3.6973 0.46289l-110.76 34.895c-0.94483 0.44042-1.3174 1.0357-1.4629 1.627-0.14698 0.5976-0.06114 1.1915-0.08984 1.623l0.21679 9.7676c0.032 2.8562 1.3226 3.5511 1.9805 3.8496l103.29 32.553c8.4171 3.0353 14.574 2.7933 23.187-0.46094l100.36-32.209c0.37598-0.2153 0.96245-0.21943 0.99805-2.8613l0.017578-10.918c-9e-3 -0.13758-0.040035-0.20536-0.052735-0.33008-0.21866-2.1459-0.91824-2.5132-2.9043-3.0859l-107.84-34.328c-1.0316-0.24444-1.8498-0.60848-3.2266-0.58398z"
                fill="none"
                stroke={colors.perimeterStroke}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#botPerimGlow)"
                style={{
                  opacity: 0,
                  animation: "perimeterGlow 14s linear 2s infinite",
                }}
              />
              {/* Sharp stroke — drawn on, no filter */}
              <path
                ref={perimeterRef}
                d="m-102.43-1.7486c-1.4557-0.0245-2.5261 0.2243-3.6973 0.46289l-110.76 34.895c-0.94483 0.44042-1.3174 1.0357-1.4629 1.627-0.14698 0.5976-0.06114 1.1915-0.08984 1.623l0.21679 9.7676c0.032 2.8562 1.3226 3.5511 1.9805 3.8496l103.29 32.553c8.4171 3.0353 14.574 2.7933 23.187-0.46094l100.36-32.209c0.37598-0.2153 0.96245-0.21943 0.99805-2.8613l0.017578-10.918c-9e-3 -0.13758-0.040035-0.20536-0.052735-0.33008-0.21866-2.1459-0.91824-2.5132-2.9043-3.0859l-107.84-34.328c-1.0316-0.24444-1.8498-0.60848-3.2266-0.58398z"
                fill="none"
                stroke={colors.perimeterStroke}
                strokeWidth="0.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: "var(--pl, 9999) var(--pl, 9999)",
                  strokeDashoffset: "var(--pl, 9999)",
                  opacity: 0,
                  animation: "perimeterTraceBottom 14s linear 2s infinite",
                }}
              />
            </>
          )}
        </g>
      </svg>

      {/* Hit area — HTML overlay positioned by simple CSS percentages */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "absolute",
          top: "15%",
          left: "18%",
          width: "64%",
          height: "56%",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      />

      {/* Label — px anchor from tileData, positioned relative to tile div */}
      {!mobile && (
        <div
          style={{
            position: "absolute",
            left: `${BOTTOM_TILE.lx}px`,
            top: `${BOTTOM_TILE.ly}px`,
            width: 0,
            height: 0,
            pointerEvents: "none",
            opacity: labelsVisible ? 1 : 0,
            transform: labelsVisible ? "translateX(0)" : `translateX(${BOTTOM_TILE.side === "left" ? "40px" : "-40px"})`,
            transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1) 320ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) 320ms",
          }}
        >
          <TileLabel
            label={getText ? getText(BOTTOM_TILE.id, BOTTOM_TILE.label) : BOTTOM_TILE.label}
            side={BOTTOM_TILE.side}
            colors={colors}
            hovered={hovered}
            lineWidth={BOTTOM_TILE.lineWidth}
            gradientStops={BOTTOM_TILE.gradientStops}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            loggedIn={loggedIn}
            editId={BOTTOM_TILE.id}
            onCommitLabel={setText ? (next) => setText(BOTTOM_TILE.id, next) : undefined}
          />
        </div>
      )}
    </div>
  );
}
