import {getUserOrThrowError} from "@/utils/utils";
import {prisma} from "@/utils/prisma";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const {id} = await getUserOrThrowError();
        console.log("Running - try")

        const children = await prisma.parent_student.findMany({
            where: {
                parent_id: id
            },
            include: {
                students: true
            }
        });

        if (!children) {
            return NextResponse.json({
                success: false,
                error: "No children found"
            })
        }

        return NextResponse.json({
            success: true,
            children
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "An unknown error has occurred"
        })
    }
}