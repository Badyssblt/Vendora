// app/register/page.tsx
"use client"

import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()
        setMessage(data.message)
    }

    return (
        <div className="max-w-sm mx-auto mt-10">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                />
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    type="password"
                    required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    S'inscrire
                </button>
            </form>
            {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
        </div>
    )
}
