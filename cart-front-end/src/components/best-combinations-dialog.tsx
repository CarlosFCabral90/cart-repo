"use client";

import { useState } from "react";

// Components
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
    DialogDescription,
    DialogContent,
    DialogTrigger,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Dialog,
} from "./ui/dialog";

// Helpers
import { findBestCombination } from "@/helpers";

// Interfaces
import { Product } from "@/interfaces/products.interface";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export const BestCombinationsDialog = ({ products }: {products: Product[]}) => {
    const [bestCombo, setBestCombo] = useState<Product[]>([]);
    const [amount, setAmount] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = () => {
        if (amount) {
            const budget = Number.parseFloat(amount);
            const best = findBestCombination({products, budget});
            setBestCombo(best);
        };
    };

    const handleCancel = () => {
        setBestCombo([]);
        setOpen(false);
        setAmount("");
    };

    const formatAmount = (valor: string) => {
        const numeroLimpio = valor.replace(/[^\d.]/g, "");

        const partes = numeroLimpio.split(".");

        if (partes.length > 2) {
            return partes[0] + "." + partes.slice(1).join("");
        };

        return numeroLimpio;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = formatAmount(e.target.value)
        setAmount(value);
    };

    return (
        <div className="flex items-center justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="lg" className="cursor-pointer">
                        Buscar Mejor Combinación
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Ingresar Importe</DialogTitle>
                        <DialogDescription>
                            Ingresa el monto que deseas registrar. El importe debe ser un número válido.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="importe" className="text-sm font-medium">
                                Importe
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 text-lg font-semibold">$</span>
                                </div>
                                <Input
                                    onChange={handleInputChange}
                                    className="pl-8 text-lg"
                                    placeholder="0.00"
                                    value={amount}
                                    id="importe"
                                    type="text"
                                    autoFocus
                                />
                            </div>
                            {amount && (
                                <p className="text-sm text-muted-foreground">
                                    Importe: <span className="font-semibold">${amount}</span>
                                </p>
                            )}
                        </div>
                        <Accordion
                            value={bestCombo.length > 0 ? "best-combo" : ""}
                            onValueChange={() => {}}
                            type="single"
                            collapsible
                        >
                            <AccordionItem value="best-combo">
                                <AccordionTrigger>
                                    Mejor Combinación
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="border-t pt-2">
                                        <ul className="list-disc list-inside text-sm space-y-1">
                                            {bestCombo.map((p) => (
                                                <li key={p.id}>
                                                    {p.name} - ${p.price}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="mt-2 text-sm font-semibold">
                                            Total: ${bestCombo.reduce((acc, p) => acc + p.price, 0)}
                                        </p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button
                            disabled={!amount || Number.parseFloat(amount) <= 0}
                            className="min-w-[100px]"
                            onClick={handleSubmit}
                        >
                            Confirmar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
