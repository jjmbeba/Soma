import React from 'react'
import {useFormContext} from "react-hook-form";
import {ChildrenDetailsValues} from "@/schemas/onboarding";

const ChildrenDetailsForm = () => {
    const {register, formState: {errors}} = useFormContext<ChildrenDetailsValues>();

    return (
        <div>
            Children details
        </div>
    )
}
export default ChildrenDetailsForm
