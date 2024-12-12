"use client"
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";
import ImageVawes from "../../../components/ImagesVawes";
import HeroForm from "./HeroForm";
import { getSlider } from "../../../actions/getSlider";
import { apiImagesUrl } from "../../../constants";
import { Skeleton } from "../../../components/ui/skeleton";
import { Slider } from "../../../types/types";
const Hero = () => {
  const [sliderImages,setSliderImages] = useState<Slider[]>([])
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    async function fetchSlider() {
      try {
        const images : Slider[] = await getSlider()
        setSliderImages(images)
      } catch (error) {
        console.log(error)
      }
      finally
      {
        setLoading(false)
      }
    }
    fetchSlider()
  }, [])
  if(loading ||(!loading && sliderImages.length===0))
  {
    return (
      <div className="relative h-[32rem]">
        <div  className="h-[32rem] lg:h-[44rem] w-full relative">
     <Skeleton className="h-full w-full bg-slate-600"/>
        </div>
        <HeroForm/>
      </div>
    )
  }
  
  return (
    <div className="relative h-[32rem]">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {sliderImages.map((data,index)=>(
            <CarouselItem key={index}>
                <Image
                src={`${apiImagesUrl}/${data.collectionId}/${data.id}/${data.image}`}
                alt={data.alt}
                width={1920}
                height={1080}
                className="h-[32rem] lg:h-[44rem] w-full object-cover brightness-75"
                />
                <ImageVawes myclassName="absolute lg:-bottom-3"/>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex left-0" />
        <CarouselNext  className="hidden lg:flex right-0"/>
      </Carousel>
      <HeroForm/>
    </div>
  );
};

export default Hero;
