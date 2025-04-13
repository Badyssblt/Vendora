import {ThemeConfig} from "@/types/theme";
import Header from './Header'
import Footer from './Footer'
import Layout from './Layout'

const classicTheme: ThemeConfig = {
    name: 'Classic',
    label: "Thème Classique de Vendora",
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

export default classicTheme;