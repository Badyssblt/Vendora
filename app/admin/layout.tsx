import React, {useContext} from "react";
import AdminSideBar from "@/components/admin/AdminSideBar";
import {AdminBreadcrumbItem} from "@/types/admin";
import {SettingsContext, SettingsProvider, useSettingsContext} from "@/contexts/settings-context";

type AdminLayoutProps = {
    children: React.ReactNode;
    breadcrumbs: AdminBreadcrumbItem[]
}

export default function Layout({ children }: AdminLayoutProps){

    const breadcrumbs = [
        {
            label: "Accueil",
            href: "/"
        }
    ]
    // @ts-ignore
    return (
        <SettingsProvider>
            <AdminSideBar breadcrumbs={breadcrumbs}>
                <main>
                    { children }
                </main>
            </AdminSideBar>
        </SettingsProvider>
    )
}