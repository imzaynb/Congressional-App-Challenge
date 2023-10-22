import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import getBusinessInfo from "@/components/location-repeater";
import { useEffect, useState } from "react";
import { getAddressFromLatLng } from "@/lib/geocode";
import { roundToPlace } from "@/lib/utils";

interface LocationCardProps {
  lat: number,
  lng: number,
}

export function LocationCard({ lat, lng }: LocationCardProps) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const obtainAddress = async () => {
      const addr = await getAddressFromLatLng(lat, lng);
      if (addr) {
        setAddress(addr);
      }
    }
    obtainAddress();
  }, []);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{address}</CardTitle>
        <CardDescription>{`${roundToPlace(lat, 4)}, ${roundToPlace(lng, 4)}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Visit Site</Button>
      </CardFooter>
    </Card>
  )
}