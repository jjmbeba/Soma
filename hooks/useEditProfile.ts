import {useMutation, useQueryClient} from "@tanstack/react-query";
import {z} from "zod";
import {profileFormSchema} from "@/schemas/profile";
import {toast} from "sonner";

// Define the shape of the profile data
type ProfileData = z.infer<typeof profileFormSchema>;

// Update MutationContext to use ProfileData
interface MutationContext {
    previousProfile: ProfileData | undefined;
}

export const useEditProfile = () => {
    const queryClient = useQueryClient();

    return useMutation<ProfileData, Error, ProfileData, MutationContext>({
        mutationKey: ["profile"],
        mutationFn: async (values: ProfileData) => {
            const response = await fetch("/api/users/profile", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (!response.ok) {
                throw new Error("Failed to update profile");
            }
            return response.json();
        },
        onMutate: async (newProfile) => {
            await queryClient.cancelQueries({ queryKey: ["profile"] });

            const previousProfile = queryClient.getQueryData<ProfileData>(["profile"]);

            queryClient.setQueryData<ProfileData>(["profile"], newProfile);

            return { previousProfile };
        },
        onError: (err, newProfile, context) => {
            if (context?.previousProfile) {
                queryClient.setQueryData<ProfileData>(["profile"], context.previousProfile);
            }
            toast.error(err.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onSuccess: () => {
            toast.success("Profile updated successfully");
        },
    });
};

