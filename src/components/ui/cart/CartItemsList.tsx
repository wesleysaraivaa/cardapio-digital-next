import React from "react";
import type { CartItem } from "@/types/cart";
import CartItemCard from "./CartItemCard";

type CartItemsListProps = {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onUpdateNotes: (itemId: string, newNotes: string) => void;
};

const CartItemsList = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateNotes,
}: CartItemsListProps) => {
  return (
    <div className="space-y-3 mb-6">
      {items.map((item) => (
        <CartItemCard
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
          onUpdateNotes={onUpdateNotes}
        />
      ))}
    </div>
  );
};

export default CartItemsList;
