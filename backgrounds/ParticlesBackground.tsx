"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Particles from "@/components/magicui/particles";
import Meteors from "@/components/magicui/meteors";

const ParticlesBackground = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme]);

    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
            {children}
            <Meteors number={4} />
            <Particles
                className="absolute inset-0"
                quantity={200}
                size={1.5}
                ease={80}
                color={color}
                refresh
            />
        </div>
    );
};

export { ParticlesBackground };
