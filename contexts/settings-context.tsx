"use client"
import React, {createContext, useContext, useEffect, useState} from "react";

export const SettingsContext = createContext(undefined);

type SettingsType = {
    key: string,
    value: string
}

export type SettingsContextType = {
    settings?: SettingsType[];
    getSettings: () => Promise<void>;
};

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState<SettingsType[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState(null)


    const getSettings = async () => {
        try {
            const response = await fetch('/api/settings')
            const result = await response.json()
            setSettings(result)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getSettings()
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, getSettings, loading, error }}>
            { children }
        </SettingsContext.Provider>
    )
}

export const useSettingsContext = (): SettingsContextType => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettingsContext must be used within a SettingsProvider");
    }
    return context;
};