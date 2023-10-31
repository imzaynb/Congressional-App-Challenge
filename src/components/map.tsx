import { LatLng } from "@/types/latlng";
import { useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState, useEffect, CSSProperties } from "react";
import MapComponent from "./map-component";

import { Address } from "@/types/database_types";


interface MapProps {
  center: LatLng,
  addresses: Address[], // Allow either addresses or coordinates
  markersOnClick: () => void,
}

const containerStyle: CSSProperties = {
  width: "66.666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666%",
  height: "calc(100vh - 66px)", //66px is the height of the header so get the height of the whole screen and subtract the header
  float: "right",
};

export default function Map({ center, addresses, markersOnClick }: MapProps): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCQiI-0DC0AYdgn2s4Nz-PXKKmR-41Zc-U",
    libraries: ["places"]
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    if (mapInstance) {
      setMap(mapInstance);
    }
  },
    [center]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <MapComponent onUnmount={onUnmount} onLoad={onLoad} containerStyle={containerStyle} address={addresses} center={center} markerOnClick={markersOnClick} />
  ) : (
    <></>
  );
}