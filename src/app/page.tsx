'use client'
import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";

export default function Home() {
  const { isLoaded } = useLoadScript({googleMapsApiKey: "AIzaSyCQiI-0DC0AYdgn2s4Nz-PXKKmR-41Zc-U"})

  if(!isLoaded) return <div>Loading....</div>

  return <Map/>;
}

function Map() {
  return (
    <GoogleMap
    zoom={10}
    center={{lat: 42.65123562471941, lng: -83.11635242753731}}
    mapContainerClassName="map-container"
      >
      <Marker position={{lat: 42.65123562471941, lng: -83.11635242753731}}/>
  </GoogleMap>
  );
}
