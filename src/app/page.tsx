"use client";

import Map from "@/components/map";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useState } from "react";
import {LocationCard} from "@/components/location-card";

const center = { lat: 42.65123562471941, lng: -83.11635242753731 };
let markers = [
  { lat: 42.54492084597748, lng: -83.21533837375769 },
  { lat: 42.4903744430497, lng: -83.13492142011665 },
  { lat: 42.55730876255883, lng: -83.16016429229931 },
  { lat: 42.52998004090962, lng: -83.11867423887077 },
  { lat: 42.56382815278382, lng: -83.16193557325589 },
  { lat: 42.674320259204315, lng: -83.01280435235884 },
  { lat: 42.6482297750514, lng: -83.24513184441743 },
  { lat: 42.62827189565542, lng: -83.01076665791079 },
  { lat: 42.581134271907786, lng: -83.24376254441958 },
]; //These are the places where all of the stores are (continue adding stores)

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const [center, setCenter] = useState({ lat: 42.6512, lng: -83.1163 });

  const updateCenter = (newCenter: React.SetStateAction<{ lat: number; lng: number; }>) => {
    setCenter(newCenter);
  };

  //Will need to create a function that auto fills cards with all business info
  return (
    <>
      {!isLoaded ? (
        <></>
      ) : (
        <main>
          <div className="">
            {isSignedIn ? (
              <Map center={center} locations={markers} />
            ) : (
              <>
                <SignInButton />
                <SignUpButton />
              </>
            )}
          </div>
          <div>
            <div className="overflow-y-scroll scrollbar top-[66px] bottom-0 fixed w-1/4">
              <LocationCard lat={42.54492084597748} lng={-83.21533837375769}/>
            </div>
          </div>
        </main>
      )}
    </>
  )
}

