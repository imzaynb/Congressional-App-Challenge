import { LatLng } from "@/types/latlng";
import { useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState, useEffect, CSSProperties } from "react";
import MapComponent from "./map-component";

import {getPlaceIdFromQuery} from "@/lib/places";

import { Address } from "@/types/database_types";


interface MapProps {
  center: LatLng,
  addresses: Address[], // Allow either addresses or coordinates
  markersOnClick: () => void,
}

const containerStyle: CSSProperties = {
  width: "75%",
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

  useEffect(() => {
    if (isLoaded && map) {
      // Clear existing markers
      setMarkers([]);

      const geocoder = new window.google.maps.Geocoder();
      const updatedMarkers: LatLng[] = [];

      const geocodeLocation = (location: string | LatLng) => {
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

      // Geocode each location and add it to the markers array
      locations.forEach((location) => {
        geocodeLocation(location);
      });

      getPlaceIdFromQuery("pappa roti rochester rd", map);

    }
  }, [isLoaded, map, locations]);

  const latlngs = addresses.map(address => {
    const latlng: LatLng = { lat: address.lat, lng: address.lng };
    return latlng;
  })


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
    <MapComponent onUnmount={onUnmount} onLoad={onLoad} containerStyle={containerStyle} markers={latlngs} center={center} markerOnClick={markersOnClick} />
  ) : (
    <></>
  );
}