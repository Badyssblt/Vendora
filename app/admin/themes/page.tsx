"use client"

import {themes} from "@/lib/themes";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {useBreadcrumbs} from "@/contexts/breadcrumbs-context";
import {useEffect} from "react";

export default function AdminTheme(){

    const { setBreadcrumbs } = useBreadcrumbs()

    useEffect(() => {
        setBreadcrumbs([
            {label: "Accueil", href: "/admin"},
            {label: "Thèmes", href: "/admin/themes"}
        ])
    }, []);
    return (
        <div>
            <ThemeSwitcher/>

        </div>
    )
}