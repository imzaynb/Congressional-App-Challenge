"use client";

import AddBusinessForm, { formSchemaType } from "@/components/add-buisness-form";
import BlindMap from "@/components/blind-map";
import { createAddress, createBusiness, matchAddress, supabaseClient, updateAccount } from "@/lib/database";
import { getLatLngFromAddress } from "@/lib/geocode";
import { Printwap, getBusinessDetails, getPlaceIdFromQuery } from "@/lib/places";
import { roundToPlace, getPlaceIdFromAddress } from "@/lib/utils";
import { useSession, useUser } from "@clerk/nextjs";
import { SupabaseClient } from "@supabase/supabase-js";
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

  const onSubmit = async (values: z.infer<formSchemaType>) => {
    // 1. get lat long information to submit into addresses
    // 2. get placeId to get all other accompanied information 
    // 3. submit the above addressId and information as a business on the map

    if (!supabase || !userId || !map) { return null; }

    getPlaceIdFromQuery(values.name + " " + values.address, map, async (placeId: string) => {
      getBusinessDetails(placeId, map, async (printwap: Printwap, placeId: string) => {
        let addressId: number;
        const data = await matchAddress(supabase, values.address);
        if (data) {
          console.log("data was found");
          const address = data;
          addressId = address.id;
        } else {
          const latlng = await getLatLngFromAddress(values.address);

          if (!latlng) {
            return null;
          }

          await createAddress(supabase, latlng.lat, latlng.lng, values.address, printwap.icon, placeId); // assigning this to a variable is essential because then it waits until the procedure is complete before proceeding
          const address = await matchAddress(supabase, values.address);

          if (!address) {
            return null;
          }
          addressId = address.id;
        }
        await createBusiness(supabase, printwap, addressId, placeId);
      });
    });
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