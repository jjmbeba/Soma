import React from 'react';
import StepperNavigationButton from "@/app/components/onboarding/StepperNavigationButton";
import {Step, Stepper} from "@stepperize/react";
import {StepperSchema} from "@/schemas/onboarding";

type Props = {
    stepper: Stepper<StepperSchema>,
    steps:Step[],
    completedSteps:string[],
    handleNavigation:(index:number)=>void
}

const StepperNavigation = ({ stepper, steps, completedSteps, handleNavigation }: Props) => {
    return (
        <nav aria-label="Onboarding Steps" className="group my-4">
            <ol className="flex items-center justify-between gap-2" aria-orientation="horizontal">
                {stepper.all.map((step, index, array) => (
                    <StepperNavigationButton
                        key={step.id}
                        stepperCurrentId={stepper.current.id}
                        stepperCurrentIndex={stepper.current.index}
                        array={array}
                        index={index}
                        steps={steps}
                        step={step}
                        navigate={() => handleNavigation(index)}
                        disabled={!completedSteps.includes(step.id)}
                        completed={completedSteps.includes(step.id)}
                    />
                ))}
            </ol>
        </nav>
    );
};

export default StepperNavigation;

