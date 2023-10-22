import * as React from "react"
import { Button } from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import getBusinessInfo from "@/components/location-repeater";
import {useState} from "react";

interface LocationCardProps {
    lat: number,
    lng: number,
}

export function LocationCard({lat, lng}: LocationCardProps) {
    const [address, setAddress] = useState("");

    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&location_type=ROOFTOP&result_type=street_address&key=AIzaSyCQiI-0DC0AYdgn2s4Nz-PXKKmR-41Zc-U')
        .then((response) => {
            let data = response.json();
            let address = data["results"][0]["formatted_address"];
            console.log(address);
            setAddress(address);
        })

        .catch((error) => {
            console.error(error);
        });

    return (
        <Card className="">
            <CardHeader>
                <CardTitle>{lng}</CardTitle>
                <CardDescription>{lat}</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    Some random info ends up here
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button>Visit Site</Button>
            </CardFooter>
        </Card>
    )
}