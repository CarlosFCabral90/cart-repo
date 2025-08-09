import { Product } from "@/interfaces/products.interface";

export const urlBack = process.env.NEXT_PUBLIC_API_URL;

interface Props {
    products: Product[];
    budget: number;
};

export function findBestCombination({ products, budget }: Props) {
    let bestCombo: Product[] = [];
    let bestSum = 0;

    const totalCombos = 1 << products.length;

    for (let i = 0; i < totalCombos; i++) {
        const combo = [];
        let sum = 0;

        for (let j = 0; j < products.length; j++) {
            if (i & (1 << j)) {
                sum += products[j].price;
                combo.push(products[j]);
            }
        };

        if (sum <= budget && sum > bestSum) {
            bestSum = sum;
            bestCombo = combo;
        };
    };

    return bestCombo;
};