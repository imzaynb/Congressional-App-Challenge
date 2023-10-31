"use client";

import Map from "@/components/map";
import { useUser, SignInButton, SignUpButton, useSession } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { LocationCard } from "@/components/location-card";
import { Button } from "@/components/ui/button";
import { LatLng } from "@/types/latlng";
import { createAccount, getAccount, getAddress, getAllBusinesses, matchAddress, supabaseClient } from "@/lib/database";
import { Account, Address, Business } from "@/types/database_types";
import { getLatLngFromAddress } from "@/lib/geocode";

let locations = [
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
  const { isSignedIn, isLoaded, user } = useUser();
  const { session } = useSession();
  const [center, setCenter] = useState<LatLng>({ lat: 0, lng: 0 });
  const [businesses, setBusinesses] = useState<Business[] | null>(null);
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
        setBusinesses(accessedBusinesses);

        const accessedAddresses = businesses?.map(async (business) => {
          if (business.address_id) {
            const addr = await getAddress(supabase, business.address_id);
            return addr;
          }
        })
        console.log(accessedAddresses);

      }
    };
    loadInfo();
  }, [isSignedIn]);

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
                  <div className="overflow-y-scroll scrollbar top-[66px] bottom-0 fixed w-1/4">
                    {/*<LocationCard latlng={{ lat: 42.54492084597748, lng: -83.21533837375769 }} />*/}
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
        </main>
      )}
    </>
  )
}

