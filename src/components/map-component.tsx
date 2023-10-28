import { LatLng } from "@/types/latlng";
import { GoogleMap, Marker, useJsApiLoader, } from "@react-google-maps/api";
import { useCallback, useState, useEffect, CSSProperties } from "react";

interface MapComponentProps {
  center: LatLng;
  markers: LatLng[];
  onUnmount: ((map: google.maps.Map) => void | Promise<void>) | undefined;
  onLoad: ((map: google.maps.Map) => void | Promise<void>) | undefined;
}

const containerStyle: CSSProperties = {
  width: "75%",
  height: "calc(100vh - 66px)", //66px is the height of the header so get the height of the whole screen and subtract the header
  float: "right",
};

export default function MapComponent({ center, markers, onLoad, onUnmount }: MapComponentProps): JSX.Element {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Render markers */}
      {markers.map((marker: LatLng, index: number) => (
        <Marker key={index} position={marker} />
      ))}

    </GoogleMap>
  );
}