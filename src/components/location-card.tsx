import * as React from "react"
import { Button } from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import getBusinessInfo from "@/components/location-repeater";

interface LocationCardProps {
    location: string,
    information: string,
}

export function LocationCard({location, information}: LocationCardProps) {
    //Testing call of function
    getBusinessInfo();
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>{location}</CardTitle>
                <CardDescription>{information}</CardDescription>
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