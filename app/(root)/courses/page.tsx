'use client'

import React, { useState } from 'react'
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { BookOpen, Clock, Users, Star, Search, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
        progress: 75
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
        progress: 40
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
        description: "Prepare for your GCSE English Literature exam with in-depth analysis of classic and contemporary texts."
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
        description: "Comprehensive A-Level Chemistry course covering organic, inorganic, and physical chemistry topics."
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
        description: "Learn the basics of programming, algorithms, and computer systems in this introductory course."
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
        <BentoCard
            name={course.title}
            className={cn(
                "col-span-2 lg:col-span-1",
                course.enrolled ? "row-span-2" : ""
            )}
            Icon={BookOpen}
            description={course.enrolled ? `Progress: ${course.progress}%` : course.subject}
            href={`/courses/${course.id}`}
            cta={course.enrolled ? "Continue Learning" : "View Course"}
            background={
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div>
                        <Badge variant="secondary" className="mb-2">{course.level}</Badge>
                        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>
                    </div>
                    {course.enrolled ? (
                        <Progress value={course.progress} className="w-full" />
                    ) : (
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span className="text-sm">{course.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-sm font-semibold">£{course.price.toFixed(2)}</span>
                        </div>
                    )}
                </div>
            }
        />
    )

    return (
        <div className="m-24 space-y-6">
            <h1 className="text-3xl font-bold text-primary mb-6">Your Courses</h1>

            <BentoGrid className="mb-12">
                {enrolledCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </BentoGrid>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                <h2 className="text-2xl font-bold text-primary">Course Catalog</h2>
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
            </div>

            <BentoGrid>
                {filteredCourses.filter(course => !course.enrolled).map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </BentoGrid>
        </div>
    )
}