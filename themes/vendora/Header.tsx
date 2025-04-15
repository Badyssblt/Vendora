import {useMenu} from "@/hooks/useMenu";
import {MenuType} from "@/types/settings";
import Link from "next/link";
import {HeaderProps} from "@/types/admin";


export default function HeaderVendora({ menu }: HeaderProps) {


    return (
        <header className="bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Titre du site à gauche */}
                <div className="text-xl font-extrabold text-indigo-700">
                    Vendora
                </div>

                {/* Menu centré */}
                <nav className="hidden md:flex space-x-6">
                    {
                        menu && menu.map((item) => (
                            <Link href={item.href} key={item.href}>
                                { item.name }
                            </Link>
                        ))
                    }
                </nav>

                {/* Connexion à droite */}
                <div>
                    <a
                        href="#"
                        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"
                    >
                        Connexion
                    </a>
                </div>
            </div>
        </header>
    );
}
