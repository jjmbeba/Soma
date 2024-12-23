"use client";

import React from 'react'
import Link from "next/link";
import {usePathname} from "next/navigation";

type Props = {
    children?: React.ReactNode
}

const Navbar = ({children}: Props) => {
    const pathname = usePathname();

    if(['/sign-in', '/sign-up'].includes(pathname)) return null;

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>
                        Soma logo here
                    </Link>
                </div>
                {children}
            </div>
        </nav>
    )
}
export default Navbar
