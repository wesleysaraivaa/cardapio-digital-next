"use client";

import React from "react";
import { useCartStore } from "@/store/cartStore";
import { getBusinessStatus } from "@/lib/businessHours";
import { useOrderSubmission } from "@/hooks/useOrderSubmission";

import CartHeader from "@/components/ui/cart/CartHeader";
import BusinessStatusAlert from "@/components/ui/cart/BusinessStatusAlert";
import EmptyCartMessage from "@/components/ui/cart/EmptyCartMessage";
import CartItemsList from "@/components/ui/cart/CartItemsList";
import OrderForm, { type OrderFormData } from "@/components/ui/cart/OrderForm";

import type { CartItem } from "@/types/cart";

type CartProps = {
  onClose: () => void;
};

export default function Cart({ onClose }: CartProps) {
  const { items, updateItemQuantity, removeItem, updateItemNotes, clearCart } =
    useCartStore();

  const businessStatus = getBusinessStatus();
  const isBusinessOpen = businessStatus.isOpen;

  const total = items.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0
  );

  const { submitOrder, isSubmitting } = useOrderSubmission(
    items,
    total,
    clearCart
  );

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (formData: OrderFormData) => {
    const success = await submitOrder(formData);
    if (success) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white/95 p-4 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <CartHeader onClose={onClose} />
        <BusinessStatusAlert isOpen={isBusinessOpen} />

        {items.length === 0 ? (
          <EmptyCartMessage />
        ) : (
          <>
            <CartItemsList
              items={items}
              onUpdateQuantity={updateItemQuantity}
              onRemoveItem={removeItem}
              onUpdateNotes={updateItemNotes}
            />
            <OrderForm
              items={items}
              total={total}
              isBusinessOpen={isBusinessOpen}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </div>
    </div>
  );
}
