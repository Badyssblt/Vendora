import Header from "./Header"
import React from "react";


export default function LayoutClassic({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header/>
            <main>
                { children }
            </main>
        </div>
    )
}