import React from 'react'
import {createClient} from "@/utils/supabase/server";
import {checkIfUserIsSignedIn} from "@/lib/utils";
import SignOutButton from "@/app/components/auth/SignOutButton";
import AuthButtons from "@/app/components/auth/AuthButtons";

const HeaderAuth = async () => {
    const supabase = await createClient();
    const isUserSigned = await checkIfUserIsSignedIn(supabase);

    return isUserSigned ? <SignOutButton/> : <AuthButtons/>
}
export default HeaderAuth
