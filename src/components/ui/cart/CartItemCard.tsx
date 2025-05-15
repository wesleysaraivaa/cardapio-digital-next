import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import type { CartItem } from '@/types/cart'; // Importar o tipo CartItem

type CartItemCardProps = {
  item: CartItem;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onUpdateNotes: (itemId: string, newNotes: string) => void;
};

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateNotes,
}) => {
  const handleQuantityIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    } else {
      onRemoveItem(item.id); // Remover se a quantidade for menor que 1
    }
  };

  return (
    <div
      key={item.id} // key pode ser movida para o map no componente pai
      className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <span className="text-sm text-gray-500">
              {item.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <div className="mt-2">
            <textarea
              placeholder="Observação (ex: Sem cebola)"
              value={item.notes || ''}
              onChange={(e) => onUpdateNotes(item.id, e.target.value)}
              className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none bg-white/50"
              rows={2}
            />
          </div>
          <p className="font-medium mt-2 text-pink-600">
            {(item.price * item.quantity).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
        <div className="flex items-center gap-3 ml-4">
          <button
            onClick={handleQuantityIncrease}
            className="text-green-600 hover:text-green-700 transition-colors p-2 hover:bg-green-50 rounded-full"
            aria-label="Aumentar quantidade"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={handleQuantityDecrease}
            className="text-red-600 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-full"
            aria-label="Diminuir quantidade"
          >
            <FontAwesomeIcon icon={faMinus} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard; 