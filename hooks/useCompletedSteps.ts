import { useState } from 'react';
import { setLocalStorage, getLocalStorage } from "@/utils/localStorage";
import { SetCompletedSteps } from "@/hooks/useOnboardingSubmit";

export const useCompletedSteps = () => {
    const [completedSteps, setCompletedSteps] = useState<string[]>(() => {
        const savedSteps = getLocalStorage('completedSteps');
        return savedSteps || [];
    });

    const updateCompletedSteps: SetCompletedSteps = (newSteps) => {
        setCompletedSteps(prevSteps => {
            const updatedSteps = typeof newSteps === 'function' ? newSteps(prevSteps) : newSteps;
            setLocalStorage('completedSteps', updatedSteps);
            return updatedSteps;
        });
    };

    return { completedSteps, setCompletedSteps: updateCompletedSteps };
};

