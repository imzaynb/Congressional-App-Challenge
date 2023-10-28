import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface LocationCardProps {
    photo: string,
    rating: number,
    icon: string,
    name: string,
    type: string,
    website: string,
    address: string,
    phone: number
}

export function LocationCard({ photo, rating, icon, name, type, website, address, phone }: LocationCardProps) {

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{address}</CardTitle>
        <CardDescription></CardDescription>
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