import {getUser} from "@/app/actions";
import {NextResponse} from "next/server";
import {prisma} from "@/utils/prisma";
import {z} from "zod";

type InsertedChild = {
    id: bigint
    name: string
    class_id: bigint | null
    created_at: Date | null
    updated_at: Date | null
};
const childrenSchema = z.object({
    children: z.array(
        z.object({
            name: z.string().min(1, "Name is required"),
            dob: z.string().refine((date) => !isNaN(Date.parse(date)), {
                message: "Invalid date format",
            }),
            class: z.string(),
        })
    )
})

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();
        const data = childrenSchema.parse(body);
        const {data: {user}} = await getUser();

        if (!user) return NextResponse.json({
            error: "Unauthorized",
            message: "User not found",
        }, {
            status: 401
        })

        const children = data.children.map(({name, dob, class: classId}) => {
                return {
                    name,
                    date_of_birth: dob,
                    class_id: Number(classId),
                }
            }
        );

        let insertedChildren: InsertedChild[] = [];

        const existingChildren = await prisma.students.findMany({
            where: {
                OR: children.map((child) => ({
                    name: child.name,
                    date_of_birth: child.date_of_birth,
                    class_id: child.class_id,
                })),
            },
        });

        const duplicateChildren = existingChildren;
        const childrenToInsert = children.filter(
            (child) =>
                !existingChildren.some(
                    (existing) =>
                        existing.name === child.name &&
                        existing.date_of_birth === new Date(child.date_of_birth) &&
                        existing.class_id!.toString() === child.class_id.toString()
                )
        );

        if (childrenToInsert.length > 0) {
            insertedChildren = await prisma.students.createManyAndReturn({
                data: childrenToInsert,
                skipDuplicates: true
            });
        }

        await prisma.parent_student.createMany({
            data: [...insertedChildren, ...duplicateChildren].map((child) => {
                return {
                    parent_id: user.id,
                    student_id: child.id
                }
            })
        })

        await prisma.profiles.update({
            where: {
                id: user.id
            },
            data:{
                is_onboarded:true
            }
        })


        return NextResponse.json({
            data: data,
            status: 200,
            message: "Children details saved successfully",
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'An unknown error has occurred',
            message: "Failed to save children details",
        }, {
            status: 500
        })
    }
}