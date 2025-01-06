import { usePostOnboarding } from "@/hooks/onboarding";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
    childrenDetailSchema,
    ChildrenDetailsValues,
    CompleteValues,
    personalDetailsSchema,
    PersonalDetailsValues,
    StepperSchema
} from "@/schemas/onboarding";
import { setLocalStorage } from "@/utils/localStorage";
import { Stepper } from "@stepperize/react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import React from "react";

export type SetCompletedSteps = React.Dispatch<React.SetStateAction<string[]>>;

export const useOnboardingSubmit = (
    form: UseFormReturn<FieldValues, any, undefined>,
    stepper: Stepper<StepperSchema>,
    setCompletedSteps: SetCompletedSteps
) => {
    const { mutate: onboardPersonal, isPending: isPersonalOnboardingPending } = usePostOnboarding({
        errorMessage: "Failed to save personal details",
        endpoint: "/api/onboarding/personal",
        mutationKey: ['personal-details'],
        schema: personalDetailsSchema,
        successMessage: "Personal details saved successfully",
        onSuccessAction: () => {
            setCompletedSteps((prev: string[]) => {
                const newCompletedSteps = [...prev, 'personal'];
                setLocalStorage('completedSteps', newCompletedSteps);
                return newCompletedSteps;
            });
            stepper.next();
        }
    });

    const { mutate: onBoardChildren, isPending: isChildrenOnboardingPending } = usePostOnboarding({
        errorMessage: "Failed to save children details",
        endpoint: "/api/onboarding/children",
        mutationKey: ['children-details'],
        schema: childrenDetailSchema,
        successMessage: "Children details saved successfully",
        onSuccessAction: () => {
            setCompletedSteps((prev: string[]) => {
                const newCompletedSteps = [...prev, 'children'];
                setLocalStorage('completedSteps', newCompletedSteps);
                return newCompletedSteps;
            });
            stepper.next();
        }
    });

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onUploadError: (error) => {
            toast.error(error.message);
        },
        onClientUploadComplete: () => {
            toast.success("Image uploaded successfully");
        }
    });

    const handleSubmit = async (values: PersonalDetailsValues | ChildrenDetailsValues | CompleteValues) => {
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
                onBoardChildren(childrenValues);
            } else if (stepper.isLast) {
                toast.success("Onboarding completed successfully!");
                localStorage.removeItem('completedSteps');
                localStorage.removeItem('formData');
            }
            setLocalStorage('formData', values);
        } catch (error) {
            console.error("Error during form submission:", error);
            toast.error("An error occurred during submission. Please try again.");
        }
    };

    return {
        handleSubmit,
        isSubmitting: isPersonalOnboardingPending || isChildrenOnboardingPending || isUploading
    };
};

