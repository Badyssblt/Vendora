"use client"

import {useBreadcrumbs} from "@/contexts/breadcrumbs-context";
import {useEffect, useState} from "react";
import {MenuType} from "@/types/settings";
import {Button,} from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminMenu() {

    const { setBreadcrumbs } = useBreadcrumbs();
    const [menu, setMenu] = useState<MenuType[]>([]);

    const [newMenuItem, setNewMenuItem] = useState<{ name: string; href: string }>({
        name: '',
        href: ''
    });

    useEffect(() => {
        setBreadcrumbs([
            { label: "Accueil", href: "/admin" },
            { label: "Menu", href: "/admin/menu" }
        ]);
        getMenu();
    }, []);

    const getMenu = async () => {
        try {
            const response = await fetch('/api/settings');
            const data = await response.json();
            setMenu(JSON.parse(data.menu));
        } catch (e) {
            console.error("Erreur lors de la récupération du menu", e);
        }
    }

    const addEntry = () => {
        if (newMenuItem.name && newMenuItem.href) {
            // Ajoute le nouvel élément au menu
            setMenu([...menu, newMenuItem]);

            // Réinitialise les champs du formulaire
            setNewMenuItem({ name: '', href: '' });
        } else {
            alert('Veuillez remplir tous les champs');
        }
    }

    const addMenu = async () => {
        try {
            const response = await fetch('/api/settings', {
                method: 'POST',
                body: JSON.stringify({
                    menu: JSON.stringify(menu)
                })
            });
            if (response.ok) {
                console.log('Menu sauvegardé');
            }
        } catch (e) {
            console.error('Erreur lors de l\'ajout du menu', e);
        }
    }

    return (
        <div>
            <h2 className="font-medium text-lg">Menu</h2>

            <div>
                { menu && menu.map((item: MenuType) => (
                    <div key={item.name}>
                        <p>{item.name}</p>
                    </div>
                ))}

                {/* Formulaire pour ajouter un élément */}
                <div className="mt-4">
                    <Input
                        type="text"
                        placeholder="Nom de l'élément"
                        value={newMenuItem.name}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                        className="mb-2"
                    />
                    <Input
                        type="text"
                        placeholder="URL"
                        value={newMenuItem.href}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, href: e.target.value })}
                        className="mb-2"
                    />
                </div>

                <Button variant="outline" onClick={addEntry}>Ajouter un élément</Button>
                <Button onClick={addMenu}>Créer le menu</Button>
            </div>
        </div>
    );
}
