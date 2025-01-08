"use client";

import React from 'react'
import {usePathname} from "next/navigation";
import Logo from "@/app/components/navigation/Logo";

type Props = {
    children?: React.ReactNode
}

const Navbar = ({children}: Props) => {
    const pathname = usePathname();

    if (['/sign-in', '/sign-up'].includes(pathname)) return null;

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <Logo/>
                {children}
            </div>
        </nav>
    )
}
export default Navbar
