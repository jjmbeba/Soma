import {Space_Grotesk} from "next/font/google";
import {ThemeProvider} from "next-themes";
import "./globals.css";
import Navbar from "@/app/components/navigation/Navbar";
import {ModeToggle} from "@/app/components/themes/ModeToggle";
import React from "react";
import AuthButtons from "@/app/components/auth/AuthButtons";
import {Toaster} from "@/components/ui/sonner";
import QueryProvider from "@/app/components/providers/QueryProvider";
import {NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin";
import {extractRouterConfig} from "uploadthing/server";
import {ourFileRouter} from "@/app/api/uploadthing/core";

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
            <QueryProvider>
                <main className="min-h-screen flex flex-col items-center">
                    <div className="flex-1 w-full flex flex-col gap-20 items-center">
                        <div className="w-full flex flex-col gap-20">
                            <NextSSRPlugin
                                /**
                                 * The `extractRouterConfig` will extract **only** the route configs
                                 * from the router to prevent additional information from being
                                 * leaked to the client. The data passed to the client is the same
                                 * as if you were to fetch `/api/uploadthing` directly.
                                 */
                                routerConfig={extractRouterConfig(ourFileRouter)}
                            />
                            {children}
                        </div>
                    </div>
                    <Toaster richColors/>
                </main>
            </QueryProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
