import type { CSSProperties } from "react";

interface RangeInputProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  suffix?: string;
  disabled?: boolean;
}

const containerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
};

const rangeStyle: CSSProperties = {
  flex: 1,
  minWidth: 0,
  accentColor: "#2563eb",
  cursor: "pointer",
};

const valueStyle: CSSProperties = {
  minWidth: 38,
  textAlign: "center",
  fontSize: 12,
  color: "#555",
  background: "#f3f4f6",
  borderRadius: 5,
  padding: "4px 5px",
  boxSizing: "border-box",
};

export default function RangeInput({
  value,
  min,
  max,
  step = 1,
  onChange,
  suffix = "",
  disabled = false,
}: RangeInputProps) {
  const safeMin = Math.min(min, max);
  const safeMax = Math.max(min, max);
  const safeValue = Math.min(
    safeMax,
    Math.max(safeMin, value),
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nextValue = Number(event.target.value);

    if (!Number.isFinite(nextValue)) {
      return;
    }

    onChange(
      Math.min(
        safeMax,
        Math.max(safeMin, nextValue),
      ),
    );
  };

  return (
    <div style={containerStyle}>
      <input
        type="range"
        min={safeMin}
        max={safeMax}
        step={step}
        value={safeValue}
        disabled={disabled}
        onChange={handleChange}
        aria-valuemin={safeMin}
        aria-valuemax={safeMax}
        aria-valuenow={safeValue}
        style={{
          ...rangeStyle,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      />

      <span style={valueStyle}>
        {safeValue}
        {suffix}
      </span>
    </div>
  );
}