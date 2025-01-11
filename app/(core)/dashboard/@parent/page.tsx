import React from 'react'
import {Metadata} from 'next'
import {ArrowRight, Bell, Book, Calendar, GraduationCap, Target, User} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Overview} from '@/app/components/dashboard/overview'
import {RecentResults} from '@/app/components/dashboard/recent-results'

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Parent dashboard for academic performance overview',
}

const Page = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Children
                            </CardTitle>
                            <User className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2</div>
                            <p className="text-xs text-muted-foreground">
                                +1 from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Average Grade
                            </CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">B+</div>
                            <p className="text-xs text-muted-foreground">
                                +0.5 from last term
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Upcoming Events
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">
                                Next: Parent-Teacher Conference
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Goals
                            </CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-xs text-muted-foreground">
                                2 completed this month
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Academic Performance Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Overview/>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Results</CardTitle>
                            <CardDescription>
                                Latest grades and assessments
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentResults/>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>
                                Recent updates and announcements
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: Bell,
                                        title: "New term report available",
                                        description: "Sarah's Q2 report is ready for review"
                                    },
                                    {
                                        icon: Calendar,
                                        title: "Upcoming Parent-Teacher Conference",
                                        description: "Scheduled for next Tuesday at 4 PM"
                                    },
                                    {
                                        icon: Book,
                                        title: "New course materials uploaded",
                                        description: "Math textbook updated for John's class"
                                    },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center">
                                        <item.icon className="mr-2 h-4 w-4 text-muted-foreground"/>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{item.title}</p>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Quick Links</CardTitle>
                            <CardDescription>
                                Frequently accessed features
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            {[
                                {title: "View Full Results", href: "/results"},
                                {title: "Set New Goals", href: "/goals"},
                                {title: "Update Child Profiles", href: "/profiles"},
                                {title: "School Calendar", href: "/calendar"},
                            ].map((link, index) => (
                                <Button key={index} variant="outline" className="w-full justify-between">
                                    {link.title}
                                    <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default Page
