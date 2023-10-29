import * as React from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { lato300, lato400, firaSans400, firaSans600} from "@/styles/font";
import {Rating} from "@mui/material";
import Link from "next/link";

interface LocationCardProps {
    photo: string,
    rating: number,
    icon: string,
    name: string,
    type: string,
    website: string,
    address: string,
    phone: string
}

export function LocationCard({ photo, rating, icon, name, type, website, address, phone }: LocationCardProps) {

  return (
    <Card className={"grid grid-cols-2"}>
      <CardHeader className={"flex-auto"}>
        <CardTitle className={"tracking-wide text-3xl"} style={firaSans600.style}>{name}</CardTitle>
        <CardDescription className={"text-xl"} style={lato400.style}>
            {rating}  <Rating className={"align-text-bottom"} name="read-only" precision={0.5} value={rating} size="medium" />
        </CardDescription>
          {type}
          <CardContent className={"px-0 w-fit"} style={lato300.style}>
              <div className={"text-lg flex items-center"}>
                  <img className={"h-8 w-8 float-left"} src={"https://www.gstatic.com/images/icons/material/system_gm/2x/place_gm_blue_24dp.png"}/>
                  <p className={"px-2"}>{address}</p>
              </div>
              <Separator className={"h-4 bg-transparent"}></Separator>
              <div className={"text-lg flex items-center"}>
                  <img className={"h-8 w-8 float-left"} src={"https://www.gstatic.com/images/icons/material/system_gm/2x/phone_gm_blue_24dp.png"}/>
                  <p className={"px-2"}>{phone}</p>
              </div>
          </CardContent>
          <Button className={"mb-8 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300"} style={firaSans600.style} asChild>
              <Link href={website}>Visit Site</Link>
          </Button>
      </CardHeader>
        <img className={"h-full w-full rounded-xl"} src={photo}/>
    </Card>
  )
}