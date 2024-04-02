import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";

interface CardProps{
    title:string;
    subtitle:string;
    img:HTMLImageElement;

}

export default function CoreFeatureCard(props:CardProps) {
  return (
    <Card className="h-[350px] w-[250px]">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
      <Image
      src={props.img}
      width={500}
      height={500}
      alt={props.title}
    />
      </CardContent>
      <CardFooter className="flex justify-between">
       
      </CardFooter>
    </Card>
  )
}
