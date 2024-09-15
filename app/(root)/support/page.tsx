'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageSquare, Send } from 'lucide-react'

const faqs = [
    {
        question: "How do I enroll in a course?",
        answer: "To enroll in a course, navigate to the course page and click the 'Enroll Now' button. Follow the prompts to complete your enrollment and payment."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept major credit and debit cards, as well as PayPal. You can manage your payment methods in the Payments & Billing section of your account."
    },
    {
        question: "How can I contact my tutor?",
        answer: "You can contact your tutor through the messaging system in your course dashboard. Navigate to the course and click on the 'Message Tutor' button."
    },
    {
        question: "What is your refund policy?",
        answer: "We offer a 30-day money-back guarantee for most courses. If you're unsatisfied with a course, you can request a refund within 30 days of enrollment."
    },
    {
        question: "How do I access my course materials?",
        answer: "Once enrolled, you can access your course materials by logging into your account and navigating to 'My Courses'. Click on the course to view all available materials and lessons."
    }
]

export default function SupportPage() {
    const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'support', message: string }[]>([
        { sender: 'support', message: "Hello! How can I assist you today?" }
    ])
    const [newMessage, setNewMessage] = useState('')

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setChatMessages([...chatMessages, { sender: 'user', message: newMessage }])
            setNewMessage('')
            // Simulate a response from support
            setTimeout(() => {
                setChatMessages(prev => [...prev, { sender: 'support', message: "Thank you for your message. A support representative will be with you shortly." }])
            }, 1000)
        }
    }

    return (
        <div className="m-24 space-y-8">
            <h1 className="text-3xl font-bold text-primary">Support Center</h1>

            <Tabs defaultValue="faq">
                <TabsList>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                    <TabsTrigger value="ticket">Submit a Ticket</TabsTrigger>
                    <TabsTrigger value="chat">Live Chat</TabsTrigger>
                </TabsList>

                <TabsContent value="faq">
                    <Card>
                        <CardHeader>
                            <CardTitle>Frequently Asked Questions</CardTitle>
                            <CardDescription>Find quick answers to common questions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                                        <AccordionContent>{faq.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="ticket">
                    <Card>
                        <CardHeader>
                            <CardTitle>Submit a Support Ticket</CardTitle>
                            <CardDescription>We'll get back to you as soon as possible</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" placeholder="Enter the subject of your inquiry" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="technical">Technical Issue</SelectItem>
                                        <SelectItem value="billing">Billing Inquiry</SelectItem>
                                        <SelectItem value="course">Course-related Question</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Describe your issue or question in detail" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Submit Ticket</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="chat">
                    <Card>
                        <CardHeader>
                            <CardTitle>Live Chat Support</CardTitle>
                            <CardDescription>Chat with our support team in real-time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px] overflow-y-auto border rounded-md p-4 mb-4">
                                {chatMessages.map((msg, index) => (
                                    <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                                        <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                                            }`}>
                                            {msg.message}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex space-x-2">
                                <Input
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message here..."
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <Button onClick={handleSendMessage}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Reach out to us directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>Email:</strong> support@skytutors.com</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p><strong>Hours:</strong> Monday - Friday, 9am - 5pm GMT</p>
                </CardContent>
            </Card>

        </div>
    )
}