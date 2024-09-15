import React from 'react'
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { BookOpen, GraduationCap, Calendar, Users, BarChart2, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid"
import Marquee from "@/components/magicui/marquee"
import AvatarCircles from "@/components/magicui/avatar-circles";


const courses = [
    { name: "Advanced Mathematics", progress: 75 },
    { name: "GCSE Physics", progress: 60 },
    { name: "A-Level Chemistry", progress: 40 },
    { name: "English Literature", progress: 90 },
]

const upcomingClasses = [
    { name: "Advanced Mathematics", time: "Today, 4:00 PM" },
    { name: "GCSE Physics", time: "Tomorrow, 2:00 PM" },
    { name: "A-Level Chemistry", time: "Wed, 10:00 AM" },
]

const avatarUrls = [

    "https://avatars.githubusercontent.com/u/106103625",
    "https://avatars.githubusercontent.com/u/59228569",
]

const features = [
    {
        Icon: BookOpen,
        name: "Course Progress",
        description: "Track your progress across all your enrolled courses.",
        href: "/courses",
        cta: "View Courses",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute inset-0 flex flex-col justify-start gap-4 p-6 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
                {courses.map((course, index) => (
                    <div key={index}>
                        <div className="flex justify-between mb-1 text-sm">
                            <span>{course.name}</span>
                            <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                    </div>
                ))}
            </div>
        ),
    },
    {
        Icon: Calendar,
        name: "Upcoming Classes",
        description: "Never miss a class with our interactive schedule.",
        href: "/schedule",
        cta: "View Schedule",
        className: "col-span-3 lg:col-span-1",
        background: (
            <CalendarComponent
                mode="single"
                selected={new Date()}
                className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
            />
        ),
    },
    {
        Icon: Users,
        name: "Study Groups",
        description: "Join or create study groups with your peers. (Coming Soon!)",
        href: "/study-groups",
        cta: "Explore Groups",
        className: "col-span-3 lg:col-span-1",
        background: (
            <Marquee
                pauseOnHover
                className="absolute top-10 [--duration:20s] py-12 [mask-image:linear-gradient(to_top,transparent_10%,#000_50%)]"
            >
                {["Mathematics", "Physics", "Chemistry", "Biology", "Literature"].map((subject, idx) => (

                    <div
                        key={idx}
                        className="relative rounded-full bg-primary/20 px-5 py-3 text-sm font-medium text-primary shadow-md"
                    >
                        <AvatarCircles numPeople={idx + 10} avatarUrls={avatarUrls} className='absolute -top-3 right-0 opacity-90 ' />
                        {subject} Group
                    </div>
                ))}
            </Marquee>
        ),
    },
    {
        Icon: BarChart2,
        name: "Performance Analytics",
        description: "Visualize your academic performance over time.",
        href: "/analytics",
        cta: "View Analytics",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute inset-0 flex items-center justify-center [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
                <div className="h-40 w-full max-w-md">
                    {/* dummy chart */}

                </div>
            </div>
        ),
    },
    {
        Icon: MessageCircle,
        name: "Coming Soon",
        description: "New feature coming soon!",
        href: "/chat",
        cta: "Coming Soon!",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute inset-0 flex flex-col justify-start p-6 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
            </div>
        ),
    },
    {
        Icon: MessageCircle,
        name: "Tutor Chat",
        description: "Get instant help from our expert tutors.",
        href: "/chat",
        cta: "Start Chatting",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute inset-0 flex flex-col justify-start p-6 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
                <div className="mb-2 rounded-lg bg-primary/10 p-2 text-sm">
                    How can I help you today?
                </div>
                <div className="mb-2 self-end rounded-lg bg-primary p-2 text-sm text-white">
                    I need help with calculus.
                </div>
                <div className="rounded-lg bg-primary/10 p-2 text-sm">
                    Sure, let's start with derivatives...
                </div>
            </div>
        ),
    },
]

export default function DashboardBentoGrid() {
    return (
        <section className='m-24'>
            <h1 className="text-3xl font-bold text-primary mb-2">Welcome, Saif</h1>
            <p className="text-md text-muted-foreground mb-6">
                Here's a quick overview of your dashboard. Let's get started.
            </p>

            <BentoGrid className='w-full'>
                {features.map((feature, idx) => (
                    <BentoCard key={idx} {...feature} />
                ))}
            </BentoGrid>
        </section>
    )
}