"use client"
import {ThemeProvider} from "@/contexts/theme-context";
import "./globals.css"
import Providers from "./providers"
import {useSession, signIn, signOut, SessionProvider} from "next-auth/react"


export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="en">
        <body>
            <main>
                <SessionProvider>
                    <ThemeProvider>
                        { children }
                    </ThemeProvider>
                </SessionProvider>
            </main>
        </body>
        </html>
    );
}
