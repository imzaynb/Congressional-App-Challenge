import { LatLng } from "@/types/latlng";
export const getLatLngFromAddress = async (address: string): Promise<LatLng | null> => {
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

export const getPlaceIdFromAddress = async (address: string): Promise<string | null> => {
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

export const getAddressFromLatLng = async (latlng: LatLng): Promise<string | null> => {
  let res = "";
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat},${latlng.lng}&location_type=ROOFTOP&result_type=street_address&key=AIzaSyCQiI-0DC0AYdgn2s4Nz-PXKKmR-41Zc-U`);
    const data = await response.json();
    // console.log(data);
    res = data["results"][0]["formatted_address"];
  } catch (error) {
    console.error(`${error} in getAddressFromLatLng`)
  }

  return res;
}
