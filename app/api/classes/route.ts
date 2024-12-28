import {NextResponse} from 'next/server';
import {prisma} from "@/utils/prisma";

export async function GET() {
    try {
        const classes = await prisma.classes.findMany();
        const serializedClasses = classes.map(c =>( {
            ...c,
            id: c.id.toString()
        }));
        return NextResponse.json(serializedClasses);
    } catch (error) {
        console.error('Error fetching classes:', error);
        return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 });
    }
}

