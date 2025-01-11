import {prisma} from "@/utils/prisma";
import {NextResponse} from "next/server";
import {z} from "zod";
import {getUserOrThrowError} from "@/utils/utils";


export async function GET() {
    const {id} = await getUserOrThrowError();

    const profile = await prisma.profiles.findFirst({
        where: {
            id
        }
    });

    return NextResponse.json({
        profile
    })
}

export async function PUT(req: Request) {
    try {
        const {id} = await getUserOrThrowError();
        const updateProfileSchema = z.object({
            first_name: z.string().optional(),
            last_name: z.string().optional(),
            profile_image_url: z.string().optional()
        });

        const body = await req.json();
        const updateProfileDetails = updateProfileSchema.parse(body);

        await prisma.profiles.update({
            where: {
                id
            },
            data: {
                ...updateProfileDetails
            }
        });

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "An unknown error has occurred"
        })
    }
}