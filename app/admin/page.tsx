"use client"

import ThemeSwitcher from "@/components/ThemeSwitcher";
import AdminSideBar from "@/components/admin/AdminSideBar";
import {AdminBreadcrumbItem} from "@/types/admin";
import Layout from "@/app/admin/layout";
import {useSettings} from "@/hooks/useSettings";
import {useContext, useEffect} from "react";
import {SettingsContext, SettingsContextType, useSettingsContext} from "@/contexts/settings-context";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod/src";

export default function Admin(){

    const breadcrumbs: AdminBreadcrumbItem[] = [
        {
            label: "Accueil",
            href: "/admin"
        },
        {
            label: "Paramètres du site",
            href: "/admin/settings"
        }
    ]

    const { settings, loading, error, getSettings } = useSettingsContext()

    type FormValues = z.infer<typeof formSchema>;

    const formSchema = z.object({
        siteName: z.string().min(5, {
            message: "Le nom du site doit faire 5 caractères minimum."
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            siteName: ""
        }
    });

    const onSubmit = async (values: FormValues) => {
        try {
            const response = await fetch('/api/settings', {
                method: "POST",
                body: JSON.stringify({
                    siteName: values.siteName
                })
            })
            await getSettings()
        }catch (e) {

        }
    };


    useEffect(() => {
        if(settings?.siteName){
            form.reset({
                siteName: settings.siteName
            })
        }
    }, [settings]);

    if(loading) return <p>Chargement...</p>




    return (

            <div>
                <p>Paramètre pour {settings.siteName}</p>
                <Form { ...form }>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="siteName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom du site</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Site" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
    );
}