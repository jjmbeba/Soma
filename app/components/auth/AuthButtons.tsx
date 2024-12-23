import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";

const AuthButtons = () => {
    return (
        <div className={'flex items-center gap-4'}>
            <Button asChild variant={"outline"}>
                <Link href={'/sign-in'}>
                    Sign In
                </Link>
            </Button>
            <Button asChild variant={"default"}>
                <Link href={'/sign-up'}>
                    Sign up
                </Link>
            </Button>
        </div>
    )
}
export default AuthButtons
