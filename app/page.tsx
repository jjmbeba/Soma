import {ModeToggle} from "@/app/components/themes/ModeToggle";
import AuthButtons from "@/app/components/auth/AuthButtons";
import Navbar from "@/app/components/navigation/Navbar";
import React from "react";

export default async function Home() {
    return (
        <>
            <Navbar>
                <div className={'flex items-center gap-4'}>
                    <ModeToggle/>
                    <AuthButtons/>
                </div>
                {/*Navlinks here*/}
            </Navbar>
            <div className={'max-w-5xl flex items-center'}>
                {/* Hero here */}
                Hero
                <main className="flex-1 flex flex-col gap-6 px-4">
                    {/* Content here */}
                </main>
            </div>
        </>
    );
}
