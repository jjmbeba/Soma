"use client";

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { defineStepper } from '@stepperize/react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import PersonalDetailsForm from "@/app/components/onboarding/PersonalDetailsForm";
import { personalDetailsSchema, childrenDetailSchema, completeSchema, PersonalDetailsValues, ChildrenDetailsValues, CompleteValues } from "@/schemas/onboarding";
import ChildrenDetailsForm from "@/app/components/onboarding/ChildrenDetailsForm";
import CompleteOnboarding from "@/app/components/onboarding/CompleteOnboarding";
import StepperNavigationButton from "@/app/components/onboarding/StepperNavigationButton";
import OnboardingFormHeader from "@/app/components/onboarding/OnboardingFormHeader";
import { usePostOnboarding } from "@/hooks/onboarding";
import { Loader } from 'lucide-react';
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";

const { useStepper, steps } = defineStepper(
    { id: 'personal', label: 'Personal Details', schema: personalDetailsSchema },
    { id: 'children', label: 'Children Details', schema: childrenDetailSchema },
    { id: 'complete', label: 'Complete', schema: completeSchema }
);

type StepValues = PersonalDetailsValues | ChildrenDetailsValues | CompleteValues;

const OnBoardingForm = () => {
    const stepper = useStepper();
    const { mutate: onboardPersonal, isPending: isPersonalOnboardingPending } = usePostOnboarding({
        errorMessage: "Failed to save personal details",
        endpoint: "/api/onboarding/personal",
        mutationKey: ['personal-details'],
        schema: personalDetailsSchema,
        successMessage: "Personal details saved successfully",
        onSuccessAction: () => stepper.next()
    });

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onUploadError: (error) => {
            toast.error(error.message);
        },
        onUploadProgress: (progress) => {
            toast.info(`Uploading image... ${progress}%`);
        },
        onClientUploadComplete:() => {
            toast.success("Image uploaded successfully");
        }
    });

    const form = useForm<StepValues>({
        mode: "onTouched",
        resolver: zodResolver(stepper.current.schema)
    });

    const onSubmit = async (values: StepValues) => {
        console.log("Submitted")
        try {
            if (stepper.current.id === 'personal') {
                const personalValues = values as PersonalDetailsValues;
                let imageUrl = personalValues.imageUrl;
                if (imageUrl instanceof File) {
                    const uploadResult = await startUpload([imageUrl]);
                    imageUrl = uploadResult?.[0]?.url;
                }
                onboardPersonal({...personalValues, imageUrl});
            } else if (stepper.current.id === 'children') {
                const childrenValues = values as ChildrenDetailsValues;
                console.log("Children details:", childrenValues);
                // Handle children details submission here
                stepper.next();
            } else if (stepper.isLast) {
                console.log("Onboarding completed");
                stepper.reset();
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            toast.error("An error occurred during submission. Please try again.");
        }
    };

    return (
        <div className={'w-full flex items-center justify-center'}>
            <Card className={'w-[60%]'}>
                <OnboardingFormHeader />
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
                                        <StepperNavigationButton
                                            key={step.id}
                                            stepperCurrentId={stepper.current.id}
                                            stepperCurrentIndex={stepper.current.index}
                                            array={array}
                                            index={index}
                                            steps={steps}
                                            step={step}
                                            navigate={stepper.goTo}
                                        />
                                    ))}
                                </ol>
                            </nav>
                            <div className="space-y-4">
                                {stepper.switch({
                                    personal: () => <PersonalDetailsForm />,
                                    children: () => <ChildrenDetailsForm />,
                                    complete: () => <CompleteOnboarding />,
                                })}
                                {!stepper.isLast ? (
                                    <div className="flex justify-end gap-4">
                                        <Button
                                            type="submit"
                                            disabled={isPersonalOnboardingPending || isUploading}
                                        >
                                            {(isPersonalOnboardingPending || isUploading) && <Loader className={'animate-spin mr-2'} />}
                                            {stepper.isLast ? 'Complete' : 'Submit & Continue'}
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

