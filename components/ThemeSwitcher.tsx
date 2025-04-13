import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {themes} from "@/lib/themes";
import {ChangeEvent, useEffect, useState} from "react";
import {useTheme} from "@/contexts/theme-context";
import prisma from "@/lib/prisma";
import Form from "next/form";
import {Label} from "@/components/ui/label";

export default function ThemeSwitcher(){

    const allThemes = Object.values(themes)
    const theme = useTheme()
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null)

    useEffect(() => {
        setSelectedTheme(theme.getTheme())
    }, []);

    const changeTheme = async (event: string) => {
        setSelectedTheme(event)
        theme.setTheme(event)

        const data = fetch('/api/settings', {
            method: 'POST',
            body: JSON.stringify({
                key: "themeSelected",
                value: theme.getTheme()
            })
        })
    }


    return (
        <div>
            <form>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="theme">Sélectionnez un thème</Label>
                    <Select onValueChange={changeTheme} value={selectedTheme} id="theme">
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

            </form>
        </div>
    )
}