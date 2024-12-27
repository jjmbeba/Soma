"use client";

import React from 'react'
import {Card, CardContent,} from "@/components/ui/card"
import {z} from 'zod'
import {defineStepper} from '@stepperize/react'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import PersonalDetailsForm from "@/app/components/onboarding/PersonalDetailsForm";
import {childrenDetailSchema, personalDetailsSchema} from "@/schemas/onboarding";
import ChildrenDetailsForm from "@/app/components/onboarding/ChildrenDetailsForm";
import CompleteOnboarding from "@/app/components/onboarding/CompleteOnboarding";
import StepperNavigationButton from "@/app/components/onboarding/StepperNavigationButton";
import OnboardingFormHeader from "@/app/components/onboarding/OnboardingFormHeader";


const {useStepper, steps} = defineStepper(
    {id: 'personal', label: 'Personal Details', schema: personalDetailsSchema},
    {id: 'children', label: 'Children Details', schema: childrenDetailSchema},
    {id: 'complete', label: 'Complete', schema: z.object({})}
);

const OnBoardingForm = () => {
    const stepper = useStepper();

    const form = useForm({
        mode: "onTouched",
        resolver: zodResolver(stepper.current.schema)
    })

    const onSubmit = (values: z.infer<typeof stepper.current.schema>) => {
        console.log(values);

        if (stepper.isLast) {
            stepper.reset();
        } else {
            stepper.next();
        }
    }

    return (
        <div className={'w-full flex items-center justify-center'}>
            <Card className={'w-[60%]'}>
                <OnboardingFormHeader/>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                              className="space-y-6 p-6 border rounded-lg">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Step {stepper.current.index + 1} of {steps.length}
            </span>
                                </div>
                            </div>
                            <nav aria-label="Checkout Steps" className="group my-4">
                                <ol
                                    className="flex items-center justify-between gap-2"
                                    aria-orientation="horizontal"
                                >
                                    {stepper.all.map((step, index, array) => (
                                        <StepperNavigationButton key={step.id} stepperCurrentId={stepper.current.id}
                                                                 stepperCurrentIndex={stepper.current.index}
                                                                 array={array} index={index} steps={steps} step={step}
                                                                 navigate={stepper.goTo}/>
                                    ))}
                                </ol>
                            </nav>
                            <div className="space-y-4">
                                {stepper.switch({
                                    personal: () => <PersonalDetailsForm/>,
                                    children: () => <ChildrenDetailsForm/>,
                                    complete: () => <CompleteOnboarding/>,
                                })}
                                {!stepper.isLast ? (
                                    <div className="flex justify-end gap-4">
                                        <Button
                                            variant="secondary"
                                            onClick={stepper.prev}
                                            disabled={stepper.isFirst}
                                        >
                                            Back
                                        </Button>
                                        <Button type="submit">
                                            {stepper.isLast ? 'Complete' : 'Next'}
                                        </Button>
                                    </div>
                                ) : (
                                    <Button onClick={stepper.reset}>Reset</Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>

    )
}

export default OnBoardingForm
