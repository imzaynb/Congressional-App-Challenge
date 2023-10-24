import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import getBusinessInfo from "@/components/location-repeater";
import { useEffect, useState } from "react";
import { getAddressFromLatLng } from "@/lib/geocode";
import { roundToPlace } from "@/lib/utils";
import { LatLng } from "@/types/latlng";

interface LocationCardProps {
  latlng: LatLng
}

export function LocationCard({ latlng }: LocationCardProps) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const obtainAddress = async () => {
      const addr = await getAddressFromLatLng(latlng);
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
        <CardDescription>{`${roundToPlace(latlng.lat, 4)}, ${roundToPlace(latlng.lng, 4)}`}</CardDescription>
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