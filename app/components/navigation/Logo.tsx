"use client";

import React from 'react'
import {GalleryVerticalEnd} from "lucide-react";
import Link from "next/link";
import {useSidebar} from "@/components/ui/sidebar";

const Logo = () => {
    const {open:isSidebarOpen} = useSidebar();

    return (
        <div className={`flex justify-center gap-2 md:justify-start ${isSidebarOpen && 'px-2 py-1'}`}>
            <Link href={'/'} className="flex items-center gap-2 font-medium">
                <div className={`flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground`}>
                    <GalleryVerticalEnd className="size-4"/>
                </div>
                {isSidebarOpen && 'Soma.'}
            </Link>
        </div>
    )
}
export default Logo
