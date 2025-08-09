import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const productsArray = [
  { id: "1", name: "Producto 1", price: 60 },
  { id: "2", name: "Producto 2", price: 100 },
  { id: "3", name: "Producto 3", price: 120 },
  { id: "4", name: "Producto 4", price: 70 }
];