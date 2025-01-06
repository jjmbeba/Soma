'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import OnboardingFormHeader from "@/app/components/onboarding/OnboardingFormHeader";
import OnboardingFormContent from "@/app/components/onboarding/OnBoardingFormContent";

const OnBoardingForm = () => {
    return (
        <div className={'w-full flex items-center justify-center'}>
            <Card className={'w-[60%]'}>
                <OnboardingFormHeader />
                <CardContent>
                    <OnboardingFormContent />
                </CardContent>
            </Card>
        </div>
    );
};

export default OnBoardingForm;

