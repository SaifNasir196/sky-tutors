'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreditCard, Plus, Trash2 } from 'lucide-react'

interface PaymentMethod {
    id: string;
    type: 'credit' | 'debit';
    last4: string;
    expiry: string;
}

interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
}

const paymentMethods: PaymentMethod[] = [
    { id: '1', type: 'credit', last4: '4242', expiry: '12/24' },
    { id: '2', type: 'debit', last4: '5555', expiry: '10/23' },
]

const transactions: Transaction[] = [
    { id: '1', date: '2023-06-15', description: 'Advanced Mathematics Course', amount: 199.99, status: 'completed' },
    { id: '2', date: '2023-06-01', description: 'Monthly Subscription', amount: 49.99, status: 'completed' },
    { id: '3', date: '2023-05-15', description: 'GCSE Physics Course', amount: 149.99, status: 'completed' },
]

export default function PaymentPage() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(paymentMethods[0].id)

    return (
        <div className="m-24 space-y-8">
            <h1 className="text-3xl font-bold text-primary">Payments & Billing</h1>

            <Tabs defaultValue="payment-methods">
                <TabsList>
                    <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
                    <TabsTrigger value="billing-history">Billing History</TabsTrigger>
                </TabsList>

                <TabsContent value="payment-methods" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Payment Methods</CardTitle>
                            <CardDescription>Manage your saved payment methods</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {paymentMethods.map((method) => (
                                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <CreditCard className="h-6 w-6 text-primary" />
                                        <div>
                                            <p className="font-medium">{method.type === 'credit' ? 'Credit Card' : 'Debit Card'}</p>
                                            <p className="text-sm text-muted-foreground">**** **** **** {method.last4}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full">
                                        <Plus className="mr-2 h-4 w-4" /> Add Payment Method
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Payment Method</DialogTitle>
                                        <DialogDescription>Enter your card details to add a new payment method.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="card-number" className="text-right">Card Number</Label>
                                            <Input id="card-number" placeholder="1234 5678 9012 3456" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="expiry" className="text-right">Expiry Date</Label>
                                            <Input id="expiry" placeholder="MM/YY" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="cvv" className="text-right">CVV</Label>
                                            <Input id="cvv" placeholder="123" className="col-span-3" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Add Payment Method</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Make a Payment</CardTitle>
                            <CardDescription>Pay for your courses or subscription</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="payment-amount">Payment Amount</Label>
                                <Input id="payment-amount" type="number" placeholder="0.00" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="payment-method">Payment Method</Label>
                                <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                                    <SelectTrigger id="payment-method">
                                        <SelectValue placeholder="Select a payment method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {paymentMethods.map((method) => (
                                            <SelectItem key={method.id} value={method.id}>
                                                {method.type === 'credit' ? 'Credit Card' : 'Debit Card'} (*{method.last4})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Make Payment</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="billing-history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing History</CardTitle>
                            <CardDescription>View your past transactions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>{transaction.date}</TableCell>
                                            <TableCell>{transaction.description}</TableCell>
                                            <TableCell>£{transaction.amount.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}