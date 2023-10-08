'use client'
import React, { useState } from "react";
import Map from "@/components/Map";


let markers = [
  { lat: 40.7128, lng: -74.006 },
  { lat: 34.0522, lng: -118.2437 },
  { lat: 51.5074, lng: -0.1278 },
]; //These are the places where all of the stores are (continue adding stores)

export default function Home() {
  const [center, setCenter] = useState({ lat: 42.6512, lng: -83.1163 });

  const updateCenter = (newCenter: React.SetStateAction<{ lat: number; lng: number; }>) => {
    setCenter(newCenter);
  };

  return <Map center={center} locations={markers} />;  
}

export function updateMarkers(newMarker: string | { lat: number; lng: number; }){

  const geocoder = new window.google.maps.Geocoder();

  let updatedMarkers: { lat: number; lng: number; } = {lat: 0, lng: 0}

  if (typeof newMarker === "string") {
    // Location is an address, so we need to geocode it
    geocoder.geocode({ address: newMarker }, (results, status) => {
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
}


