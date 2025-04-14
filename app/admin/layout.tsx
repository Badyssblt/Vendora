"use client"

import React from "react";
import AdminSideBar from "@/components/admin/AdminSideBar";
import { BreadcrumbsProvider, useBreadcrumbs } from "@/contexts/breadcrumbs-context";
import { SettingsProvider } from "@/contexts/settings-context";

type AdminLayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: AdminLayoutProps) {
    return (
        <SettingsProvider>
            <BreadcrumbsProvider>
                <AdminLayoutContent>{children}</AdminLayoutContent>
            </BreadcrumbsProvider>
        </SettingsProvider>
    );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { breadcrumbs } = useBreadcrumbs();

    return (
        <AdminSideBar breadcrumbs={breadcrumbs}>
            <main>{children}</main>
        </AdminSideBar>
    );
}
