import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios, { Axios } from "axios"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const roundToPlace = (num: number, place: number): number => {
  return (Math.round(num * Math.pow(10, place)) / Math.pow(10, place));
}

export const getPlaceIdFromAddress = async (address: string) => {
  const url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=businesses+" + address + "&key=AIzaSyCQiI-0DC0AYdgn2s4Nz-PXKKmR-41Zc-U&libraries=places";
  const {data} = await axios.get(url);
  return data["results"][0]["place_id"];
}

export const getImageFromRef = async (ref: string) => {
  const url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" + ref + "&key=AIzaSyCQiI-0DC0AYdgn2s4Nz-PXKKmR-41Zc-U";
  const {data} = await axios.get(url);
  console.log(data);
  return data;
}