"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Pencil, Trash, Plus } from 'lucide-react';

// Composants UI
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

// Schéma de validation pour le formulaire
const productSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    description: z.string().min(1, "La description est requise"),
    price: z.coerce.number().positive("Le prix doit être positif"),
    stock: z.coerce.number().int().nonnegative("Le stock ne peut pas être négatif"),
    imageUrl: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

// Type pour le produit
type Product = ProductFormValues & {
    id: string;
    createdAt: string;
    updatedAt: string;
};

export default function ProductsAdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            stock: 0,
            imageUrl: '',
        }
    });

    // Charger les produits
    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Erreur lors du chargement des produits:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Créer ou mettre à jour un produit
    const onSubmit = async (data: ProductFormValues) => {
        try {
            let response;

            if (currentProduct) {
                // Mise à jour d'un produit existant
                response = await fetch(`/api/products`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: currentProduct.id,
                        ...data
                    }),
                });
            } else {
                // Création d'un nouveau produit
                response = await fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
            }

            if (response.ok) {
                reset();
                setIsOpen(false);
                setCurrentProduct(null);
                fetchProducts();
            } else {
                const error = await response.json();
                console.error('Erreur:', error);
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
    };

    // Supprimer un produit
    const deleteProduct = async (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            try {
                const response = await fetch(`/api/products?id=${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    fetchProducts();
                }
            } catch (error) {
                console.error('Erreur lors de la suppression du produit:', error);
            }
        }
    };

    // Éditer un produit
    const editProduct = (product: Product) => {
        setCurrentProduct(product);
        reset({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            imageUrl: product.imageUrl,
        });
        setIsOpen(true);
    };

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Gestion des Produits</h1>

                <Dialog open={isOpen} onOpenChange={(open) => {
                    setIsOpen(open);
                    if (!open) {
                        setCurrentProduct(null);
                        reset();
                    }
                }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter un produit
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>
                                {currentProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
                            </DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nom</Label>
                                    <Input id="name" {...register('name')} />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Input id="description" {...register('description')} />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="price">Prix</Label>
                                        <Input id="price" type="number" step="0.01" {...register('price')} />
                                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="stock">Stock</Label>
                                        <Input id="stock" type="number" {...register('stock')} />
                                        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="imageUrl">URL de l'image</Label>
                                    <Input id="imageUrl" {...register('imageUrl')} />
                                    {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit">
                                    {currentProduct ? 'Mettre à jour' : 'Créer'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Separator className="my-6" />

            {isLoading ? (
                <div className="text-center py-10">Chargement...</div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Prix</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    Aucun produit trouvé
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        {product.imageUrl ? (
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="h-10 w-10 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                                                No img
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell className="max-w-xs truncate">{product.description}</TableCell>
                                    <TableCell>{product.price.toFixed(2)} €</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => editProduct(product)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => deleteProduct(product.id)}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}