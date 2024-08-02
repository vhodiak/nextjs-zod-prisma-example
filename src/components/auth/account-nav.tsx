"use client"

import {signOut, useSession} from 'next-auth/react';
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import Avatar from 'react-avatar';
import Link from "next/link"

export default function AccountNav() {
    const {data: session} = useSession();
    const user = session?.user;
    if (!user) return (
        <></>
    )
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                >
                    {<Avatar className="overflow-hidden rounded-full" size="36" src={user?.image || undefined} name={user?.name || undefined } />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel >
                    <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}