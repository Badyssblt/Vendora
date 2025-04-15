import {HeaderProps} from "@/types/admin";
import Link from "next/link";

export default function HeaderClassic({ menu }: HeaderProps) {
    return (
        <header className="bg-gray-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="text-2xl font-bold">
                    MonSite
                </div>

                <nav className="hidden md:flex space-x-6">
                    {
                        menu && menu.map((item) => (
                            <Link href={item.href} key={item.href}>
                                { item.name }
                            </Link>
                        ))
                    }
                </nav>

                <div>
                    <a
                        href="#"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                        Mon compte
                    </a>
                </div>
            </div>
        </header>
    );
}
