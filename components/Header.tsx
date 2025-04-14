import {useTheme} from "@/contexts/theme-context";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {themesClasses} from "@/lib/themes";
import {ThemeClasses} from "@/types/theme";
import {SettingsType} from "@/types/settings";
import Link from "next/link";

type HeaderType = {
    classes: ThemeClasses,
    settings: SettingsType
}

export default function Header({ classes, settings }: HeaderType){

    if(!classes && !settings) return null;


    return (
        <header >
            <menu className={classes.header.menu}>
                <Link href={"/"}><h1>{ settings.siteName }</h1></Link>
                <div className={classes.header.menuContent}>
                    <li>Rechercher</li>
                    <li>Produits</li>
                </div>
                <div>
                    <p>Mon compte</p>
                </div>
            </menu>
        </header>
    )
}