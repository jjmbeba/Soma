import {getUserOrThrowError} from "@/utils/utils";
import {prisma} from "@/utils/prisma";
import {NextResponse} from "next/server";
import {getUserProfile} from "@/app/actions";
import {z} from "zod";

export async function GET(
    request: Request,
    {params}: { params: Promise<{ userId: string }> }
) {
    try {
        await getUserOrThrowError();
        const requestedUserId = z.string().uuid().parse((await params).userId);

        const foundUser = await prisma.profiles.findFirst({
            where: {
                id: requestedUserId
            },
            select: {
                email: true,
                id: true,
                first_name: true,
                last_name: true,
                profile_image_url: true

            }
        })

        if (!foundUser) {
            return NextResponse.json({
                success: false,
                error: "User not found"
            }, {status: 404})
        }

        return NextResponse.json({
            success: true,
            user: foundUser
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred"
        })
    }
}

export async function PUT(
    request: Request,
    {params}: { params: Promise<{ userId: string }> }
) {
    try {
        await getUserOrThrowError();
        const profile = await getUserProfile();
        const role = profile?.roles?.name;

        if (role !== 'admin') {
            throw new Error("User not authorized");
        }

        //Add a banned feature in the future

    } catch (error) {
        return NextResponse.json({
            success:false,
            error: error instanceof Error ? error.message : "An unknown error has occurred"
        })
    }
}