import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {Stepper} from "@stepperize/react";
import {StepperSchema} from "@/schemas/onboarding";

const StepInstructions = ({ stepper }:{stepper: Stepper<StepperSchema>}) => {
    return (
        <Alert>
            <AlertTitle>Step Instructions</AlertTitle>
            <AlertDescription>
                {stepper.switch({
                    personal: () => "Please fill in your personal details. All fields are required except for the profile image.",
                    children: () => "Add details for each of your children. You can add multiple children if needed.",
                    complete: () => "Review your information and click 'Complete' to finish the onboarding process.",
                })}
            </AlertDescription>
        </Alert>
    );
};

export default StepInstructions;

