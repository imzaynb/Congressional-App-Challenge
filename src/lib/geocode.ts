import { LatLng } from "@/types/latlng";
const getLatLngFromAddress = async (address: string): Promise<LatLng | null> => {
  let latlng: LatLng | null = null;
  const geocoder = new window.google.maps.Geocoder();
  await geocoder.geocode({ address: address }, (results, status) => {
    if (!results) return;
    if (status === "OK" && results[0]) { // There is a slight problem here where if results ends up being null then bad stuff happens
      const { lat, lng } = results[0].geometry.location;
      latlng = { lat: lat(), lng: lng() };
    } else {
      console.error("Geocoding failed for address: ", address);
      return null;
    }
  });
  return latlng;
}

const getPlaceIdFromAddress = async (address: string): Promise<string | null> => {
  let placeId = "";
  const geocoder = new window.google.maps.Geocoder();
  await geocoder.geocode({ address: address }, (results, status) => {
    if (!results) return;
    if (status === "OK" && results[0]) { // There is a slight problem here where if results ends up being null then bad stuff happens
      const id = results[0].place_id;
      placeId = id;
    } else {
      console.error("Geocoding failed for address: ", address);
      return null;
    }
  });
  return placeId;
}

export default getLatLngFromAddress;