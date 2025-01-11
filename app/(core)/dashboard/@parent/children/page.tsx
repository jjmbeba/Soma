import React from 'react'
import {ParentStudentGetResponse} from "@/types/responses";

const fetchChildren = async (): Promise<ParentStudentGetResponse> => {
    const res = await fetch("http://localhost:3000/api/parent-student/children", {
        method:"GET"
    });

    if (!res.ok) {
        throw new Error("Failed to fetch children");
    }

    return res.json();
};

const Page = async () => {
    const {children } = await fetchChildren();
    console.log(children)

    return (
        <div>
            Children details Page
            {/*<ul>*/}
            {/*    {children.map((child) => (*/}
            {/*        <li key={child.student_id}>*/}
            {/*            {child.name}*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    )
}
export default Page
