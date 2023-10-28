import { LatLng } from "@/types/latlng";

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