"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

// Components
import { BestCombinationsDialog, ProductComponent } from "@/components";

// Helpers
import { urlBack } from "@/helpers";

// Icons
import { Loader2 } from "lucide-react";

// Interface
import { Product } from "@/interfaces/products.interface";

export default function Home() {
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoadingProducts(true)
      const response = await fetch(`${urlBack}/products`);
      const data = await response.json();
      
      if (data.success) {
        console.log('DATA --> ', data);
        
        setProducts(data.products);
      } else {
        toast.error("No se pudieron cargar los productos");
      };
    } catch (error) {
      toast.error("Error de conexión al cargar productos");
      console.log("Error ---> ", error);
    } finally {
      setIsLoadingProducts(false);
    };
  };

  return (
    <div className="font-sans w-full flex flex-col min-h-screen p-8 pb-20 gap-8 sm:p-20">
      <div className="w-full xl:w-3/5 xl:m-auto grid justify-start">
        <BestCombinationsDialog
          products={isLoadingProducts ? [] : products}
        />
      </div>
      <div className="w-full xl:w-3/5 xl:m-auto grid md:grid-cols-3 gap-3">
        {isLoadingProducts ? (
          <div className="flex items-center justify-center py-12 col-span-full">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2 text-lg">
              Cargando productos...
            </span>
          </div>
        ) : (
          products.map(product => (
            <ProductComponent 
              key={product.id}
              {...product}
            />
          ))
        )}
      </div>
    </div>
  );
}
