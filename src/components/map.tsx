import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState, useEffect, SetStateAction } from "react";

interface MapProps {
  center: { lat: number; lng: number };
  locations: (string | { lat: number; lng: number })[]; // Allow either addresses or coordinates
}

const containerStyle = {
  width: "400px",
  height: "400px",
};

export default function Map({ center, locations }: MapProps): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCQiI-0DC0AYdgn2s4Nz-PXKKmR-41Zc-U",
  });

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState<any>([]);

  useEffect(() => {
    if (isLoaded && map) {

      const geocoder = new window.google.maps.Geocoder();

      const updatedMarkers: { lat: number; lng: number; }[] = [];

      const geocodeLocation = (location: string | { lat: number; lng: number; }) => {
        if (typeof location === "string") {
          // Location is an address, so we need to geocode it
          geocoder.geocode({ address: location }, (results, status) => {
            if (!results) return;
            if (status === "OK" && results[0]) { // There is a slight problem here where if results ends up being null then bad stuff happens
              const { lat, lng } = results[0].geometry.location;
              updatedMarkers.push({ lat: lat(), lng: lng() });
            } else {
              console.error("Geocoding failed for address: ", location);
            }
          });
        } else {
          // Location is already in lat/lng format, so add it directly
          updatedMarkers.push(location);
        }
        setMarkers(updatedMarkers);
      };

      // Clear existing markers
      setMarkers([]);

      // Geocode each location and add it to the markers array
      locations.forEach((location) => {
        geocodeLocation(location);
      });
      console.log(markers)
    }
  }, [isLoaded, map, locations]);

  const onLoad = useCallback((mapInstance: any) => {
    if (mapInstance) {

      const bounds = new window.google.maps.LatLngBounds(center);

      // Fit the map to the specified bounds.
      mapInstance.fitBounds(bounds);

      // Set the map instance in the component's state for future use.
      setMap(mapInstance);
    }
  },
    [center]
  );


  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Render markers */}
      {markers.map((marker: any, index: any) => (
        <Marker key={index} position={marker} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}