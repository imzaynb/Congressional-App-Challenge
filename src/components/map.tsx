import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState, useEffect} from "react";

interface MapProps {
  center: { lat: number; lng: number };
  locations: (string | { lat: number; lng: number })[]; // Allow either addresses or coordinates
}

const containerStyle = {
  width: "70%",
  height: "calc(100vh - 66px)", //66px is the height of the header so get the height of the whole screen and subtract the header
  float: "right",
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
        //Dialog box
        //If map is loaded, then ask the user for their location
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          map.setCenter(new google.maps.LatLng(latitude, longitude)); //Janky set the new center of the map
          //Setting a marker at their location with a home icon
          const image = "https://imageupload.io/ib/ffAkQ56AA4u0iaH_1697423481.png";
          const marker= new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map,
            icon: image,
          });
        })
        //Dialog box end

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
      zoom={14}
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