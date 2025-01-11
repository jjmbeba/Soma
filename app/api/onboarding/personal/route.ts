import {z} from "zod";
import {NextResponse} from "next/server";
import {prisma} from "@/utils/prisma";
import {getUser} from "@/app/actions";

const personalDetailsSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    imageUrl: z.string().url().optional(),
});

export async function POST(
    request:Request
){
   try{
       const body = await request.json();
       const data = personalDetailsSchema.parse(body);
       const {data: {user}} = await getUser();

       if(!user) throw new Error("User is unauthenticated");

       await prisma.profiles.update({
           where: {
               id: user.id,
           },
           data: {
               first_name: data.firstName,
               last_name: data.lastName,
               profile_image_url: data.imageUrl,
               role_id:2
           }
       })

       return NextResponse.json({
           data: data,
           status: 200,
           message: "Personal details saved successfully",
       })
   } catch (error) {
       return NextResponse.json({
           error: error instanceof Error ? error.message : "An unknown error has occurred"
       })
   }
}