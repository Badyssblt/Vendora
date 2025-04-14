import {ThemeConfig} from "@/types/theme";
import Header from './Header'
import Footer from './Footer'
import Layout from './Layout'


export const vendoraTheme: ThemeConfig = {
    name: 'Vendora',
    label: "Thème de Vendora",
    layout: 'classic',
    components: {
        header: Header,
        layout: Layout,
        footer: Footer
    },
    styles: {
        colors: {
            primary: '#1d4ed8',
            background: '#ffffff',
            text: '#111111',
        },
        font: 'sans',
    },
}


