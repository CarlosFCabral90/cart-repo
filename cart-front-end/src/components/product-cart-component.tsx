"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

// Components
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import {
    SheetDescription,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    Sheet,
} from "./ui/sheet";

// Icons
import { Loader2, ShoppingCart } from "lucide-react";

// Helpers
import { urlBack } from "@/helpers";

// Interface
import { CartItem } from "@/interfaces/products.interface";

export const ProductCartComponent = () => {

    const [isLoadingCart, setIsLoadingCart] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        if (isCartOpen) {
            fetchCart();
        };
    }, [isCartOpen]);

    const fetchCart = async () => {
        try {
            setIsLoadingCart(true);

            const response = await fetch(`${urlBack}/cart`);
            const data = await response.json();
            
            if (data.success) {
                setCart(data.cart);
            } else {
                toast.error("No se pudo cargar el carrito");
            }
        } catch (error) {
            toast.error("Error de conexión al cargar carrito");
            console.log('Error --> ', error);
        } finally {
            setIsLoadingCart(false);
        };
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0)
    };

    return (
        <div className="fixed flex bg-white z-50 top-0 left-0 w-full justify-between items-center h-16 px-10 xl:px-20">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    Cart App
                </h1>
            </div>
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                    <>
                        <Button 
                            onClick={() => setIsCartOpen(true)}
                            className="relative cursor-pointer"
                            variant="outline"
                            size="sm"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            <span className="ml-2">Carrito</span>
                            {
                                getTotalItems() > 0 && (
                                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                        {getTotalItems()}
                                    </Badge>
                            )}
                        </Button>
                    </>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Carrito de Compras</SheetTitle>
                        <SheetDescription>
                            {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'} en tu carrito
                        </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4 p-6 overflow-auto">
                        {
                            isLoadingCart ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                    <span className="ml-2">Cargando carrito...</span>
                                </div>
                            ) : cart.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">
                                    Tu carrito está vacío
                                </p>
                            ) : (
                                <>
                                    {
                                        cart.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg border">
                                                <Image
                                                    className="rounded-md object-cover"
                                                    src="/placeholder.svg"
                                                    alt={item.name}
                                                    height={60}
                                                    width={60}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">${item.price}</p>
                                                </div>
                                            </div>
                                    ))}
                                    <Separator />
                                    <div className="space-y-2">
                                        <Button
                                            className="w-full cursor-pointer"
                                            disabled={isLoadingCart}
                                            size="lg"
                                        >
                                            Continuar al Pago
                                        </Button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};
