"use client";

import React, {useState, useEffect, useRef} from 'react'
import {Card, CardContent} from "@/components/ui/card"
import {defineStepper} from '@stepperize/react'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import PersonalDetailsForm from "@/app/components/onboarding/PersonalDetailsForm";
import {
    personalDetailsSchema,
    childrenDetailSchema,
    completeSchema,
    PersonalDetailsValues,
    ChildrenDetailsValues,
    CompleteValues
} from "@/schemas/onboarding";
import ChildrenDetailsForm from "@/app/components/onboarding/ChildrenDetailsForm";
import CompleteOnboarding from "@/app/components/onboarding/CompleteOnboarding";
import StepperNavigationButton from "@/app/components/onboarding/StepperNavigationButton";
import OnboardingFormHeader from "@/app/components/onboarding/OnboardingFormHeader";
import {usePostOnboarding} from "@/hooks/onboarding";
import {Loader} from 'lucide-react';
import {useUploadThing} from "@/utils/uploadthing";
import {toast} from "sonner";
import {setLocalStorage, getLocalStorage} from "@/utils/localStorage";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Progress} from "@/components/ui/progress";

const {useStepper, steps} = defineStepper(
    {id: 'personal', label: 'Personal Details', schema: personalDetailsSchema},
    {id: 'children', label: 'Children Details', schema: childrenDetailSchema},
    {id: 'complete', label: 'Complete', schema: completeSchema}
);

type StepValues = PersonalDetailsValues | ChildrenDetailsValues | CompleteValues;

const OnBoardingForm = () => {
    const stepper = useStepper();
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [navigationTarget, setNavigationTarget] = useState<number | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const progressToastId = useRef<string | number>('');

    const {mutate: onboardPersonal, isPending: isPersonalOnboardingPending} = usePostOnboarding({
        errorMessage: "Failed to save personal details",
        endpoint: "/api/onboarding/personal",
        mutationKey: ['personal-details'],
        schema: personalDetailsSchema,
        successMessage: "Personal details saved successfully",
        onSuccessAction: () => {
            setCompletedSteps(prev => {
                const newCompletedSteps = [...prev, 'personal'];
                setLocalStorage('completedSteps', newCompletedSteps);
                return newCompletedSteps;
            });
            stepper.next();
        }
    });

    const {startUpload, isUploading} = useUploadThing("imageUploader", {
        onUploadError: (error) => {
            toast.error(error.message);
            toast.dismiss(progressToastId.current);
        },
        onUploadProgress: (progress) => {
            setUploadProgress(progress);
            if (progressToastId.current) {
                toast.custom(
                    (t) => (
                        <div className="w-full bg-white rounded-lg shadow-lg p-4">
                            <p className="text-sm font-medium mb-2">Uploading image...</p>
                            <Progress value={progress} className="w-full"/>
                            <p className="text-xs text-right mt-1">{progress}%</p>
                        </div>
                    ),
                    {id: progressToastId.current, duration: Infinity}
                );
            } else {
                progressToastId.current = toast.custom(
                    (t) => (
                        <div className="w-full bg-white rounded-lg shadow-lg p-4">
                            <p className="text-sm font-medium mb-2">Uploading image...</p>
                            <Progress value={progress} className="w-full"/>
                            <p className="text-xs text-right mt-1">{progress}%</p>
                        </div>
                    ),
                    {duration: Infinity}
                );
            }
        },
        onClientUploadComplete: () => {
            toast.success("Image uploaded successfully");
            toast.dismiss(progressToastId.current);
            setUploadProgress(0);
        }
    });

    const form = useForm<StepValues>({
        mode: "onTouched",
        resolver: zodResolver(stepper.current.schema)
    });

    type StepType = 'personal' | 'children' | 'complete';

    const stepTypeMap: Record<number, StepType> = {
        1: 'personal',
        2: 'children',
        3: 'complete'
    };

    useEffect(() => {
        const savedCompletedSteps = getLocalStorage('completedSteps');
        if (savedCompletedSteps) {
            setCompletedSteps(savedCompletedSteps);
            const lastCompletedStepIndex = steps.findIndex(step => step.id === savedCompletedSteps[savedCompletedSteps.length - 1]);
            const nextStepType = stepTypeMap[lastCompletedStepIndex + 1] as StepType;
            stepper.goTo(nextStepType);
        }
        const savedFormData = getLocalStorage('formData');
        if (savedFormData) {
            form.reset(savedFormData);
        }
    }, []);

    const onSubmit = async (values: StepValues) => {
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
                setCompletedSteps(prev => {
                    const newCompletedSteps = [...prev, 'children'];
                    setLocalStorage('completedSteps', newCompletedSteps);
                    return newCompletedSteps;
                });
                stepper.next();
            } else if (stepper.isLast) {
                console.log("Onboarding completed");
                toast.success("Onboarding completed successfully!");
                // Clear local storage after successful completion
                localStorage.removeItem('completedSteps');
                localStorage.removeItem('formData');
            }
            setLocalStorage('formData', values);
        } catch (error) {
            console.error("Error during form submission:", error);
            toast.error("An error occurred during submission. Please try again.");
        }
    };

    const canNavigateToStep = (stepId: string) => {
        const stepIndex = steps.findIndex(step => step.id === stepId);
        return stepIndex <= completedSteps.length;
    };

    const handleNavigation = (targetIndex: number) => {
        const hasUnsavedChanges = form.formState.isDirty;
        if (hasUnsavedChanges) {
            setShowConfirmDialog(true);
            setNavigationTarget(targetIndex);
        } else {
            const nextStep = stepTypeMap[targetIndex+1] as StepType;
            stepper.goTo(nextStep);
        }
    };

    const confirmNavigation = () => {
        if (navigationTarget !== null) {
            const navigationTargetStep = stepTypeMap[navigationTarget+1] as StepType;
            stepper.goTo(navigationTargetStep);
            setShowConfirmDialog(false);
            setNavigationTarget(null);
        }
    };

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
                            <nav aria-label="Onboarding Steps" className="group my-4">
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
                                            navigate={() => handleNavigation(index)}
                                            disabled={!canNavigateToStep(step.id)}
                                            completed={completedSteps.includes(step.id)}
                                        />
                                    ))}
                                </ol>
                            </nav>
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
                            <div className="space-y-4">
                                {stepper.switch({
                                    personal: () => <PersonalDetailsForm/>,
                                    children: () => <ChildrenDetailsForm/>,
                                    complete: () => <CompleteOnboarding/>,
                                })}
                                {!stepper.isLast ? (
                                    <div className="flex justify-between gap-4">
                                        {stepper.current.index > 0 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => handleNavigation(stepper.current.index - 1)}
                                                disabled={!canNavigateToStep(steps[stepper.current.index - 1].id)}
                                            >
                                                Previous
                                            </Button>
                                        )}
                                        <Button
                                            type="submit"
                                            disabled={isPersonalOnboardingPending || isUploading}
                                            className="ml-auto"
                                        >
                                            {(isPersonalOnboardingPending || isUploading) &&
                                                <Loader className={'animate-spin mr-2'}/>}
                                            {stepper.isLast ? 'Complete' : 'Next'}
                                        </Button>
                                    </div>
                                ) : (
                                    <Button onClick={() => {
                                        stepper.reset();
                                        setCompletedSteps([]);
                                        localStorage.removeItem('completedSteps');
                                        localStorage.removeItem('formData');
                                        form.reset();
                                    }} className="w-full">
                                        Start Over
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Unsaved Changes</DialogTitle>
                        <DialogDescription>
                            You have unsaved changes. Are you sure you want to leave this step?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
                        <Button onClick={confirmNavigation}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default OnBoardingForm
