"use client";

import { useState } from "react";
import { useCart } from "@/app/hooks/useCart";
import Cart from "@/components/containers/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function CartButton() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-all transform hover:scale-105 active:scale-95 z-40 group"
        aria-label="Abrir carrinho"
      >
        <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md group-hover:bg-red-600 transition-colors">
            {totalItems}
          </span>
        )}
      </button>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </>
  );
}
