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
import { Search, UserPlus, Star, Users } from 'lucide-react'

type TutorStatus = 'Active' | 'Inactive' | 'Pending'
type SubjectArea = 'Mathematics' | 'Science' | 'Language' | 'History' | 'Arts'

interface Tutor {
    id: number
    name: string
    email: string
    subjectAreas: SubjectArea[]
    rating: number
    status: TutorStatus
    joinDate: string
}

// Mock data for demonstration
const tutors: Tutor[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', subjectAreas: ['Mathematics', 'Science'], rating: 4.8, status: 'Active', joinDate: '2023-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', subjectAreas: ['Language', 'History'], rating: 4.5, status: 'Active', joinDate: '2023-02-20' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', subjectAreas: ['Arts', 'History'], rating: 4.2, status: 'Inactive', joinDate: '2023-03-10' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', subjectAreas: ['Science', 'Mathematics'], rating: 4.9, status: 'Active', joinDate: '2023-04-05' },
    { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', subjectAreas: ['Language'], rating: 4.6, status: 'Pending', joinDate: '2023-05-01' },
]

export default function TutorManagement() {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [statusFilter, setStatusFilter] = useState<TutorStatus | 'All'>('All')
    const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null)

    const filteredTutors = tutors.filter(tutor =>
        (tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tutor.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'All' || tutor.status === statusFilter)
    )

    const getStatusColor = (status: TutorStatus): string => {
        switch (status) {
            case 'Active': return 'bg-green-500'
            case 'Inactive': return 'bg-red-500'
            case 'Pending': return 'bg-yellow-500'
        }
    }

    return (
        <div className="space-y-6 m-24">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Tutor Management</h1>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add New Tutor
                </Button>
            </div>


            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tutors</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tutors.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Tutors</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tutors.filter(t => t.status === 'Active').length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tutors.filter(t => t.status === 'Pending').length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {(tutors.reduce((sum, tutor) => sum + tutor.rating, 0) / tutors.length).toFixed(2)}
                        </div>
                    </CardContent>
                </Card>
            </div>


            <Card>
                <CardHeader>
                    <CardTitle>Tutors</CardTitle>
                    <CardDescription>Manage and review tutor profiles</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                            <Label htmlFor="search" className="sr-only">Search tutors</Label>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="search"
                                    placeholder="Search tutors..."
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as TutorStatus | 'All')}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Statuses</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Subject Areas</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTutors.map((tutor) => (
                                <TableRow key={tutor.id}>
                                    <TableCell className="font-medium">{tutor.name}</TableCell>
                                    <TableCell>{tutor.email}</TableCell>
                                    <TableCell>{tutor.subjectAreas.join(', ')}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                            {tutor.rating.toFixed(1)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(tutor.status)}>{tutor.status}</Badge>
                                    </TableCell>
                                    <TableCell>{tutor.joinDate}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedTutor(tutor)}>
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={selectedTutor !== null} onOpenChange={() => setSelectedTutor(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Tutor Profile: {selectedTutor?.name}</DialogTitle>
                        <DialogDescription>
                            View and edit tutor information
                        </DialogDescription>
                    </DialogHeader>
                    {selectedTutor && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tutor-name" className="text-right">Name</Label>
                                <Input id="tutor-name" value={selectedTutor.name} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tutor-email" className="text-right">Email</Label>
                                <Input id="tutor-email" value={selectedTutor.email} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tutor-subjects" className="text-right">Subjects</Label>
                                <Input id="tutor-subjects" value={selectedTutor.subjectAreas.join(', ')} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tutor-rating" className="text-right">Rating</Label>
                                <Input id="tutor-rating" value={selectedTutor.rating.toFixed(1)} className="col-span-3" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tutor-status" className="text-right">Status</Label>
                                <Select defaultValue={selectedTutor.status}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tutor-join-date" className="text-right">Join Date</Label>
                                <Input id="tutor-join-date" value={selectedTutor.joinDate} className="col-span-3" readOnly />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit" onClick={() => setSelectedTutor(null)}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}