import React, {ReactNode} from "react";

export type ThemeConfig = {
    name: string;
    label: string;
    layout: 'classic' | 'modern' | 'grid',
    components: {
        header: React.FC,
        footer: React.FC,
        layout?: React.FC<{ children: ReactNode }>,
    },
    styles: {
        colors: Record<string, string>
        font: string
    }
}

export type ThemeClasses = {
    body: string,
    header: Record<string, string>,
    content: Record<string, string>,
    footer: Record<string, string>
}