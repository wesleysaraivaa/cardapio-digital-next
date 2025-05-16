"use client";

import { useCartStore } from "@/store/cartStore";

import type { Product } from "@/types/product";

export function useCart() {
  const {
    items,
    addItem,
    removeItem,
    updateItemQuantity: storeUpdateItemQuantity,
    updateItemNotes: storeUpdateItemNotes,
    clearCart,
  } = useCartStore();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const addToCart = (product: Product, notes?: string) => {
    addItem(product, notes);
  };

  const removeFromCart = (id: string) => {
    removeItem(id);
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    storeUpdateItemQuantity(id, quantity);
  };

  const updateItemObservation = (id: string, observation: string) => {
    storeUpdateItemNotes(id, observation);
  };

  return {
    items,
    total,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    updateItemObservation,
    clearCart,
  };
}
