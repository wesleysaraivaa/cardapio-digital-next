"use client";

import React, { memo } from "react";
import Image from "next/image";
import { ProductListProps, Product } from "@/types/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useCart } from "@/hooks/useCart";

const ProductList = memo(({ products = [] }: ProductListProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
        >
          <div className="relative w-full h-48">
            <Image
              src={product.image_url || "/images/placeholder.jpg"}
              alt={product.name}
              fill
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 mt-2 flex-grow">
              {product.description || "Sem descrição disponível"}
            </p>
            <div className="flex items-center justify-between mt-4">
              <p className="font-bold text-xl text-pink-600">
                R$ {product.price.toFixed(2)}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FontAwesomeIcon icon={faCartPlus} className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

ProductList.displayName = "ProductList";

export default ProductList;
