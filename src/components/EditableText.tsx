import React from "react";
import EditIconButton from "./EditIconButton.tsx";
import type { Colors } from "../theme.ts";

interface EditableTextProps {
  id: string;
  loggedIn: boolean;
  title: string;
  value: string;
  maxLength?: number;
  colors: Colors;
  onCommit: (value: string) => void;
  iconStyle?: React.CSSProperties;
  children: React.ReactNode;
}

export default function EditableText({ id, loggedIn, title, value, maxLength, colors, onCommit, iconStyle, children }: EditableTextProps) {
  if (!loggedIn) return <>{children}</>;

  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "8px" }}>
      {children}
      <EditIconButton id={id} title={title} value={value} maxLength={maxLength} colors={colors} onCommit={onCommit} style={iconStyle} />
    </span>
  );
}
