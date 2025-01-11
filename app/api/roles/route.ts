import {NextResponse} from 'next/server';
import {prisma} from "@/utils/prisma";

export async function GET() {
    try {
        const roles = await prisma.roles.findMany();
        const serializedRoles = roles.map(role =>( {
            ...role,
            id: Number(role.id)
        }));
        return NextResponse.json(serializedRoles);
    } catch (error) {
        console.error('Error fetching classes:', error);
        return NextResponse.json({
            error:  error instanceof Error ? error.message : "An unknown error has occurred"
        }, { status: 500 });
    }
}

