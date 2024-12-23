import React from 'react'

type Props = {
    title:string;
    description:string;
}

const FormHeader = ({title, description}:Props) => {
    return (
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-balance text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    )
}
export default FormHeader
