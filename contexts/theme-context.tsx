"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { themes } from '@/lib/themes'
import {useSettings} from "@/hooks/useSettings";
import {SettingsType} from "@/types/settings";


type ThemeContextType = {
    theme: typeof themes['classic'] | undefined
    setTheme: (theme: keyof typeof themes) => void
    getTheme: () => keyof typeof themes
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeName, setThemeName] = useState<keyof typeof themes>('classic')

    const theme = themes[themeName]


    const changeTheme = (themeName: keyof typeof themes) => {
        setThemeName(themeName)
        if(typeof window !== 'undefined') {
            localStorage.setItem("theme", themeName)
        }
    }

    const getTheme = async (): string | null => {
        try {
            const response = await fetch('/api/settings')
            const data: SettingsType = await response.json()
            return data.themeSelected
        }catch (e: unknown) {
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme: changeTheme, getTheme: getTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
