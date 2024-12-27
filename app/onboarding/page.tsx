import React from 'react'
import type {Metadata} from "next";
import OnBoardingForm from "@/app/components/onboarding/OnBoardingForm";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Onboarding",
        description: "Page for new users to onboard and setup their account",
    }
}

const OnboardingPage = () => {
    return (
        <OnBoardingForm />
    )
}
export default OnboardingPage
