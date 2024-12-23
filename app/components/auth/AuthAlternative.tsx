import React from 'react'
import {Button} from "@/components/ui/button";
import Google from "@/app/components/icons/Google";
import Link from "next/link";

type Props = {
    currentForm: "Login" | "Register",
}

const AuthAlternative = ({currentForm}: Props) => {
    return (
        <>
            <div
                className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
            </div>
            <Button variant="outline" className="w-full">
                <Google/>
                {currentForm} with Google
            </Button>
            <div className="text-center text-sm">
                {currentForm === 'Login' ? "Don't have an account?" : "Already have an account?"}{" "}
                <Link href={currentForm === 'Login' ? '/sign-up' : '/sign-in'} className="underline underline-offset-4">
                    {currentForm === 'Login' ? "Sign up" : "Sign in"}
                </Link>
            </div>
        </>
    )
}
export default AuthAlternative
