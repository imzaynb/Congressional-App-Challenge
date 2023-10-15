export function updateMarkers(markers: any, newMarker: string | { lat: number; lng: number; }) {

  const geocoder = new window.google.maps.Geocoder();

  let updatedMarkers: { lat: number; lng: number; } = { lat: 0, lng: 0 }

  if (typeof newMarker === "string") {
    // Location is an address, so we need to geocode it
    geocoder.geocode({ address: newMarker }, (results: any, status) => {
      if (status === "OK" && results[0]) { // There is a slight problem here where if results ends up being null then bad stuff happens
        const { lat, lng } = results[0].geometry.location;
        updatedMarkers = { lat: lat(), lng: lng() };
      } else {
        console.error("Geocoding failed for address: ", newMarker);
      }
    });
  } else {
    // Location is already in lat/lng format, so add it directly
    updatedMarkers = newMarker;
  }
  markers = [...markers, updatedMarkers];
  return markers;
}