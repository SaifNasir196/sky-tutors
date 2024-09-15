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
import { Search, UserPlus, GraduationCap, BookOpen, Clock } from 'lucide-react'

type StudentStatus = 'Active' | 'Inactive' | 'Suspended'
type EducationLevel = 'Elementary' | 'Middle School' | 'High School' | 'Undergraduate' | 'Graduate'

interface Student {
    id: number
    name: string
    email: string
    educationLevel: EducationLevel
    enrolledCourses: number
    totalSessionsAttended: number
    status: StudentStatus
    joinDate: string
}

// Mock data for demonstration
const students: Student[] = [
    { id: 1, name: 'Emma Watson', email: 'emma@example.com', educationLevel: 'High School', enrolledCourses: 3, totalSessionsAttended: 15, status: 'Active', joinDate: '2023-01-15' },
    { id: 2, name: 'Liam Neeson', email: 'liam@example.com', educationLevel: 'Undergraduate', enrolledCourses: 2, totalSessionsAttended: 8, status: 'Active', joinDate: '2023-02-20' },
    { id: 3, name: 'Olivia Wilde', email: 'olivia@example.com', educationLevel: 'Middle School', enrolledCourses: 4, totalSessionsAttended: 20, status: 'Active', joinDate: '2023-03-10' },
    { id: 4, name: 'Noah Smith', email: 'noah@example.com', educationLevel: 'Elementary', enrolledCourses: 1, totalSessionsAttended: 5, status: 'Inactive', joinDate: '2023-04-05' },
    { id: 5, name: 'Ava Johnson', email: 'ava@example.com', educationLevel: 'Graduate', enrolledCourses: 2, totalSessionsAttended: 12, status: 'Suspended', joinDate: '2023-05-01' },
]

export default function StudentManagement() {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [statusFilter, setStatusFilter] = useState<StudentStatus | 'All'>('All')
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

    const filteredStudents = students.filter(student =>
        (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'All' || student.status === statusFilter)
    )

    const getStatusColor = (status: StudentStatus): string => {
        switch (status) {
            case 'Active': return 'bg-green-500'
            case 'Inactive': return 'bg-yellow-500'
            case 'Suspended': return 'bg-red-500'
        }
    }

    return (
        <div className="space-y-6 m-24">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Student Management</h1>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add New Student
                </Button>
            </div>


            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{students.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{students.filter(s => s.status === 'Active').length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{students.reduce((sum, student) => sum + student.enrolledCourses, 0)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Sessions Attended</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{students.reduce((sum, student) => sum + student.totalSessionsAttended, 0)}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Students</CardTitle>
                    <CardDescription>Manage and review student profiles</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                            <Label htmlFor="search" className="sr-only">Search students</Label>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="search"
                                    placeholder="Search students..."
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StudentStatus | 'All')}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Statuses</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                                <SelectItem value="Suspended">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Education Level</TableHead>
                                <TableHead>Enrolled Courses</TableHead>
                                <TableHead>Total Sessions</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredStudents.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.educationLevel}</TableCell>
                                    <TableCell>{student.enrolledCourses}</TableCell>
                                    <TableCell>{student.totalSessionsAttended}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                                    </TableCell>
                                    <TableCell>{student.joinDate}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={selectedStudent !== null} onOpenChange={() => setSelectedStudent(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Student Profile: {selectedStudent?.name}</DialogTitle>
                        <DialogDescription>
                            View and edit student information
                        </DialogDescription>
                    </DialogHeader>
                    {selectedStudent && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="student-name" className="text-right">Name</Label>
                                <Input id="student-name" value={selectedStudent.name} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="student-email" className="text-right">Email</Label>
                                <Input id="student-email" value={selectedStudent.email} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="student-education" className="text-right">Education</Label>
                                <Select defaultValue={selectedStudent.educationLevel}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select education level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Elementary">Elementary</SelectItem>
                                        <SelectItem value="Middle School">Middle School</SelectItem>
                                        <SelectItem value="High School">High School</SelectItem>
                                        <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                                        <SelectItem value="Graduate">Graduate</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="student-courses" className="text-right">Enrolled Courses</Label>
                                <Input id="student-courses" value={selectedStudent.enrolledCourses} className="col-span-3" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="student-sessions" className="text-right">Total Sessions</Label>
                                <Input id="student-sessions" value={selectedStudent.totalSessionsAttended} className="col-span-3" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="student-status" className="text-right">Status</Label>
                                <Select defaultValue={selectedStudent.status}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                        <SelectItem value="Suspended">Suspended</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="student-join-date" className="text-right">Join Date</Label>
                                <Input id="student-join-date" value={selectedStudent.joinDate} className="col-span-3" readOnly />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit" onClick={() => setSelectedStudent(null)}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}