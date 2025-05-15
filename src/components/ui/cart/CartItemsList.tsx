import React from 'react';
import type { CartItem } from '@/types/cart';
import CartItemCard from './CartItemCard'; // Importar o CartItemCard

type CartItemsListProps = {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onUpdateNotes: (itemId: string, newNotes: string) => void;
};

const CartItemsList: React.FC<CartItemsListProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateNotes,
}) => {
  return (
    <div className="space-y-3 mb-6">
      {items.map((item) => (
        <CartItemCard
          key={item.id} // A key deve estar aqui no elemento mais externo do map
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