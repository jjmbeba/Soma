import React from 'react'

type Props = {
    children: React.ReactNode
}

const DashboardLayout = ({children}:Props) => {
    return (
        <div className={'max-w-5xl'}>
            {children}
        </div>
    )
}
export default DashboardLayout
