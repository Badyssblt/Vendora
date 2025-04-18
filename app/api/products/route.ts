import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from "@/lib/prisma";


// Schéma de validation pour les produits
const productSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    description: z.string().min(1, "La description est requise"),
    price: z.number().positive("Le prix doit être positif"),
    stock: z.number().int().nonnegative("Le stock ne peut pas être négatif"),
    imageUrl: z.string().optional(),
});

// GET /api/products - Récupérer tous les produits
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des produits' },
            { status: 500 }
        );
    }
}

// POST /api/products - Créer un nouveau produit
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validation des données
        const validationResult = productSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }
        console.log(validationResult.data)

        const newProduct = await prisma.product.create({
            data: validationResult.data
        });



        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.log(error)
        console.error('Erreur lors de la création du produit:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la création du produit' },
            { status: 500 }
        );
    }
}

// PUT /api/products - Mettre à jour un produit existant
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...data } = body;

        if (!id) {
            return NextResponse.json({ error: "ID du produit requis" }, { status: 400 });
        }

        // Validation des données
        const validationResult = productSchema.safeParse(data);
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: validationResult.data
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la mise à jour du produit' },
            { status: 500 }
        );
    }
}

// DELETE /api/products - Supprimer un produit
export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "ID du produit requis" }, { status: 400 });
        }

        await prisma.product.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la suppression du produit' },
            { status: 500 }
        );
    }
}