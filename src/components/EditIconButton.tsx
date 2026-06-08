import React from "react";
import EditTextDialog from "./EditTextDialog.tsx";
import { useEditingSlot } from "../hooks/useEditingSlot.ts";
import type { Colors } from "../theme.ts";

interface EditIconButtonProps {
  id: string;
  title: string;
  value: string;
  maxLength?: number;
  colors: Colors;
  onCommit: (value: string) => void;
  style?: React.CSSProperties;
}

export default function EditIconButton({
  id,
  title,
  value,
  maxLength,
  colors,
  onCommit,
  style,
}: EditIconButtonProps) {
  const [open, openEditor, closeEditor] = useEditingSlot(id);
  const size = (style?.width as string | number | undefined) ?? "44px";
  const iconSize = (style?.fontSize as string | number | undefined) ?? "22";

  return (
    <span style={{ position: "relative", display: "inline-flex", ...style }}>
      <button
        type="button"
        aria-label={`Edit ${title}`}
        onClick={openEditor}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          padding: 0,
          background: "transparent",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          color: colors.isDark ? "#ffffff" : "#0a1628",
          opacity: 0.9,
          transition: "opacity 0.15s ease",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 18.643 22.771"
          fill="currentColor"
        >
          <path d="m17.709 0.81007c-0.88883-0.81689-3.136-1.233-4.0768-0.1792l-1.175 1.2544 4.5154 4.2293 1.175-1.2544c0.94602-0.97333 0.40094-3.2786-0.43853-4.0501zm-6.5281 2.4379-8.4179 8.9874 4.5154 4.2293 8.4179-8.9874zm-9.7073 10.364-0.94058 4.5065c-0.02024 0.6764 0.31835 0.9991 0.92254 0.86408l4.5334-1.1413zm-0.65222 7.0918c-1.1333-0.0267-1.0483 2.0795 0 2.0687h13.48c1.0482 0.0108 1.1333-2.0954 0-2.0687h-9.5359z" />
        </svg>
      </button>
      {open && (
        <EditTextDialog
          title={title}
          initialValue={value}
          maxLength={maxLength}
          colors={colors}
          onSave={(next) => {
            onCommit(next);
            closeEditor();
          }}
          onCancel={closeEditor}
        />
      )}
    </span>
  );
}
