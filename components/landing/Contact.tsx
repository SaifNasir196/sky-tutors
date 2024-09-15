'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState('')

    if (isSubmitted) {
        return (
            <div className={"flex flex-col h-full w-3/4 justify-center"}>
                <Card className="w-full max-w-md mx-auto">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center space-y-2">
                            <CheckCircle2 className="w-12 h-12 text-green-500" />
                            <CardTitle>Thank you for contacting us!</CardTitle>
                            <CardDescription>We'll get back to you as soon as possible.</CardDescription>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Send us a message and we'll get back to you soon.</CardDescription>
            </CardHeader>
            <form>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Your email" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="What is this regarding?" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Your message" required />
                    </div>
                    {error && (
                        <div className="flex items-center space-x-2 text-red-500">
                            <AlertCircle className="w-4 h-4" />
                            <span>{error}</span>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}