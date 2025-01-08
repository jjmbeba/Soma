"use client";

import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {usePathname} from "next/navigation";
import {capitalize} from "@/utils/utils";

const PageBreadCrumbs = () => {
    const parentPathname = usePathname().split('/')[1];
    const childPathname = usePathname().split('/')[2] ?? 'Overview';

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href={`/${parentPathname}`}>
                        {capitalize(parentPathname)}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {capitalize(childPathname)}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
export default PageBreadCrumbs
