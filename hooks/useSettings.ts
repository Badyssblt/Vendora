"use client"

import {useEffect, useState} from "react";
import {SettingsType} from "@/types/settings";


export const useSettings = () => {
    const [settings, setSettings] = useState<SettingsType>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null);

    const getSettings = async () => {
        try {
            const response = await fetch('/api/settings')
            const data: SettingsType = await response.json()
            setSettings(data)
        }catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('Une erreur inconnue est survenue');
            }
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getSettings()
    }, [])

    return { settings, loading, error, getSettings }
}