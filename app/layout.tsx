import {Space_Grotesk} from "next/font/google";
import {ThemeProvider} from "next-themes";
import "./globals.css";
import Navbar from "@/app/components/navigation/Navbar";
import {ModeToggle} from "@/app/components/themes/ModeToggle";
import React from "react";
import AuthButtons from "@/app/components/auth/AuthButtons";
import {Toaster} from "@/components/ui/sonner";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: {
        template: 'Soma • %s',
        default: 'Soma'
    },
    description: "A bridge between parents and teachers to monitor student progress",
};

const spaceGrotesk = Space_Grotesk({subsets: ['latin']})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={spaceGrotesk.className} suppressHydrationWarning>
        <body className="bg-background text-foreground">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <main className="min-h-screen flex flex-col items-center">
                <div className="flex-1 w-full flex flex-col gap-20 items-center">
                    <Navbar>
                        <div className={'flex items-center gap-4'}>
                            <ModeToggle/>
                            <AuthButtons/>
                        </div>
                        {/*Navlinks here*/}
                    </Navbar>
                    <div className="w-full flex flex-col gap-20">
                        {children}
                    </div>
                    <footer
                        className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                        {/* Footer here */}
                    </footer>
                </div>
                <Toaster richColors />
            </main>
        </ThemeProvider>
        </body>
        </html>
    );
}
