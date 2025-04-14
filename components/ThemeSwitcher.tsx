"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {themes} from "@/lib/themes";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {useTheme} from "@/contexts/theme-context";
import prisma from "@/lib/prisma";
import Form from "next/form";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

export default function ThemeSwitcher(){

    const allThemes = Object.values(themes)
    const theme = useTheme()
    const [selectedTheme, setSelectedTheme] = useState<string | null>()

    const fetchTheme = async () => {
        try {
            const currentTheme = await theme.getTheme()
            setSelectedTheme(currentTheme)
        } catch (error) {
            console.error("Erreur lors de la récupération du thème:", error)
            setSelectedTheme("Classic")
        }
    }

    useEffect(() => {
        fetchTheme()
    }, []);

    const changeTheme = async (event: React.FormEvent) => {
        event.preventDefault()
        console.log(selectedTheme?.charAt(0).toUpperCase())
        const data = await fetch('/api/settings', {
            method: 'POST',
            body: JSON.stringify({
                themeSelected: selectedTheme
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }



    return (
        <div>
            <form onSubmit={changeTheme}>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="theme">Sélectionnez un thème</Label>

                    <Select onValueChange={(e) => setSelectedTheme(e)} value={selectedTheme ?? undefined} id="theme" >
                        <SelectTrigger>
                            <SelectValue placeholder="Theme"/>
                        </SelectTrigger>
                        <SelectContent>
                            {allThemes.map((theme) => (
                                <SelectItem key={theme.name} value={theme.name}>{theme.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button>Changer de thème</Button>
            </form>
        </div>
    )
}