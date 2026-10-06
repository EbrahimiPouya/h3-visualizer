import { useMemo } from "react";
import { Polygon } from "react-leaflet";
import { cellToBoundary, gridDisk, latLngToCell } from "h3-js";


const MAX_H3_COUNT = 5000;

interface H3LayerProps {
  resolution: number;
  h3Opacity: number,
  h3FillOpacity: number,
  count: number;
  color: string;
  center: [number, number];
}

function getKForCount(count: number) {
  let k = 0;

  while (1 + 6 * k * (k + 1) < count) {
    k++;
  }

  return k;
}

export default function H3Layer({
  resolution,
  count,
  color,
  center,
  h3Opacity,
  h3FillOpacity,
}: H3LayerProps) {
  const cells = useMemo(() => {
    const safeCount = Math.min(Math.max(count, 1), MAX_H3_COUNT);

    const centerCell = latLngToCell(
      center[0],
      center[1],
      resolution
    );

    const k = getKForCount(safeCount);

    return gridDisk(centerCell, k).slice(0, safeCount);
  }, [resolution, count, center]);
  console.log(h3Opacity)

  return (
    <>
      {cells.map((cell) => {
        const boundary = cellToBoundary(cell);

        const positions = boundary.map(([lat, lng]) => [
          lat,
          lng,
        ] as [number, number]);

        return (
          <Polygon
            key={cell}
            positions={positions}
            pathOptions={{
              color,
              opacity: h3Opacity/100,
              weight: 1,
              fillOpacity: h3FillOpacity/100,
            }}
          />
        );
      })}
    </>
  );
}