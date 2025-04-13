// app/api/settings/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const settings = await prisma.setting.findMany();

        // Format settings table to get the key of array as KEY in table
        const formattedSettings = settings.reduce((acc, setting) => {
            acc[setting.key] = setting.value;
            return acc;
        }, {} as Record<string, string>);

        return NextResponse.json(formattedSettings);
    } catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la récupération' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const entries = Object.entries(body);

        if (entries.length === 0) {
            return NextResponse.json({ error: 'Le corps de la requête est vide.' }, { status: 400 });
        }

        const [key, value] = entries[0];

        if (!key || value === undefined) {
            return NextResponse.json({ error: 'Clé ou valeur invalide.' }, { status: 400 });
        }

        const existingSetting = await prisma.setting.findUnique({
            where: { key },
        });

        let result;

        if (existingSetting) {
            result = await prisma.setting.update({
                where: { key },
                data: { value },
            });
        } else {
            result = await prisma.setting.create({
                data: { key, value },
            });
        }

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erreur lors de la création ou mise à jour : ' + error }, { status: 500 });
    }
}


