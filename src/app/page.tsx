"use client";

import Map from "@/components/map";
import { useUser, SignInButton, SignUpButton, useSession } from "@clerk/nextjs";
import React, {useEffect, useRef, useState} from "react";
import { LocationCard } from "@/components/location-card";
import { Button } from "@/components/ui/button";
import { LatLng } from "@/types/latlng";
import { createAccount, getAccount, getAddress, getAllBusinesses, matchAddress, supabaseClient } from "@/lib/database";
import { Account, Address, Business } from "@/types/database_types";

export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser();
  const { session } = useSession();
  const [center, setCenter] = useState<LatLng>({ lat: 0, lng: 0 });
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const loadInfo = async () => {
      if (isSignedIn) {
        const supabaseAccessToken = await session?.getToken({
          template: "supabase",
        });

        if (!supabaseAccessToken || !user?.id) {
          return;
        }

        const supabase = await supabaseClient(supabaseAccessToken);

        if (!supabase) {
          return;
        }

        let account = await getAccount(supabase, user.id);
        if (!account) {
          const c = await createAccount(supabase, user.id); // we need to assign it to some junk variable as we need it to be await, so that we wait until procedure is finished
          account = await getAccount(supabase, user.id);
        }

        const centerAddressId = (account as Account).address_id; // there is guaranteed to be an account by this point, the compiler is just tripping
        if (!centerAddressId) {
          return;
        }

        const centerAddress = await getAddress(supabase, centerAddressId);
        if (!centerAddress) {
          return;
        }

        const lat = centerAddress.lat;
        const lng = centerAddress.lng;
        setCenter({ lat: lat, lng: lng });

        const accessedBusinesses = await getAllBusinesses(supabase);

        if (!accessedBusinesses) {
          console.log("THIS IS NULL SHIIII");
          return;
        }

        setBusinesses(accessedBusinesses);

        let addressesTemp: Address[] = []
        for (let business of accessedBusinesses) {
          if (!business.address_id) { return; }
          const addr = await getAddress(supabase, business.address_id);
          if (!addr) { continue; }
          addressesTemp.push(addr);
        }

        setAddresses(addressesTemp);
      }
    };
    loadInfo();
  }, [isSignedIn]);

  const getFullAddressFromPlaceId = (placeId: string | null) => {
    if (!placeId) { return ""; }
    for (let address of addresses) {
      if (address.placeId === placeId) {
        return address.address;
      }
    }
    return "";
  }

  const handleMarkersOnClick = (() => {

  });

  //Will need to create a function that auto fills cards with all business info
  return (
    <>
      {!isLoaded ? (
        <></>
      ) : (
        <main>
          <div className="">
            {isSignedIn ? (
              <>
                <div>
                  <div className="overflow-y-scroll scrollbar top-[66px] bottom-0 fixed w-1/3">
                    {businesses ?
                      (businesses.map((business, index) => {
                        return(
                          <div key={index}>
                            <LocationCard key={business.placeId} photo={business.picture} rating={business.rating ? parseFloat(business.rating) : 0} icon={""} name={business.name} type={business.type} website={business.website} address={getFullAddressFromPlaceId(business.placeId)} phone={business.phone_number}></LocationCard>
                          </div>
                        )
                      })) :
                      (
                        <></>
                      )}
                  </div>
                </div>
                <Map center={center} addresses={addresses} markersOnClick={() => { }} />
                {/* TODO: fix the markersOnCLick above */}
              </>
            ) : (
              <div className="container mt-8 flex justify-center">
                <div className='flex-col justify-center space-y-4'>
                  <div className="leading-7 [&:not(:first-child)]:mt-6">
                    Sign in or sign up to access your trades!
                  </div>
                  <div className='flex justify-center space-x-3'>
                    <Button variant='outline'>
                      <SignInButton />
                    </Button>
                    <Button variant='outline'>
                      <SignUpButton />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main >
      )
      }
    </>
  )
}

