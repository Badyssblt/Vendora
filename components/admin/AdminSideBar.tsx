import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import React from "react";
import {AdminBreadcrumbItem} from "@/types/admin";

export default function AdminSideBar({ children, breadcrumbs }: { children: React.ReactNode, breadcrumbs: AdminBreadcrumbItem[] }) {


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((breadcrumb, index) => {
                                const isLast = index === breadcrumbs.length - 1;

                                return (
                                    <React.Fragment key={breadcrumb.label}>
                                        <BreadcrumbItem className="hidden md:block">
                                            {isLast ? (
                                                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink href={breadcrumb.href || "#"}>
                                                    {breadcrumb.label}
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                        {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                                    </React.Fragment>
                                );
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    { children }
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
