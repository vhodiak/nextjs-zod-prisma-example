'use client'
import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

interface Item {
    label: string;
    path: string;
}


const getPathTitle = (k: string): string => {
    const titles: { [key: string]: string } = {
        "/dashboard/profile": "Profile",
        "/dashboard/clients": "Clients",
        "/dashboard/projects": "Projects",
    }

    return titles[k] || "N/A"
}


const Breadcrumbs = () => {
    const path = usePathname()
    const items: Item[] = [
        {label: 'Dashboard', path: '/dashboard'},
        {label: getPathTitle(path), path: path}
    ]

    return <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
            {items.map( (e)  =>
                <BreadcrumbItem key={e.path}>
                    <BreadcrumbLink asChild>
                        <Link href={e.path}>{e.path !== '/dashboard' && '/'} {e.label}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </BreadcrumbList>
    </Breadcrumb>
}


export default Breadcrumbs;