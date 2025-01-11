import {getUserProfile} from "@/app/actions";
import {NextResponse} from "next/server";

export async function GET() {
    try{
        const profile = await getUserProfile();

        if(!profile){
            throw new Error("No profile found");
        }

        return NextResponse.json({
            profile
        })

    } catch (error){
        return NextResponse.json({
            success:false,
            error: error instanceof Error ? error.message : "An unknown error occurred"
        })
    }
}