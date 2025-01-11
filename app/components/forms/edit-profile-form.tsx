'use client'

import {useForm} from 'react-hook-form'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {profileFormSchema} from "@/schemas/profile";
import {useEditProfile} from "@/hooks/useEditProfile";
import {Loader} from "lucide-react";
import Image from "next/image";
import {capitalize} from "@/utils/utils";


export default function EditProfileForm({profile}: { profile: z.infer<typeof profileFormSchema> }) {
    const form = useForm<z.infer<typeof profileFormSchema>>({
        defaultValues: profile,
        resolver: zodResolver(profileFormSchema)
    });
    const {mutate: editProfile, isPending: isEditProfilePending} = useEditProfile();

    const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
        // Here you would typically send the data to your API
        editProfile(data)
    }

    const profileUrl = form.watch("profile_image_url");

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({field}) => (
                                <FormItem className={'space-y-2'}>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({field}) => (
                                <FormItem className={'space-y-2'}>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem className={'space-y-2'}>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input disabled placeholder="johndoe@email.com" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className={'flex gap-2'}>
                        <FormField
                            control={form.control}
                            name="profile_image_url"
                            render={({field}) => (
                                <FormItem className={'space-y-2 flex-1'}>
                                    <FormLabel>Profile Image Url</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Image url..." {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {profileUrl && <Image className={'aspect-square rounded-full self-end'} width={40} height={20} src={profileUrl} alt={`${capitalize(profile.first_name)} ${capitalize(profile.last_name)}`}/>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isEditProfilePending} className="w-full">
                        {isEditProfilePending && <Loader className={'animate-spin'}/>} Update Profile
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

