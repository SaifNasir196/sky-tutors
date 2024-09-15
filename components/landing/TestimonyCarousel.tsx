"use client"
import { AnimatedShinyTextWrapper } from "../AnimatedShinyTextWrapper";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import TestimonyCard from "./TestimonyCard";
import { testimonies } from "@/lib/data";



export default function TestimonyCarousel() {

    return (
        <div className={"flex flex-col h-full w-3/4 my-24 justify-center"}>
            <AnimatedShinyTextWrapper>Testimony</AnimatedShinyTextWrapper>
            <h1 className=" my-12 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-slate-900 to-gray-500/50 bg-clip-text text-center text-5xl font-bold leading-none text-transparent dark:from-white dark:to-white/80">
                Hear from Our Students
            </h1>

            <Carousel
                // itemsPerPage={3}
                opts={{
                }}
                className="w-full"
            >
                <CarouselContent className="flex justify-items-center my-20 mx-3">

                    {testimonies.map((testimony, index) => (
                        <CarouselItem key={index} className="lg:basis-1/2 xl:basis-1/3">
                            <TestimonyCard
                                key={index}
                                {...testimony}
                            />
                        </CarouselItem>
                    ))}

                </CarouselContent>
                <CarouselPrevious className="z-100" />
                <CarouselNext className="z-100" />
            </Carousel>
        </div >
    );
}
