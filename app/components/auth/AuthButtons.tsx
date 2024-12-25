import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {getUser, signOutAction} from "@/app/actions";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const AuthButtons = async () => {
    const {data: {user}} = await getUser();

    return (
        <>
            {user?.email ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className={'cursor-pointer'}>
                            <AvatarImage src=""/>
                            <AvatarFallback>
                                {user.email.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem asChild className={'text-destructive'}>
                            <form>
                                <button formAction={signOutAction}>
                                    Sign Out
                                </button>
                            </form>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


            ) : (
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
            )}
        </>
    )
}
export default AuthButtons
