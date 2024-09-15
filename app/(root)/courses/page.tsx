'use client'

import React, { useState } from 'react'
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { BookOpen, Clock, Users, Star, Search, Filter, GraduationCap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid"
import Marquee from "@/components/magicui/marquee"

interface Course {
    id: number;
    title: string;
    subject: string;
    level: string;
    instructor: string;
    rating: number;
    students: number;
    duration: string;
    price: number;
    description: string;
    enrolled?: boolean;
    progress?: number;
    image: string;
}

const courses: Course[] = [
    {
        id: 1,
        title: "Advanced Mathematics",
        subject: "Mathematics",
        level: "Advanced",
        instructor: "Dr. Jane Smith",
        rating: 4.8,
        students: 1250,
        duration: "12 weeks",
        price: 199.99,
        description: "Dive deep into advanced mathematical concepts including calculus, linear algebra, and complex analysis.",
        enrolled: true,
        progress: 75,
        image: "/placeholder.svg?height=100&width=200"
    },
    {
        id: 2,
        title: "Introduction to Physics",
        subject: "Physics",
        level: "Beginner",
        instructor: "Prof. Alan Johnson",
        rating: 4.6,
        students: 980,
        duration: "10 weeks",
        price: 149.99,
        description: "Explore the fundamental principles of physics, covering mechanics, thermodynamics, and basic electromagnetism.",
        enrolled: true,
        progress: 40,
        image: "/placeholder.svg?height=100&width=200"
    },
    {
        id: 3,
        title: "GCSE English Literature",
        subject: "English",
        level: "Intermediate",
        instructor: "Ms. Emily Brown",
        rating: 4.9,
        students: 1500,
        duration: "16 weeks",
        price: 179.99,
        description: "Prepare for your GCSE English Literature exam with in-depth analysis of classic and contemporary texts.",
        image: "/placeholder.svg?height=100&width=200"
    },
    {
        id: 4,
        title: "A-Level Chemistry",
        subject: "Chemistry",
        level: "Advanced",
        instructor: "Dr. Michael Lee",
        rating: 4.7,
        students: 850,
        duration: "20 weeks",
        price: 229.99,
        description: "Comprehensive A-Level Chemistry course covering organic, inorganic, and physical chemistry topics.",
        image: "/placeholder.svg?height=100&width=200"
    },
    {
        id: 5,
        title: "Introduction to Computer Science",
        subject: "Computer Science",
        level: "Beginner",
        instructor: "Prof. Sarah Davis",
        rating: 4.5,
        students: 2000,
        duration: "8 weeks",
        price: 129.99,
        description: "Learn the basics of programming, algorithms, and computer systems in this introductory course.",
        image: "/placeholder.svg?height=100&width=200"
    },
]

export default function CoursesPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [subjectFilter, setSubjectFilter] = useState('All')
    const [levelFilter, setLevelFilter] = useState('All')

    const filteredCourses = courses.filter(course =>
        (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (subjectFilter === 'All' || course.subject === subjectFilter) &&
        (levelFilter === 'All' || course.level === levelFilter)
    )

    const enrolledCourses = courses.filter(course => course.enrolled)

    const CourseCard = ({ course }: { course: Course }) => (
        <Card className="overflow-hidden">
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
            <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.instructor}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary">{course.level}</Badge>
                    <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm">{course.rating.toFixed(1)}</span>
                    </div>
                </div>
                {course.enrolled ? (
                    <Progress value={course.progress} className="w-full mb-2" />
                ) : (
                    <p className="text-sm text-muted-foreground mb-2">{course.description.slice(0, 100)}...</p>
                )}
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                    </div>
                    <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                {course.enrolled ? (
                    <Button variant="default">Continue Learning</Button>
                ) : (
                    <>
                        <span className="text-lg font-semibold">£{course.price.toFixed(2)}</span>
                        <Button variant="default">Enroll Now</Button>
                    </>
                )}
            </CardFooter>
        </Card>
    )

    return (
        <div className="m-24 space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-4 md:mb-0">Your Learning Journey</h1>
                <div className="flex space-x-4">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search courses..."
                            className="pl-8 w-[200px] md:w-[300px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Subjects</SelectItem>
                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                            <SelectItem value="Physics">Physics</SelectItem>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Chemistry">Chemistry</SelectItem>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={levelFilter} onValueChange={setLevelFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Levels</SelectItem>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </header>

            <Tabs defaultValue="enrolled" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
                    <TabsTrigger value="catalog">Course Catalog</TabsTrigger>
                </TabsList>
                <TabsContent value="enrolled">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enrolledCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="catalog">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.filter(course => !course.enrolled).map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            <BentoGrid className="mt-12">
                <BentoCard
                    name="Learning Statistics"
                    className="col-span-3 lg:col-span-2"
                    Icon={GraduationCap}
                    description="Track your progress across all courses"
                    href="/progress"
                    cta="View Detailed Progress"
                    background={
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-primary">{enrolledCourses.length}</div>
                                    <div className="text-sm text-muted-foreground">Enrolled Courses</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-primary">
                                        {Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress!, 0) / enrolledCourses.length)}%
                                    </div>
                                    <div className="text-sm text-muted-foreground">Average Progress</div>
                                </div>
                            </div>
                        </div>
                    }
                />
                <BentoCard
                    name="Recommended Courses"
                    className="col-span-3 lg:col-span-1"
                    Icon={BookOpen}
                    description="Courses tailored for you"
                    href="#"
                    cta="Explore Recommendations"
                    background={
                        <Marquee
                            pauseOnHover
                            className="absolute inset-0 [--duration:20s] [mask-image:linear-gradient(to_right,transparent_0%,#000_10%,#000_90%,transparent_100%)]"
                        >
                            {courses.slice(0, 3).map((course, idx) => (
                                <div key={idx} className="mx-2 p-2 bg-primary/10 rounded-md">
                                    <p className="font-semibold">{course.title}</p>
                                    <p className="text-xs text-muted-foreground">{course.subject}</p>
                                </div>
                            ))}
                        </Marquee>
                    }
                />
            </BentoGrid>
        </div>
    )
}