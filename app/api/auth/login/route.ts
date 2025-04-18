// app/api/auth/login/route.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return NextResponse.json({ error: "Utilisateur non trouvé." }, { status: 404 })
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 })
        }

        return NextResponse.json({
            message: "Connexion réussie",
            user: {
                id: user.id,
                email: user.email,
            },
        })
    } catch (err) {
        console.error("Erreur de login:", err)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}
