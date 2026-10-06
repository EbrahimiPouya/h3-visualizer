import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
  presets?: string[];
}

const DEFAULT_PRESETS = [
  "#2563EB",
  "#06B6D4",
  "#10B981",
  "#84CC16",
  "#F59E0B",
  "#F97316",
  "#EF4444",
  "#EC4899",
  "#8B5CF6",
  "#64748B",
];

export default function ColorInput({
  value,
  onChange,
  presets = DEFAULT_PRESETS,
}: ColorInputProps) {
  const [open, setOpen] = useState(false);

  const handleChange = (color: string) => {
    onChange(color);
    setOpen(false);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: 36,
          height: 28,
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: 5,
          background: "white",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            borderRadius: 3,
            background: value,
          }}
        />
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1999,
            }}
          />

          <div
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 8px)",
              zIndex: 2000,
              width: 220,
              padding: 10,
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.18)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <HexColorPicker
              color={value}
              onChange={handleChange}
              style={{
                width: "100%",
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 7,
                marginTop: 12,
              }}
            >
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  title={preset}
                  onClick={() => handleChange(preset)}
                  style={{
                    width: 28,
                    height: 28,
                    padding: 0,
                    border:
                      value.toLowerCase() === preset.toLowerCase()
                        ? "2px solid #111827"
                        : "1px solid #d1d5db",
                    borderRadius: 6,
                    background: preset,
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}