import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import H3Layer from "./H3Layer";
import MapCenterSelector from "./MapCenterSelector";
import { useEffect, useState } from "react";
import ProvinceLayer from "./ProvinceLayer";

const IRAN_BOUNDS: [[number, number], [number, number]] = [
  [25.0, 44.0],
  [40.0, 64.0],
];


const MIN_ZOOM = 0;
const MAX_ZOOM = 18;

export default function Map({
  tileUrl,
  count,
  resolution,
  color,
  borderColor,
  borderOpacity, 
  borderWeight,
  zoomPercent,
  h3Opacity,
  h3FillOpacity,
}: MapProps) {
  const [center, setCenter] = useState<[number, number]>([
    32.4279,
    53.688,
  ]);
  const [localZoom ,setLocalZoom] = useState(50)

  useEffect(()=>{

    const zoom1 = MIN_ZOOM + (zoomPercent / 100) * (MAX_ZOOM - MIN_ZOOM);
    console.log({zoom1})
    setLocalZoom(zoom1);
  }, [ zoomPercent])

  
  return (
    <MapContainer
      zoom={localZoom}
      zoomSnap={0.1}
      zoomDelta={0.1}
      bounds={IRAN_BOUNDS}
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <TileLayer
        url={tileUrl}
        attribution="Local tiles"
      />
      <SetMapZoom zoom={localZoom} />
      <H3Layer resolution={resolution} color={color} count={count} center={center} h3Opacity={h3Opacity} h3FillOpacity={h3FillOpacity} />
      <ProvinceLayer key={borderColor} color={borderColor} borderOpacity={borderOpacity} borderWeight={borderWeight}/>
      <MapCenterSelector
          onSelect={setCenter}
        />
    </MapContainer>
  );
}

interface MapProps {
  tileUrl: string;
  resolution: number;
  color: string;
  borderColor: string;
  borderWeight: number;
  borderOpacity: number;
  h3Opacity: number;
  h3FillOpacity: number;
  count: number;
  zoomPercent: number;
}

function SetMapZoom({ zoom }: { zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.options.zoomSnap = 0;
    map.setZoom(zoom , { animate: false });
  }, [map, zoom]);

  return null;
}