"use client"
import React from 'react'
import GradualSpacing from '../magicui/gradual-spacing'
import Globe from "@/components/magicui/globe";
import PulsatingButton from '../magicui/pulsating-button';
import { AnimatedShinyTextWrapper } from '../AnimatedShinyTextWrapper';
import ShinyButton from '../magicui/shiny-button';
import useActiveSectionView from '@/hooks/useActiveSectionView';

const HeroSection = () => {
    const { ref } = useActiveSectionView("Home");
    return (
        <div className="w-full h-full my-24 z-10 flex flex-col items-center justify-start pt-56 gap-5 scroll-mt-32" ref={ref} id='home'>
            <AnimatedShinyTextWrapper> Introducing Sky Tutors </AnimatedShinyTextWrapper>

            <GradualSpacing
                className="font-display text-center text-2xl font-bold tracking-[-0.1em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
                text="Elevate Your Learning with Sky Tutors"
            />

            <p className='text-gray-500'>
                Connect with Expert Tutors for Personalized Online Education
            </p>

            <div className="flex gap-4">


                <PulsatingButton duration='2s' >Join Affiliate Program</PulsatingButton>
                <ShinyButton text="Contact Us" className="" />

            </div>

        </div>
    )
}

export default HeroSection