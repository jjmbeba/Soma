import {createClient} from "@/utils/supabase/server";
import {checkIfUserIsSignedIn, redirectBasedOnUserStatus} from "@/lib/utils";
import type {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Dashboard",
        description: "Page for authenticated users to view their dashboard and manage their account",
    }
}

export default async function Page() {
    const supabase = await createClient();
    const isUserSigned = await checkIfUserIsSignedIn(supabase);
    redirectBasedOnUserStatus(isUserSigned);

    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            Protected page
        </div>
    );
}
