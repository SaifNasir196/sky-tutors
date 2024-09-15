import { ParticlesBackground } from "@/backgrounds/ParticlesBackground";
import Contact from "@/components/landing/Contact";
import ContactForm from "@/components/landing/ContactForm";
import Courses from "@/components/landing/Courses";
import HeroSection from "@/components/landing/Hero";

import TestimonyCarousel from "@/components/landing/TestimonyCarousel";
import Tutors from "@/components/landing/Tutors";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <ParticlesBackground>

        <HeroSection />
        <Courses />
        <Tutors />
        <TestimonyCarousel />
        <ContactForm />
      </ParticlesBackground>
    </main>

  );
}
