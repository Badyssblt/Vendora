import {ThemeConfig} from "@/types/theme";
import {classicClasses, classicTheme} from "@/themes/classic";
import {vendoraTheme} from "@/themes/vendora";


export const themes: Record<string, ThemeConfig> = {
    classic: classicTheme,
    vendora: vendoraTheme
}

export const themesClasses = {
    classic: classicClasses
}