import React from 'react'
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import type {Step} from '@stepperize/react'

type Props = {
    step: Step,
    index:number,
    stepperCurrentIndex:number,
    stepperCurrentId:string,
    steps:Step[],
    array:Array<any>,
    navigate:Function
}

const StepperNavigationButton = ({index, step, stepperCurrentIndex, stepperCurrentId, steps, array, navigate}:Props) => {
     return (
        <React.Fragment key={step.id}>
            <li className="flex items-center gap-4 flex-shrink-0">
                <Button
                    type="button"
                    role="tab"
                    variant={
                        index <= stepperCurrentIndex ? 'default' : 'secondary'
                    }
                    aria-current={
                        stepperCurrentId === step.id ? 'step' : undefined
                    }
                    aria-posinset={index + 1}
                    aria-setsize={steps.length}
                    aria-selected={stepperCurrentId === step.id}
                    className="flex size-10 items-center justify-center rounded-full"
                    onClick={() => navigate(step.id)}
                >
                    {index + 1}
                </Button>
                <span className="text-sm font-medium">{step.label}</span>
            </li>
            {index < array.length - 1 && (
                <Separator
                    className={`flex-1 ${
                        index < stepperCurrentIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                />
            )}
        </React.Fragment>
    )
}
export default StepperNavigationButton
