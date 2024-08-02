import type {Metadata} from 'next';
import './globals.css';
import ThemeModeProvider from "@/context/theme-mode-provider";

import {Inter as FontSans} from "next/font/google"
import {cn} from "@/lib/utils"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
    title: 'Estify',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" className='dark'>
        <body className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
        )}
              suppressHydrationWarning={true}>
        <ThemeModeProvider>
            {children}
        </ThemeModeProvider>
        </body>
        </html>
    );
}