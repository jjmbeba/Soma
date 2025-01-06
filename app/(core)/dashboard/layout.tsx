import React from 'react'
import {getUserProfile} from "@/app/actions";

type Props = {
    admin:React.ReactNode,
    parent:React.ReactNode
}

const Layout = async ({admin, parent}:Props) => {
    const profile = await getUserProfile();
    const role = profile?.roles;

    return (
        <>
            {role?.name === 'admin' ? admin : parent}
        </>
    )
}
export default Layout
