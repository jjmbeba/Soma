'use client';

import React, {useEffect, useState} from 'react';
import {defineStepper} from '@stepperize/react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {childrenDetailSchema, completeSchema, personalDetailsSchema} from "@/schemas/onboarding";
import StepperNavigation from "@/app/components/onboarding/StepNavigation";
import StepInstructions from "@/app/components/onboarding/StepInstructions";
import StepContent from "@/app/components/onboarding/StepContent";
import UnsavedChangesDialog from "@/app/components/onboarding/UnsavedChangesDialog";
import {useOnboardingSubmit} from "@/hooks/useOnboardingSubmit";
import {useCompletedSteps} from "@/hooks/useCompletedSteps";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {Loader} from "lucide-react";

const {useStepper, steps} = defineStepper(
    {id: 'personal', label: 'Personal Details', schema: personalDetailsSchema},
    {id: 'children', label: 'Children Details', schema: childrenDetailSchema},
    {id: 'complete', label: 'Complete', schema: completeSchema}
);

const OnboardingFormContent = () => {
    const stepper = useStepper();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [navigationTarget, setNavigationTarget] = useState<number | null>(null);
    const {completedSteps, setCompletedSteps} = useCompletedSteps();
    const {getLocalStorage, setLocalStorage} = useLocalStorage();

    const form = useForm({
        mode: "onTouched",
        resolver: zodResolver(stepper.current.schema)
    });

    const {handleSubmit, isSubmitting} = useOnboardingSubmit(form, stepper, setCompletedSteps);

    useEffect(() => {
        const savedCompletedSteps = getLocalStorage('completedSteps');
        if (savedCompletedSteps) {
            setCompletedSteps(savedCompletedSteps);
            const lastCompletedStepIndex = steps.findIndex(step => step.id === savedCompletedSteps[savedCompletedSteps.length - 1]);
            stepper.goTo(steps[lastCompletedStepIndex + 1]?.id);
        }
        const savedFormData = getLocalStorage('formData');
        if (savedFormData) {
            form.reset(savedFormData);
        }
    }, []);

    const handleNavigation = (targetIndex: number) => {
        const hasUnsavedChanges = form.formState.isDirty;
        if (hasUnsavedChanges) {
            setShowConfirmDialog(true);
            setNavigationTarget(targetIndex);
        } else {
            stepper.goTo(steps[targetIndex].id);
        }
    };

    const confirmNavigation = () => {
        if (navigationTarget !== null) {
            stepper.goTo(steps[navigationTarget].id);
            setShowConfirmDialog(false);
            setNavigationTarget(null);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-6 border rounded-lg">
                <StepperNavigation
                    stepper={stepper}
                    steps={steps}
                    completedSteps={completedSteps}
                    handleNavigation={handleNavigation}
                />
                <StepInstructions stepper={stepper}/>
                <StepContent stepper={stepper}/>
                {!stepper.isLast && (
                    <div className="flex justify-between gap-4">
                        {stepper.current.index > 0 && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleNavigation(stepper.current.index - 1)}
                                disabled={!completedSteps.includes(steps[stepper.current.index - 1].id)}
                            >
                                Previous
                            </Button>
                        )}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="ml-auto"
                        >
                            {isSubmitting && <Loader className={'animate-spin mr-2'}/>}
                            {stepper.isLast ? 'Complete' : 'Next'}
                        </Button>
                    </div>
                )}
            </form>
            <UnsavedChangesDialog
                open={showConfirmDialog}
                onOpenChange={setShowConfirmDialog}
                onConfirm={confirmNavigation}
            />
        </Form>
    );
};

export default OnboardingFormContent;

