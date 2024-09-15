"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useActiveSectionContext } from "@/context/ActiveSectionContextProvider";
import { Button } from "../ui/button";
import { useUser, UserProfile, UserButton, SignInButton } from "@clerk/nextjs";
import { ModeToggle } from "../ModeToggle";
import { Bell, User } from "lucide-react";
import { Badge } from "../ui/badge";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function Header() {
    const { activeSection, setActiveSection, setLastClickTime } = useActiveSectionContext();
    const { isSignedIn } = useUser();
    const pathname = usePathname();
    const landing = pathname === "/";

    // temp notification
    const [notifications, setNotifications] = useState([
        { id: 1, message: "New assignment posted in GCSE Mathematics", read: false },
        { id: 2, message: "Your next class starts in 1 hour", read: false },
        { id: 3, message: "Congratulations on completing your Physics quiz!", read: true },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    // temp notification end
    return (
        <header className="z-[999] relative">
            {landing && (
                <>
                    <motion.div
                        className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white
                    bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[33.5rem]
                    sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"
                        initial={{ y: -100, x: "-50%", opacity: 0 }}
                        animate={{ y: 0, x: "-50%", opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    ></motion.div>

                    <nav className="flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0 ">
                        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5">
                            {links.map((link) => (
                                <motion.li
                                    className="h-3/4 flex items-center justify-center relative"
                                    key={link.hash}
                                    initial={{ y: -100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        className={cn(
                                            "px-5 py-3 flex w-full items-center justify-center transition",
                                            "hover:text-gray-950 dark:text-gray-500 dark:hover:text-gray-300",
                                            {
                                                "text-gray-950 dark:text-gray-200": activeSection === link.name,
                                            }
                                        )}
                                        href={link.hash}
                                        onClick={() => {
                                            setActiveSection(link.name);
                                            setLastClickTime(Date.now());
                                        }}
                                    >
                                        {link.name}

                                        {link.name === activeSection && (
                                            <motion.span
                                                className="bg-gray-200 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
                                                layoutId="activeSection"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 350,
                                                    damping: 25,
                                                }}
                                            ></motion.span>
                                        )}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </nav>
                </>
            )}

            <motion.nav
                className="fixed top-0 right-1 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white
                    bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-fit
                    sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75 px-2 py-1"
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <ul className="flex flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap gap-2 ">

                    <li className="h-3/4 flex items-center justify-center relative">
                        <span className="flex w-full h-full items-center justify-center transition">
                            <ModeToggle />
                        </span>

                    </li>

                    <li className="h-3/4 flex items-center justify-center relative">
                        <span className="flex w-full h-full items-center justify-center transition">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Bell className="h-5 w-5" />
                                        {unreadCount > 0 && (
                                            <Badge className="absolute -top-2 -right-2 bg-coral-500">{unreadCount}</Badge>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <h3 className="font-semibold mb-2">Notifications</h3>
                                    {notifications.map(notification => (
                                        <div key={notification.id} className={`p-2 ${notification.read ? 'opacity-50' : ''}`}>
                                            <p>{notification.message}</p>
                                            {!notification.read && (
                                                <Button variant="link" onClick={() => markAsRead(notification.id)} className="text-sm p-0 h-auto">
                                                    Mark as read
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </PopoverContent>
                            </Popover>
                        </span>

                    </li>

                    <li className="h-3/4 flex items-center justify-center relative">
                        {isSignedIn ? (
                            <span className=" flex w-full items-center justify-center transition">
                                <UserButton />
                            </span>
                        ) : (
                            <Link href={'/sign-in'} className="flex w-full items-center justify-center transition">
                                <SignInButton >
                                    <Button variant="ghost" size="icon" className="rounded-full"> <User /> </Button>
                                </SignInButton>
                            </Link>
                        )}
                    </li>





                </ul>

            </motion.nav>


        </header >
    );
}