"use client"

import {useEffect, useState} from "react";
import {MenuType, SettingsType} from "@/types/settings";


export const useMenu = () => {
    const [menu, setMenu] = useState<MenuType>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null);

    const getMenu = async () => {
        try {
            const response = await fetch('/api/settings')
            const data: any = await response.json()
            setMenu(JSON.parse(data.menu))
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
        getMenu()
    }, [])

    return { menu, loading, error, getMenu }
}