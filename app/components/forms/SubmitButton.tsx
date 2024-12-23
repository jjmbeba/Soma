import React from 'react'
import {Button} from "@/components/ui/button";

const SubmitButton = ({text}:{text:string}) => {
    return (
        <Button type="submit" className="w-full">
            {text}
        </Button>
    )
}
export default SubmitButton
