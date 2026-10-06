import { useMapEvents } from "react-leaflet";

interface Props {
  onSelect: (center: [number, number]) => void;
}

export default function MapCenterSelector({ onSelect }: Props) {
  useMapEvents({
    click(e) {
      onSelect([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
}