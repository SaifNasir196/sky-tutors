import React from 'react'
import { MagicCard } from '../magicui/magic-card'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Star, Book } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


type TutorCardProps = {
    name: string;
    subjects: readonly string[]
    rating: number
    imageUrl: string
    totalSessions: number
}

const TutorCard = ({ name, subjects, rating, imageUrl, totalSessions }: TutorCardProps) => {
    const { theme } = useTheme();
    return (
        <MagicCard
            className={cn("cursor-pointer flex flex-col justify-evenly items-stretch shadow-2xl whitespace-nowrap text-2xl ",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] ",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10]",
            )}
            gradientColor={theme === "dark" ? "#eccfff" : "#e0f7fa"}
        >
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-20 w-20 border dark:border-white">
                    <AvatarImage src={imageUrl} alt={name} />
                    <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)} ({totalSessions} sessions)</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    {subjects.map((subject, index) => (
                        <Badge key={index} variant="secondary">
                            {subject}
                        </Badge>
                    ))}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <Book className="h-4 w-4 mr-2" />
                    <span>{totalSessions} sessions completed</span>
                </div>
            </CardContent>
            <CardFooter className='w-full'>
                <Button className="w-full">Book a Session</Button>
            </CardFooter>
        </MagicCard>

    )
}

export default TutorCard






