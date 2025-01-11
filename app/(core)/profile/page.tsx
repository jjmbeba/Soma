import React from 'react'
import EditProfileForm from "@/app/components/forms/edit-profile-form";
import {getUserProfile} from "@/app/actions";
import {z} from "zod";

const ProfilePage = async () => {
    const profile = await getUserProfile();
    if (!profile) {
        return;
    }

    const defaultValues = {
        first_name: profile.first_name!,
        last_name: profile.last_name!,
        email: profile.email,
        profile_image_url: profile.profile_image_url ?? undefined
    }

    return (
        <div>
            <EditProfileForm profile={defaultValues} />
        </div>
    )
}
export default ProfilePage
