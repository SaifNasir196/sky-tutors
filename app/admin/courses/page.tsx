'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Search, BookPlus, Book, Users, DollarSign } from 'lucide-react'

type CourseStatus = 'Active' | 'Inactive' | 'Draft'
type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced'

interface Course {
    id: number
    title: string
    instructor: string
    subject: string
    level: CourseLevel
    price: number
    enrollments: number
    status: CourseStatus
    createdDate: string
}

// Mock data for demonstration
const courses: Course[] = [
    { id: 1, title: 'Introduction to Python', instructor: 'Alice Johnson', subject: 'Programming', level: 'Beginner', price: 49.99, enrollments: 120, status: 'Active', createdDate: '2023-01-15' },
    { id: 2, title: 'Advanced JavaScript', instructor: 'Bob Smith', subject: 'Web Development', level: 'Advanced', price: 79.99, enrollments: 85, status: 'Active', createdDate: '2023-02-20' },
    { id: 3, title: 'Data Science Fundamentals', instructor: 'Charlie Brown', subject: 'Data Science', level: 'Intermediate', price: 69.99, enrollments: 100, status: 'Active', createdDate: '2023-03-10' },
    { id: 4, title: 'Machine Learning Basics', instructor: 'Diana Prince', subject: 'Artificial Intelligence', level: 'Beginner', price: 59.99, enrollments: 75, status: 'Draft', createdDate: '2023-04-05' },
    { id: 5, title: 'Digital Marketing Strategies', instructor: 'Ethan Hunt', subject: 'Marketing', level: 'Intermediate', price: 54.99, enrollments: 90, status: 'Inactive', createdDate: '2023-05-01' },
]

export default function CourseManagement() {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [statusFilter, setStatusFilter] = useState<CourseStatus | 'All'>('All')
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

    const filteredCourses = courses.filter(course =>
        (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'All' || course.status === statusFilter)
    )

    const getStatusColor = (status: CourseStatus): string => {
        switch (status) {
            case 'Active': return 'bg-green-500'
            case 'Inactive': return 'bg-red-500'
            case 'Draft': return 'bg-yellow-500'
        }
    }

    return (
        <div className="space-y-6 m-24">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Course Management</h1>
                <Button>
                    <BookPlus className="mr-2 h-4 w-4" />
                    Add New Course
                </Button>
            </div>


            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                        <Book className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{courses.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                        <Book className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{courses.filter(c => c.status === 'Active').length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{courses.reduce((sum, course) => sum + course.enrollments, 0)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${courses.reduce((sum, course) => sum + (course.price * course.enrollments), 0).toFixed(2)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Courses</CardTitle>
                    <CardDescription>Manage and review course offerings</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                            <Label htmlFor="search" className="sr-only">Search courses</Label>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="search"
                                    placeholder="Search courses..."
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as CourseStatus | 'All')}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Statuses</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                                <SelectItem value="Draft">Draft</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Instructor</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Enrollments</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCourses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell className="font-medium">{course.title}</TableCell>
                                    <TableCell>{course.instructor}</TableCell>
                                    <TableCell>{course.subject}</TableCell>
                                    <TableCell>{course.level}</TableCell>
                                    <TableCell>${course.price.toFixed(2)}</TableCell>
                                    <TableCell>{course.enrollments}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedCourse(course)}>
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={selectedCourse !== null} onOpenChange={() => setSelectedCourse(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Course Details: {selectedCourse?.title}</DialogTitle>
                        <DialogDescription>
                            View and edit course information
                        </DialogDescription>
                    </DialogHeader>
                    {selectedCourse && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="course-title" className="text-right">Title</Label>
                                <Input id="course-title" value={selectedCourse.title} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="course-instructor" className="text-right">Instructor</Label>
                                <Input id="course-instructor" value={selectedCourse.instructor} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="course-subject" className="text-right">Subject</Label>
                                <Input id="course-subject" value={selectedCourse.subject} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="course-level" className="text-right">Level</Label>
                                <Select defaultValue={selectedCourse.level}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="course-price" className="text-right">Price</Label>
                                <Input id="course-price" type="number" value={selectedCourse.price} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="course-status" className="text-right">Status</Label>
                                <Select defaultValue={selectedCourse.status}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                        <SelectItem value="Draft">Draft</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit" onClick={() => setSelectedCourse(null)}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}