"use client"

import React, { createContext, useContext, useState } from "react";
import { AdminBreadcrumbItem } from "@/types/admin";

type BreadcrumbsContextType = {
    breadcrumbs: AdminBreadcrumbItem[];
    setBreadcrumbs: (breadcrumbs: AdminBreadcrumbItem[]) => void;
};

const BreadcrumbsContext = createContext<BreadcrumbsContextType | undefined>(undefined);

export const BreadcrumbsProvider = ({ children }: { children: React.ReactNode }) => {
    const [breadcrumbs, setBreadcrumbs] = useState<AdminBreadcrumbItem[]>([]);

    return (
        <BreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
            {children}
        </BreadcrumbsContext.Provider>
    );
};

export const useBreadcrumbs = () => {
    const context = useContext(BreadcrumbsContext);
    if (!context) {
        throw new Error("useBreadcrumbs must be used within a BreadcrumbsProvider");
    }
    return context;
};
