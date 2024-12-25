import React from 'react'
import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react";

const SubmitButton = ({text, isSubmitPending}:{text:string, isSubmitPending:boolean}) => {
    return (
        <Button disabled={isSubmitPending} type="submit" className="w-full">
            {isSubmitPending && <Loader className={'h-4 w-4 animate-spin'}/>}
            {text}
        </Button>
    )
}
export default SubmitButton
