"use client";

import { Button } from "@/components/ui/button";
import { createAddress, matchAddress, supabaseClient, updateAccount } from "@/lib/database";
import { getAddressFromLatLng } from "@/lib/geocode";
import { HOME_ICON } from "@/lib/icons";
import { roundToPlace } from "@/lib/utils";
import { useSession, useUser } from "@clerk/nextjs";
import { useJsApiLoader } from "@react-google-maps/api";

export default function SettingsPage() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCQiI-0DC0AYdgn2s4Nz-PXKKmR-41Zc-U",
  });

  const { user } = useUser();
  const { session } = useSession();

  const handleClick = () => {
    if (isLoaded) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;

        const insertPosition = async (lat: number, lng: number) => {
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

          const addressString = await getAddressFromLatLng({ lat: lat, lng: lng });
          if (!addressString) {
            return;
          }

          const data = await matchAddress(supabase, addressString);

          console.log(`matchAddress() data: ${data}`);

          if (data) {
            console.log("data was found");
            const address = data;
            updateAccount(supabase, user.id, address.id);
          } else {
            const c = await createAddress(supabase, roundToPlace(lat, 3), roundToPlace(lng, 3), addressString, HOME_ICON); // assigning this to a variable is essential because then it waits until the procedure is complete before proceeding

            const address = await matchAddress(supabase, addressString);

            console.log(address?.address);
            if (!address) {
              return;
            }

            updateAccount(supabase, user.id, address.id);
          }
        }
        insertPosition(latitude, longitude);
      });
    }
  }

  return (
    <div>
      <Button onClick={handleClick} type="button"> Set Center </Button>
    </div>
  )
}