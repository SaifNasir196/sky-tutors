'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Book, GraduationCap, Bell } from 'lucide-react'

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className="m-24 space-y-6">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary">My Profile</h1>
                <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "secondary" : "default"}
                >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            {isEditing && (
                                <Button variant="outline">Change Picture</Button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="fullName" defaultValue="John Doe" readOnly={!isEditing} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue="john.doe@example.com" readOnly={!isEditing} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="tel" defaultValue="+1 234 567 8900" readOnly={!isEditing} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                <Input id="dateOfBirth" type="date" defaultValue="2000-01-01" readOnly={!isEditing} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" defaultValue="I'm a passionate student interested in mathematics and physics." readOnly={!isEditing} />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl text-primary">Education</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="school">Current School</Label>
                                <Input id="school" defaultValue="Skyline High School" readOnly={!isEditing} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="grade">Grade/Year</Label>
                                <Select defaultValue="11">
                                    <SelectTrigger id="grade">
                                        <SelectValue placeholder="Select grade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="9">9th Grade</SelectItem>
                                        <SelectItem value="10">10th Grade</SelectItem>
                                        <SelectItem value="11">11th Grade</SelectItem>
                                        <SelectItem value="12">12th Grade</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl text-primary">Subjects</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">Mathematics</Badge>
                                <Badge variant="secondary">Physics</Badge>
                                <Badge variant="secondary">Chemistry</Badge>
                                <Badge variant="secondary">Biology</Badge>
                                {isEditing && (
                                    <Button variant="outline" size="sm">+ Add Subject</Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl text-primary">Notifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="emailNotifications">Email Notifications</Label>
                                <Switch id="emailNotifications" defaultChecked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="smsNotifications">SMS Notifications</Label>
                                <Switch id="smsNotifications" defaultChecked={false} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-4">
                            <GraduationCap className="h-10 w-10 text-primary" />
                            <div>
                                <p className="font-semibold">Honor Roll</p>
                                <p className="text-sm text-muted-foreground">Achieved 3 consecutive terms</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Book className="h-10 w-10 text-primary" />
                            <div>
                                <p className="font-semibold">Bookworm</p>
                                <p className="text-sm text-muted-foreground">Read 50 books this year</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <User className="h-10 w-10 text-primary" />
                            <div>
                                <p className="font-semibold">Peer Tutor</p>
                                <p className="text-sm text-muted-foreground">Helped 10 classmates</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}