"use client";

import Map from "@/components/map";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useState } from "react";

const center = { lat: 42.65123562471941, lng: -83.11635242753731 };
let markers = [
  { lat: 40.7128, lng: -74.006 },
  { lat: 34.0522, lng: -118.2437 },
  { lat: 51.5074, lng: -0.1278 },
  { lat: 42.6512, lng: -83.1163 },
]; //These are the places where all of the stores are (continue adding stores)

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const [center, setCenter] = useState({ lat: 42.6512, lng: -83.1163 });

  const updateCenter = (newCenter: React.SetStateAction<{ lat: number; lng: number; }>) => {
    setCenter(newCenter);
  };

  return (
    <>
      {!isLoaded ? (
        <></>
      ) : (
        <main>
          <div className="container mt-8 flex justify-center">
            {isSignedIn ? (
              <Map center={center} locations={markers} />
            ) : (
              <>
                <SignInButton />
                <SignUpButton />
              </>
            )}
          </div>
        </main>
      )}
    </>
  )
}

