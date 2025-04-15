import {MenuType} from "@/types/settings";

export type AdminBreadcrumbItem = {
    label: string;
    href?: string;
    isActive?: boolean;
};

export type HeaderProps = {
    menu: MenuType[]
}
