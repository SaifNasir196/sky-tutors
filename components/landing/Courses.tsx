"use client"

import { courses } from "@/lib/data";
import Marquee from "../magicui/marquee";
import CourseCard from "./CourseCard";
import { AnimatedShinyTextWrapper } from "../AnimatedShinyTextWrapper";
import useActiveSectionView from "@/hooks/useActiveSectionView";

const firstRow = courses.slice(0, courses.length / 2);
const secondRow = courses.slice(courses.length / 2);

export default function Courses() {
    const { ref } = useActiveSectionView("Courses");

    return (
        <div className="flex h-ful w-3/4 my-24 flex-col items-center justify-center overflow-hidden rounded-lg scroll-mt-5" id="courses" ref={ref}>
            <AnimatedShinyTextWrapper> Courses </AnimatedShinyTextWrapper>
            <h1 className=" my-12 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-slate-900 to-gray-500/50 bg-clip-text text-center text-5xl font-bold leading-none text-transparent dark:from-white dark:to-white/80">
                Choose Your Course

            </h1>

            <Marquee pauseOnHover className="[--duration:25s]">
                {firstRow.map((course) => (
                    <CourseCard key={course.name} {...course} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:25s]">
                {secondRow.map((course) => (
                    <CourseCard key={course.name} {...course} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
    );
}
