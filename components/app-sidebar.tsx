"use client"

import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd, Goal, Loader,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavProjects} from "@/components/nav-projects"
import {NavUser} from "@/components/nav-user"
import {TeamSwitcher} from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import {getUserProfile} from "@/app/actions";
import useProfile from "@/hooks/useProfile";
import {useIsMobile} from "@/hooks/use-mobile";

// This is sample data.
const data = {
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: SquareTerminal,
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
                    title: "Notifications",
                    url: "/dashboard/notifications",
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
            title: "Help",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings2,
            items: [
                {
                    title: "Profile",
                    url: "/profile",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}


export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    const {data: profile, isLoading: isProfileLoading} = useProfile()
    const isMobile = useIsMobile()
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams}/>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
                <NavProjects projects={data.projects}/>
            </SidebarContent>
            <SidebarFooter>
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
                    avatar: profile?.profile_image_url ?? '',
                }}/>)}
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
