import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { FONT_FAMILY } from "../theme.ts";
import type { Colors } from "../theme.ts";

interface EditTextDialogProps {
  title: string;
  initialValue: string;
  maxLength?: number;
  colors: Colors;
  onSave: (value: string) => void;
  onCancel: () => void;
}

export default function EditTextDialog({
  title,
  initialValue,
  maxLength,
  colors,
  onSave,
  onCancel,
}: EditTextDialogProps) {
  const [value, setValue] = useState(initialValue);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const dark = colors.isDark;
  const panelBg = dark ? "#15191f" : "#ffffff";
  const borderClr = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
  const textClr = dark ? "#fff" : "#0a1628";

  const onDragStart = useCallback((e: React.MouseEvent) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Pin the dialog to its current on-screen rect before switching to
    // absolute positioning, so the first drag move doesn't snap it.
    const origin = { x: rect.left, y: rect.top };
    setPos(origin);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: origin.x,
      originY: origin.y,
    };

    const onMove = (ev: MouseEvent) => {
      const d = dragRef.current;
      if (!d) return;
      setPos({
        x: d.originX + (ev.clientX - d.startX),
        y: d.originY + (ev.clientY - d.startY),
      });
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    zIndex: 1000,
  };

  const dialogStyle: React.CSSProperties = pos
    ? { position: "fixed", left: `${pos.x}px`, top: `${pos.y}px`, zIndex: 1001 }
    : {
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1001,
      };

  const buttonStyle = (primary: boolean): React.CSSProperties => ({
    fontFamily: FONT_FAMILY,
    fontSize: "13px",
    fontWeight: 700,
    color: primary ? "#fff" : textClr,
    background: primary ? "#1488fc" : "transparent",
    border: primary ? "none" : `1px solid ${borderClr}`,
    borderRadius: "8px",
    padding: "8px 18px",
    cursor: "pointer",
  });

  return createPortal(
    <>
      <div style={overlayStyle} onClick={onCancel} />
      <div
        ref={dialogRef}
        style={{
          ...dialogStyle,
          width: "min(360px, calc(100vw - 48px))",
          background: panelBg,
          border: `1px solid ${colors.label}`,
          borderRadius: "12px",
          boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onMouseDown={onDragStart}
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fff",
            background: colors.icon,
            padding: "14px 18px",
            borderBottom: `1px solid ${colors.label}`,
            cursor: "grab",
            userSelect: "none",
          }}
        >
          {title}
        </div>
        <div style={{ padding: "18px" }}>
          <input
            autoFocus
            type="text"
            value={value}
            maxLength={maxLength}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSave(value);
            }}
            style={{
              width: "100%",
              boxSizing: "border-box",
              fontFamily: FONT_FAMILY,
              fontSize: "15px",
              color: textClr,
              background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
              border: `1px solid ${colors.icon}`,
              borderRadius: "8px",
              padding: "10px 12px",
              outline: "none",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "16px",
            }}
          >
            <button style={buttonStyle(false)} onClick={onCancel}>
              Cancel
            </button>
            <button style={buttonStyle(true)} onClick={() => onSave(value)}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
