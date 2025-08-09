
"use client";

import { useState } from "react";

import { toast } from "sonner";
import Image from "next/image";

// Components
import { Button } from "./ui/button";
import {
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Card,
} from "./ui/card";

// Icons
import { Loader2, ShoppingCart } from "lucide-react";

// Interface
import { Product } from "@/interfaces/products.interface";
import { urlBack } from "@/helpers";

export const ProductComponent = ({ price, name, id }: Product) => {

    const [addingToCart, setAddingToCart] = useState<string | null>(null);

    const addToCart = async (product: Product) => {
        try {
            setAddingToCart(product.id);

            const response = await fetch(`${urlBack}/cart/${product.id}`, {
                method: 'POST',
            });
        
            const data = await response.json();
        
            if (data.success) {
                toast.success("¡Producto agregado!");
            } else {
                toast.error("No se pudo agregar el producto al carrito");
            };
            
        } catch (error) {
            toast.error("Error de conexión al agregar producto");
            console.log("Error --> ", error);
        } finally {
            setAddingToCart(null)
        }
    }

    return (
        <Card key={id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="aspect-square relative">
                    <Image
                        className="object-cover"
                        src="/placeholder.svg"
                        alt={name}
                        fill
                    />
                </div>
            </CardHeader>
            <CardContent>
                <CardTitle className="text-lg mb-2">{name}</CardTitle>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                        ${price}
                    </span>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() => addToCart({ price, name, id })}
                    className="w-full cursor-pointer"
                    disabled={addingToCart === id}
                >
                    {addingToCart === id ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Agregando...
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Agregar al Carrito
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
};
