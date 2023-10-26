import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { roundToPlace } from "@/lib/utils";
import {Client} from "@googlemaps/google-maps-services-js";

let name: string | undefined;

interface LocationCardProps {
  lat: number,
  lng: number,
}


export function LocationCard({ lat, lng }: LocationCardProps) {

    const client = new Client({});

    client
        .placeDetails({
            params: {
                key: "AIzaSyCQiI-0DC0AYdgn2s4Nz-PXKKmR-41Zc-U",
                place_id: "ChIJwQ_z9JzDJIgRteBS3slr_FE",
            },
            timeout: 1000,
        })
        .then((r) => {
            name = r.data.result.name;
        })
        .catch((e) => {
            console.log("problem");
            console.log(e.response.data.error_message);
        })

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
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