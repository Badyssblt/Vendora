'use client'
import { useSettings } from "@/hooks/useSettings";
import { useEffect, useState } from "react";
import {MenuType} from "@/types/settings";
import {useMenu} from "@/hooks/useMenu";

export default function Page() {
    const { settings } = useSettings();
    const theme = settings?.themeSelected.toLowerCase();

    const [HeaderComponent, setHeaderComponent] = useState<any>(null);
    const [ContentComponent, setContentComponent] = useState<any>(null);
    const [FooterComponent, setFooterComponent] = useState<any>(null);
    const [hasError, setHasError] = useState<boolean>(false)

    const { menu } = useMenu()

    const loadHeader = async () => {
        try {
            const module = await import(`@/themes/${theme}/Header`);
            setHeaderComponent(() => module.default);
        }catch (e) {
            setHasError(true)
        }

    };

    const loadContent = async () => {
        try {
            const module = await import(`@/themes/${theme}/Content`);
            setContentComponent(() => module.default);
        }catch (e) {
            setHasError(true)
        }
    }

    const loadFooter = async () => {
        try {
            const module = await import(`@/themes/${theme}/Footer`);
            setFooterComponent(() => module.default);
        }catch (e) {
            setHasError(true)
        }

    };

    useEffect(() => {
        if (theme) {
            loadHeader();
            loadContent();
            loadFooter();
        }
    }, [theme]);

    if(hasError){
        return <p>Le thème n'existe pas !</p>
    }

    return (
        <div>
            {HeaderComponent && <HeaderComponent menu={menu}/>}
            {ContentComponent && <ContentComponent/>}
            {FooterComponent && <FooterComponent/>}
        </div>
    );
}
