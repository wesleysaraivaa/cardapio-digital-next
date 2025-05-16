import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type CartHeaderProps = {
  onClose: () => void;
  title?: string;
};

const CartHeader = ({ onClose, title = "Seu Pedido" }: CartHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
        aria-label="Fechar carrinho"
      >
        <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CartHeader;
