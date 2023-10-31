"use client";

import AddBusinessForm, { formSchemaType } from "@/components/add-buisness-form";
import BlindMap from "@/components/blind-map";
import Map from "@/components/map";
import { Input } from "@/components/ui/input";
import { createAddress, matchAddress, supabaseClient, updateAccount } from "@/lib/database";
import { getLatLngFromAddress } from "@/lib/geocode";
import { HOME_ICON } from "@/lib/icons";
import { getBusinessDetails } from "@/lib/places";
import { roundToPlace, getPlaceIdFromAddress } from "@/lib/utils";
import { useSession, useUser } from "@clerk/nextjs";
import { useJsApiLoader } from "@react-google-maps/api";
import { SupabaseClient } from "@supabase/supabase-js";
import { LucideUtensilsCrossed } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import z from "zod";

export default function AddPage() {
  const { isLoaded, user } = useUser();
  const { session } = useSession();

  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const handleSetMap = (map: google.maps.Map | null) => {
    setMap(map);
  }

  useEffect(() => {
    const loadSupabase = async () => {
      if (isLoaded) {

        const supabaseAccessToken = await session?.getToken({
          template: "supabase",
        });

        if (!supabaseAccessToken || !user?.id) {
          return;
        }
        setUserId(user.id);

        const supabase = await supabaseClient(supabaseAccessToken);

        if (!supabase) {
          return;
        }

        setSupabase(supabase);
      }
    }
    loadSupabase();
  }, []);

  const onSubmit = (values: z.infer<formSchemaType>) => {
    // 1. get lat long information to submit into addresses
    // 2. get placeId to get all other accompanied information 
    // 3. submit the above addressId and information as a business on the map
    const addBusiness = async () => {
      if (!supabase || !userId) { return; }

      /// STEP 1 ///
      let addressId: number;
      {
        const data = await matchAddress(supabase, values.address);
        console.log(`matchAddress() data: ${data}`);

        if (data) {
          console.log("data was found");
          const address = data;
          addressId = address.id;
        } else {
          const latlng = await getLatLngFromAddress(values.address);

          if (!latlng) {
            return;
          }

          await createAddress(supabase, roundToPlace(latlng.lat, 3), roundToPlace(latlng.lng, 3), values.address, undefined); // assigning this to a variable is essential because then it waits until the procedure is complete before proceeding

          const address = await matchAddress(supabase, values.address);

          if (!address) {
            return;
          }
          addressId = address.id;
        }
      }
      console.log(`${values.address} has address id: ${addressId}`);

      /// STEP 2 ///
      let placeId: string | null;
      {
        placeId = await getPlaceIdFromAddress(values.address);
        if (!placeId || !map) { return; }

        console.log(map);

        console.log(placeId);

        const businessDetails = getBusinessDetails(placeId, map);
        console.log(`business details: ${businessDetails}`);
      }
    }
    addBusiness();
  }

  return (
    <>
      {isLoaded ? (
        <>
          <AddBusinessForm onSubmit={onSubmit} />
          <BlindMap setMap={handleSetMap} />
        </>
      ) : (
        <p>
          Loading...
        </p>
      )}
    </>
  )
}