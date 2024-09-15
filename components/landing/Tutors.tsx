"use client";
import useActiveSectionView from "@/hooks/useActiveSectionView";
import { AnimatedShinyTextWrapper } from "../AnimatedShinyTextWrapper";
import TutorCard from "./TutorCard";
import { tutors } from "@/lib/data";

export default function Tutors() {
    const { ref } = useActiveSectionView("Tutors");
    return (
        <div id="tutors" ref={ref} className={"flex flex-col h-full w-3/4 my-24 justify-center"}>
            <AnimatedShinyTextWrapper>Tutors</AnimatedShinyTextWrapper>
            <h1 className=" my-12 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-slate-900 to-gray-500/50 bg-clip-text text-center text-5xl font-bold leading-none text-transparent dark:from-white dark:to-white/80">
                Find Your Perfect Tutor
            </h1>

            <div className="grid grid-cols-1 gap-4 gap-x-4 md:grid-cols-2 lg:grid-cols-3 w-full justify-items-center">
                {
                    tutors.map((tutor) => (
                        <TutorCard key={tutor.name} {...tutor} />
                    ))
                }
            </div>
        </div >
    );
}
