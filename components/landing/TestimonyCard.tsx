import React from 'react'
import { MagicCard } from '../magicui/magic-card'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Star, Book } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


type TestimonyCardProps = {
    studentName: string,
    subject: string,
    testimony: string,
    rating: number,
    imageUrl: string,
    date: string,
}


const TestimonyCard = ({ studentName, subject, testimony, rating, imageUrl, date }: TestimonyCardProps) => {
    const { theme } = useTheme();
    return (
        <MagicCard
            className={cn("cursor-pointer flex flex-col justify-evenly items-stretch shadow-lg whitespace-nowrap text-2xl ",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] ",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10]",
            )}
            gradientColor={theme === "dark" ? "#eccfff" : "#e0f7fa"}
        >
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={imageUrl} alt={studentName} />
                    <AvatarFallback>{studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h3 className="font-semibold">{studentName}</h3>
                    <div className="flex items-center">
                        <Badge variant="secondary" className="mr-2">
                            {subject}
                        </Badge>
                        <time className="text-sm text-muted-foreground">{date}</time>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <blockquote className="mt-4 border-l-2 border-muted pl-4 italic text-wrap text-base">
                    "{testimony}"
                </blockquote>
            </CardContent>

            <CardFooter>
                <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-5 w-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                                }`}
                        />
                    ))}
                    <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
                </div>
            </CardFooter>
        </MagicCard>

    )
}

export default TestimonyCard






