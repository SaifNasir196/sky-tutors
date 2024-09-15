'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, ArrowUpRight, ArrowDownRight, Search, Download } from 'lucide-react'

// Mock data for demonstration
const transactions = [
    { id: 1, date: '2023-06-01', type: 'Payment', amount: 150, status: 'Completed', user: 'Alice Johnson' },
    { id: 2, date: '2023-06-02', type: 'Payout', amount: 100, status: 'Pending', user: 'Bob Smith' },
    { id: 3, date: '2023-06-03', type: 'Refund', amount: 50, status: 'Completed', user: 'Charlie Brown' },
    // Add more mock transactions as needed
]

const tutors = [
    { id: 1, name: 'Bob Smith', email: 'bob@example.com', balance: 250 },
    { id: 2, name: 'Diana Prince', email: 'diana@example.com', balance: 175 },
    // Add more mock tutors as needed
]

export default function PaymentAndBilling() {
    const [searchTerm, setSearchTerm] = useState('')
    const [typeFilter, setTypeFilter] = useState('All')
    const [statusFilter, setStatusFilter] = useState('All')

    const filteredTransactions = transactions.filter(transaction =>
        (transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.id.toString().includes(searchTerm)) &&
        (typeFilter === 'All' || transaction.type === typeFilter) &&
        (statusFilter === 'All' || transaction.status === statusFilter)
    )

    const totalRevenue = transactions.reduce((sum, transaction) =>
        transaction.type === 'Payment' ? sum + transaction.amount : sum, 0
    )

    const totalPayouts = transactions.reduce((sum, transaction) =>
        transaction.type === 'Payout' ? sum + transaction.amount : sum, 0
    )

    return (
        <div className="space-y-6 m-24">
            <h1 className="text-3xl font-bold">Payment and Billing</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">+20% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalPayouts.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Platform Balance</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${(totalRevenue - totalPayouts).toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Current balance</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="transactions" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    <TabsTrigger value="payouts">Tutor Payouts</TabsTrigger>
                </TabsList>
                <TabsContent value="transactions" className="space-y-4">
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <Label htmlFor="search" className="sr-only">Search transactions</Label>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="search"
                                    placeholder="Search transactions..."
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Types</SelectItem>
                                <SelectItem value="Payment">Payment</SelectItem>
                                <SelectItem value="Payout">Payout</SelectItem>
                                <SelectItem value="Refund">Refund</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Statuses</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Failed">Failed</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>User</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="font-medium">{transaction.id}</TableCell>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell>{transaction.type}</TableCell>
                                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                                    <TableCell>{transaction.status}</TableCell>
                                    <TableCell>{transaction.user}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value="payouts" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Tutor Payouts</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Process Payouts</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Process Payouts</DialogTitle>
                                    <DialogDescription>
                                        This will initiate payouts for all eligible tutors. Are you sure you want to proceed?
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button type="submit" onClick={() => console.log('Processing payouts')}>
                                        Confirm Payouts
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tutor Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Current Balance</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tutors.map((tutor) => (
                                <TableRow key={tutor.id}>
                                    <TableCell className="font-medium">{tutor.name}</TableCell>
                                    <TableCell>{tutor.email}</TableCell>
                                    <TableCell>${tutor.balance.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm" onClick={() => console.log(`Payout for ${tutor.name}`)}>
                                            Payout
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>
        </div>
    )
}