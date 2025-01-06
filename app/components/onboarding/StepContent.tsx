import React from 'react';
import PersonalDetailsForm from "@/app/components/onboarding/PersonalDetailsForm";
import ChildrenDetailsForm from "@/app/components/onboarding/ChildrenDetailsForm";
import CompleteOnboarding from "@/app/components/onboarding/CompleteOnboarding";
import {Stepper} from "@stepperize/react";
import {StepperSchema} from "@/schemas/onboarding";

const StepContent = ({ stepper }: {stepper: Stepper<StepperSchema>}) => {
    return (
        <div className="space-y-4">
            {stepper.switch({
                personal: () => <PersonalDetailsForm />,
                children: () => <ChildrenDetailsForm />,
                complete: () => <CompleteOnboarding />,
            })}
        </div>
    );
};

export default StepContent;

