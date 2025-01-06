"use client";

import React, {useEffect} from 'react'
import {redirect} from "next/navigation";

const CompleteOnboarding = () => {
    useEffect(() => {
        setTimeout(() => {
            redirect('/dashboard')
        },1000)
    }, []);

return (
        <div className="text-center">
            Congratulations on onboarding! 🎉 Redirecting to the dashboard page.
        </div>
    )
}
export default CompleteOnboarding
