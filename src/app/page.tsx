'use client'

import Map from "@/components/Map";

const center  = {lat: 42.65123562471941, lng: -83.11635242753731};
export default function Home() {
  return <Map center={center} />;
}


