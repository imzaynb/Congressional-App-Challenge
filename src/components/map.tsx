import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";

interface MapProps {
  center: { lat: number, lng: number }
}

const containerStyle = {
  width: '50vw',
  height: '50vh'
};

export default function Map({ center }: MapProps): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCQiI-0DC0AYdgn2s4Nz-PXKKmR-41Zc-U"
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center}></Marker>
    </GoogleMap>
  ) : <></>;
}