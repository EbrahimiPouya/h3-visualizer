import { useState } from "react";
import Map from "./components/Map";
import ColorInput from "./components/ColorInput";
import RangeInput from "./components/RangeInput";

const TILE_SERVERS = {
  osm: {
    label: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
};

const MAX_CELLS = 500;

const sectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: "#333",
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: 8,
  marginBottom: 2,
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  fontSize: 13,
  color: "#444",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "7px 8px",
  border: "1px solid #d1d5db",
  borderRadius: 5,
  fontSize: 13,
};

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [tileServer, setTileServer] =
    useState<keyof typeof TILE_SERVERS>("osm");
  const [zoomPercent, setZoomPercent] = useState(50);
  const [resolution, setResolution] = useState(5);

  const [color, setColor] = useState("#ff0000");
  const [borderColor, setBorderColor] = useState("#50d475");

  const [borderWeight, setBorderWeight] = useState(3);
  const [borderOpacity, setBorderOpacity] = useState(100);
  const [h3Opacity, setH3Opacity] = useState(100);
  const [h3FillOpacity, setH3FillOpacity] = useState(30);
  const [count, setCount] = useState(100);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const handleNumberChange = (
    value: string,
    setter: (value: number) => void,
    min: number,
    max: number,
  ) => {
    if (value === "") return;

    const parsed = Number(value);

    if (!Number.isNaN(parsed)) {
      setter(clamp(parsed, min, max));
    }
  };

  const renderNumberInput = (
    value: number,
    setter: (value: number) => void,
    min: number,
    max: number,
    step = 1,
  ) => (
    <input
      type="number"
      min={min}
      max={max}
      step={step}
      value={value}
      style={inputStyle}
      onChange={(e) =>
        handleNumberChange(e.target.value, setter, min, max)
      }
    />
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        direction: "rtl",
      }}
    >
      {/* Settings */}
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          top: 20,
          right: 20,
          width: settingsOpen ? 260 : "auto",
          maxHeight: "calc(100vh - 40px)",
          background: "white",
          borderRadius: 10,
          boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Settings Header */}
        <button
          type="button"
          onClick={() => setSettingsOpen((prev) => !prev)}
          style={{
            width: "100%",
            minWidth: settingsOpen ? 260 : 180,
            padding: "11px 14px",
            border: "none",
            background: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            fontSize: 14,
            fontWeight: 700,
            color: "#333",
            direction: "rtl",
          }}
        >
          <span>⚙️ تنظیمات نمایش نقشه</span>

          <span
            style={{
              fontSize: 12,
              color: "#666",
              transition: "transform 0.2s",
              transform: settingsOpen
                ? "rotate(180deg)"
                : "rotate(0deg)",
            }}
          >
            ▼
          </span>
        </button>

        {/* Settings Content */}
        {settingsOpen && (
          <div
            style={{
              maxHeight: "calc(100vh - 100px)",
              overflowY: "auto",
              padding: "0 16px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* Base Map */}
            <section style={sectionStyle}>
              <div style={sectionTitleStyle}>نقشه پایه</div>

              <label style={labelStyle}>
                منبع نقشه

                <select
                  value={tileServer}
                  style={inputStyle}
                  onChange={(e) =>
                    setTileServer(
                      e.target.value as keyof typeof TILE_SERVERS,
                    )
                  }
                >
                  {Object.entries(TILE_SERVERS).map(
                    ([key, server]) => (
                      <option key={key} value={key}>
                        {server.label}
                      </option>
                    ),
                  )}
                </select>
              </label>

              <label style={labelStyle}>
                درصد بزرگ‌نمایی

                <RangeInput
                  value={zoomPercent}
                  min={0}
                  max={100}
                  onChange={setZoomPercent}
                  suffix="%"
                />
              </label>
            </section>

            {/* H3 Grid */}
            <section style={sectionStyle}>
              <div style={sectionTitleStyle}>شبکه H3</div>

              <label style={labelStyle}>
                تفکیک‌پذیری شبکه

                <select
                  value={resolution}
                  style={inputStyle}
                  onChange={(e) =>
                    setResolution(Number(e.target.value))
                  }
                >
                  {Array.from(
                    { length: 12 },
                    (_, i) => i + 1,
                  ).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>

              <label style={labelStyle}>
                رنگ سلول‌ها

                <ColorInput
                  value={color}
                  onChange={setColor}
                />
              </label>

              <label style={labelStyle}>
                شفافیت خطوط سلول‌ها

                <RangeInput
                  value={h3Opacity}
                  min={0}
                  max={100}
                  onChange={setH3Opacity}
                  suffix="%"
                />
              </label>

              <label style={labelStyle}>
                شفافیت سطح داخلی سلول‌ها

                <RangeInput
                  value={h3FillOpacity}
                  min={0}
                  max={100}
                  onChange={setH3FillOpacity}
                  suffix="%"
                />
              </label>

              <label style={labelStyle}>
                حداکثر تعداد سلول‌ها

                {renderNumberInput(
                  count,
                  setCount,
                  1,
                  MAX_CELLS,
                )}
              </label>
            </section>

            {/* Borders */}
            <section style={sectionStyle}>
              <div style={sectionTitleStyle}>مرزها</div>

              <label style={labelStyle}>
                رنگ مرزها

                <ColorInput
                  value={borderColor}
                  onChange={setBorderColor}
                  presets={[
                    "#111827",
                    "#374151",
                    "#1E3A8A",
                    "#166534",
                    "#7C2D12",
                    "#581C87",
                    "#0F766E",
                    "#475569",
                  ]}
                />
              </label>

              <label style={labelStyle}>
                ضخامت خطوط مرزی

                <RangeInput
                  value={borderWeight}
                  min={1}
                  max={10}
                  onChange={setBorderWeight}
                />
              </label>

              <label style={labelStyle}>
                شفافیت خطوط مرزی

                <RangeInput
                  value={borderOpacity}
                  min={0}
                  max={100}
                  onChange={setBorderOpacity}
                  suffix="%"
                />
              </label>
            </section>
          </div>
        )}
      </div>

      <Map
        zoomPercent={zoomPercent}
        tileUrl={TILE_SERVERS[tileServer].url}
        resolution={resolution}
        color={color}
        h3Opacity={h3Opacity}
        h3FillOpacity={h3FillOpacity}
        count={count}
        borderColor={borderColor}
        borderOpacity={borderOpacity}
        borderWeight={borderWeight}
      />
    </div>
  );
}

export default App;