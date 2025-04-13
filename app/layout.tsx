import {ThemeProvider} from "@/contexts/theme-context";
import "./globals.css"
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
            <main>
                <ThemeProvider>
                    { children }
                </ThemeProvider>
            </main>
        </body>
        </html>
    );
}
