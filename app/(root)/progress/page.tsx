'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid"
import { BookOpen, Award, Clock, TrendingUp, Star } from 'lucide-react'

interface Course {
    id: number;
    title: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    lastAccessed: string;
}

interface Achievement {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    date: string;
}

const courses: Course[] = [
    { id: 1, title: "Advanced Mathematics", progress: 75, totalLessons: 20, completedLessons: 15, lastAccessed: "2023-06-15" },
    { id: 2, title: "GCSE Physics", progress: 60, totalLessons: 15, completedLessons: 9, lastAccessed: "2023-06-14" },
    { id: 3, title: "A-Level Chemistry", progress: 40, totalLessons: 25, completedLessons: 10, lastAccessed: "2023-06-13" },
    { id: 4, title: "English Literature", progress: 90, totalLessons: 12, completedLessons: 11, lastAccessed: "2023-06-12" },
]

const achievements: Achievement[] = [
    { id: 1, title: "Fast Learner", description: "Completed 5 lessons in one day", icon: <Clock className="h-8 w-8 text-primary" />, date: "2023-06-10" },
    { id: 2, title: "Perfect Score", description: "Achieved 100% on a quiz", icon: <Star className="h-8 w-8 text-yellow-400" />, date: "2023-06-08" },
    { id: 3, title: "Consistent Learner", description: "Studied for 7 days in a row", icon: <TrendingUp className="h-8 w-8 text-green-500" />, date: "2023-06-05" },
]

export default function ProgressPage() {
    const overallProgress = courses.reduce((sum, course) => sum + course.progress, 0) / courses.length

    return (
        <div className="m-24 space-y-6">
            <h1 className="text-3xl font-bold text-primary mb-6">Your Progress</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4">
                        <Progress value={overallProgress} className="w-full" />
                        <span className="text-2xl font-bold">{overallProgress.toFixed(0)}%</span>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="courses">
                <TabsList>
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
                <TabsContent value="courses">
                    <BentoGrid>
                        {courses.map((course) => (
                            <BentoCard
                                key={course.id}
                                name={course.title}
                                className="col-span-3 lg:col-span-1"
                                Icon={BookOpen}
                                description={`${course.completedLessons}/${course.totalLessons} lessons completed`}
                                href={`/courses/${course.id}`}
                                cta="View Course"
                                background={
                                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                                            <Progress value={course.progress} className="w-full mb-2" />
                                            <p className="text-sm text-muted-foreground">{course.progress}% complete</p>
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Last accessed: {course.lastAccessed}
                                        </div>
                                    </div>
                                }
                            />
                        ))}
                    </BentoGrid>
                </TabsContent>
                <TabsContent value="achievements">
                    <BentoGrid>
                        {achievements.map((achievement) => (
                            <BentoCard
                                key={achievement.id}
                                name={achievement.title}
                                className="col-span-3 lg:col-span-1"
                                Icon={Award}
                                description={achievement.description}
                                href="#"
                                cta="View Details"
                                background={
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                        {achievement.icon}
                                        <h3 className="text-lg font-semibold mt-4 mb-2">{achievement.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                                        <Badge variant="secondary">Earned on {achievement.date}</Badge>
                                    </div>
                                }
                            />
                        ))}
                    </BentoGrid>
                </TabsContent>
            </Tabs>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {courses.slice(0, 3).map((course) => (
                            <li key={course.id} className="flex items-center space-x-4">
                                <BookOpen className="h-6 w-6 text-primary" />
                                <div>
                                    <p className="font-semibold">{course.title}</p>
                                    <p className="text-sm text-muted-foreground">Completed lesson {course.completedLessons} of {course.totalLessons}</p>
                                </div>
                                <Badge variant="outline" className="ml-auto">{course.lastAccessed}</Badge>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}