import { useJsApiLoader } from "@react-google-maps/api";
import { useCallback, CSSProperties } from "react";
import MapComponent from "./map-component";

interface MapProps {
  setMap: (map: google.maps.Map | null) => void;
}

const containerStyle: CSSProperties = {
  display: "none",
};

export default function BlindMap({ setMap }: MapProps): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCQiI-0DC0AYdgn2s4Nz-PXKKmR-41Zc-U",
    libraries: ["places"]
  });

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    if (mapInstance) {
      setMap(mapInstance);
    }
  },
    []
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <MapComponent onUnmount={onUnmount} onLoad={onLoad} containerStyle={containerStyle} markers={[]} center={{ lat: 0, lng: 0 }} markerOnClick={() => { }} />
  ) : (
    <></>
  );
}