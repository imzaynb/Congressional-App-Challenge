'use client'

import Map from "@/components/map";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";

const center = { lat: 42.65123562471941, lng: -83.11635242753731 };

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <>
      {!isLoaded ? (
        <></>
      ) : (
        <main>
          <div className="container mt-8 flex justify-center">
            {isSignedIn ? (
              <Map center={center} />
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


