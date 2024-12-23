import React from 'react'
import {signOutAction} from "@/app/actions";
import {Button} from "@/components/ui/button";

const SignOutButton = async () => {
    return (
        <form action={signOutAction}>
            <Button type={"submit"} variant={"outline"}>
                Sign Out
            </Button>
        </form>
    )
}
export default SignOutButton
