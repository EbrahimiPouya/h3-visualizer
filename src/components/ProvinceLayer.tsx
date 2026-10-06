import { GeoJSON } from "react-leaflet";
import provinces from "./../data/provinces.json";

export default function ProvinceLayer ({color, borderOpacity, borderWeight}:{color: string, borderWeight: number, borderOpacity: number}) {
    return <GeoJSON key={color+borderOpacity+borderWeight}
    data={provinces as GeoJSON.GeoJsonObject}
    style={{
        color: color,
        opacity: borderOpacity/100,
        weight: borderWeight,
        fillOpacity: 0,
    }}
    />
}