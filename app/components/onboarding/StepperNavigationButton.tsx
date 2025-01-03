import React from 'react'
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle } from 'lucide-react'

interface StepperNavigationButtonProps {
    stepperCurrentId: string
    stepperCurrentIndex: number
    array: any[]
    index: number
    steps: any[]
    step: any
    navigate: () => void
    disabled: boolean
    completed: boolean
}

const StepperNavigationButton = ({
                                     stepperCurrentId,
                                     stepperCurrentIndex,
                                     array,
                                     index,
                                     steps,
                                     step,
                                     navigate,
                                     disabled,
                                     completed
                                 }: StepperNavigationButtonProps) => {
    return (
        <li
            key={step.id}
            className={`flex items-center ${
                index === array.length - 1 ? "w-full" : ""
            }`}
        >
            <Button
                variant="ghost"
                className={`w-full border-b-4 rounded-none ${
                    stepperCurrentId === step.id
                        ? "border-primary"
                        : "border-muted"
                }`}
                onClick={navigate}
                disabled={disabled}
            >
                <span className="sr-only">{`Step ${index + 1} ${
                    stepperCurrentIndex === index ? "(current)" : ""
                }`}</span>
                <span
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                        stepperCurrentId === step.id
                            ? "border-primary"
                            : "border-muted"
                    } ${completed ? "bg-primary text-primary-foreground" : ""}`}
                >
                    {completed ? (
                        <CheckCircle2 className="h-6 w-6" />
                    ) : (
                        <Circle className="h-6 w-6" />
                    )}
                </span>
                <span className="ml-4 text-sm font-medium">
                    {step.label}
                </span>
            </Button>
            {index < array.length - 1 ? (
                <div
                    className="hidden h-0.5 w-full bg-gray-200 lg:block"
                    aria-hidden="true"
                />
            ) : null}
        </li>
    )
}

export default StepperNavigationButton

