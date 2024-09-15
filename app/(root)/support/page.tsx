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
import { Search, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react'

type TicketStatus = 'Open' | 'In Progress' | 'Closed'
type TicketPriority = 'High' | 'Medium' | 'Low'

interface Ticket {
    id: number
    user: string
    subject: string
    status: TicketStatus
    priority: TicketPriority
    created: string
}

// Mock data for demonstration
const tickets: Ticket[] = [
    { id: 1, user: 'Alice Johnson', subject: 'Cannot access course materials', status: 'Open', priority: 'High', created: '2023-06-01' },
    { id: 2, user: 'Bob Smith', subject: 'Billing inquiry', status: 'In Progress', priority: 'Medium', created: '2023-06-02' },
    { id: 3, user: 'Charlie Brown', subject: 'Technical issue during live session', status: 'Closed', priority: 'Low', created: '2023-06-03' },
    { id: 4, user: 'Diana Prince', subject: 'Request for refund', status: 'Open', priority: 'High', created: '2023-06-04' },
    { id: 5, user: 'Ethan Hunt', subject: 'Tutor no-show complaint', status: 'In Progress', priority: 'High', created: '2023-06-05' },
]

export default function CustomerSupport() {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [statusFilter, setStatusFilter] = useState<TicketStatus | 'All'>('All')
    const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'All'>('All')
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

    const filteredTickets = tickets.filter(ticket =>
        (ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'All' || ticket.status === statusFilter) &&
        (priorityFilter === 'All' || ticket.priority === priorityFilter)
    )

    const getStatusColor = (status: TicketStatus): string => {
        switch (status) {
            case 'Open': return 'bg-yellow-500'
            case 'In Progress': return 'bg-blue-500'
            case 'Closed': return 'bg-green-500'
        }
    }

    const getPriorityColor = (priority: TicketPriority): string => {
        switch (priority) {
            case 'High': return 'bg-red-500'
            case 'Medium': return 'bg-orange-500'
            case 'Low': return 'bg-green-500'
        }
    }

    return (
        <div className="space-y-6 m-24">

            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Customer Support</h1>
                <Button>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    New Ticket
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tickets.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tickets.filter(t => t.status === 'Open').length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tickets.filter(t => t.status === 'In Progress').length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Closed Tickets</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tickets.filter(t => t.status === 'Closed').length}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Support Tickets</CardTitle>
                    <CardDescription>Manage and respond to customer support tickets</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                            <Label htmlFor="search" className="sr-only">Search tickets</Label>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="search"
                                    placeholder="Search tickets..."
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as TicketStatus | 'All')}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Statuses</SelectItem>
                                <SelectItem value="Open">Open</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Closed">Closed</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as TicketPriority | 'All')}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Priorities</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTickets.map((ticket) => (
                                <TableRow key={ticket.id}>
                                    <TableCell>{ticket.id}</TableCell>
                                    <TableCell>{ticket.user}</TableCell>
                                    <TableCell>{ticket.subject}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                                    </TableCell>
                                    <TableCell>{ticket.created}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedTicket(ticket)}>
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={selectedTicket !== null} onOpenChange={() => setSelectedTicket(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Ticket #{selectedTicket?.id}</DialogTitle>
                        <DialogDescription>
                            View and respond to the support ticket.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedTicket && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="user" className="text-right">User</Label>
                                <Input id="user" value={selectedTicket.user} className="col-span-3" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="subject" className="text-right">Subject</Label>
                                <Input id="subject" value={selectedTicket.subject} className="col-span-3" readOnly />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">Status</Label>
                                <Select defaultValue={selectedTicket.status}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Open">Open</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Closed">Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="priority" className="text-right">Priority</Label>
                                <Select defaultValue={selectedTicket.priority}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="High">High</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="response" className="text-right">Response</Label>
                                <Textarea id="response" placeholder="Type your response here..." className="col-span-3" />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit" onClick={() => setSelectedTicket(null)}>Send Response</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </div>
    )
}