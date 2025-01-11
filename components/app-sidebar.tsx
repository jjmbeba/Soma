"use client"

import * as React from "react"
import {Calendar, Goal, LayoutDashboard, Loader, MessagesSquare,} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,} from "@/components/ui/sidebar"
import useProfile from "@/hooks/useProfile";
import {useIsMobile} from "@/hooks/use-mobile";
import Logo from "@/app/components/navigation/Logo";
import {ModeToggle} from "@/app/components/themes/ModeToggle";

// This is sample data.
const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            isActive: true,
            items: [
                {
                    title: "Overview",
                    url: "/dashboard",
                },
                {
                    title: "Results",
                    url: "/dashboard/results",
                },
                {
                    title: "Children",
                    url: "/dashboard/children",
                },
            ],
        },
        {
            title: "Goals",
            url: "#",
            icon: Goal,
            items: [
                {
                    title: "Overview",
                    url: "/goals",
                },
                {
                    title: "Add / Update goals",
                    url: "#",
                },
            ],
        },
        {
            title: "Notifications",
            url: "/notifications",
            icon: MessagesSquare,
            items: [
                {
                    title: "Overview",
                    url:"/notifications"
                },
                {
                    title: "Chat",
                    url:"/notifications/chat"
                }
            ]
        },
        {
            title: "Calendar",
            url: "/calendar",
            icon: Calendar,
            items:[{
                title:"Overview",
                url:"/calendar"
            }]
        }
    ],
}


export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    const {data: profile, isLoading: isProfileLoading} = useProfile()
    const isMobile = useIsMobile();
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className={''}>
                    <Logo/>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
            </SidebarContent>
            <SidebarFooter>
                <div className={'flex items-center justify-end'}>
                    <ModeToggle/>
                </div>
                {isProfileLoading ? (
                    <div className={'flex items-center gap-4 text-xs'}>
                        <Loader className={'animate-spin h-4 w-4'}/>
                        {!isMobile && <span>
                            Loading profile...
                        </span>}
                    </div>
                ) : (
                    <NavUser user={{
                    name: `${profile?.first_name} ${profile?.last_name}`,
                    email: profile?.email!,
                    avatar: profile?.profile_image_url ?? undefined,
                }}/>)}
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
