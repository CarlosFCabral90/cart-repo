export interface Product {
    price: number;
    name: string;
    id: string;
};

export interface CartItem extends Product {
    quantity: number
};