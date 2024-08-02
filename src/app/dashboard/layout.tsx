"use client"
import AccountNav from "@/components/auth/account-nav";
import MainNav from "@/components/main-nav";
import MobileNav from "@/components/mobile-nav";
import Breadcrumbs from "@/components/breadcrumbs";

import {SessionProvider} from "next-auth/react";
import { Toaster, toast } from 'sonner'
export default function DashboardLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <SessionProvider>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                    <MainNav/>
                </aside>
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <header
                        className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                        <MobileNav/>
                        <Breadcrumbs/>
                        <div className="relative ml-auto flex-1 md:grow-0"></div>
                        <AccountNav/>
                    </header>
                    <main className="px-4">
                        {children}
                        <Toaster />
                    </main>
                </div>
            </div>
        </SessionProvider>
    )
}
