import React from 'react'
import {createClient} from "@/utils/supabase/server";
import {checkIfUserIsSignedIn, redirectBasedOnUserStatus} from "@/lib/utils";
import {getUserProfile} from "@/app/actions";
import {redirect} from "next/navigation";
import type {Metadata} from "next";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import PageBreadCrumbs from "@/app/components/navigation/PageBreadCrumbs";

type Props = {
    children: React.ReactNode,
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Dashboard",
        description: "Page for authenticated users to view their dashboard and manage their account",
    }
}

const DashboardLayout = async ({children}:Props) => {
    const supabase = await createClient();
    const isUserSigned = await checkIfUserIsSignedIn(supabase);
    redirectBasedOnUserStatus(isUserSigned);

    const profile = await getUserProfile();
    const role = profile?.roles;

    if(!profile?.is_onboarded || !role) {
        redirect("/onboarding");
    }


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <PageBreadCrumbs/>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
export default DashboardLayout
