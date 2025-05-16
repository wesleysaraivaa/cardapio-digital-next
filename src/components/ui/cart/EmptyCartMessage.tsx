import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

type EmptyCartMessageProps = {
  title?: string;
  subtitle?: string;
};

const EmptyCartMessage = ({
  title = "Seu carrinho está vazio",
  subtitle = "Adicione alguns itens para começar",
}: EmptyCartMessageProps) => {
  return (
    <div className="text-center py-12">
      <FontAwesomeIcon
        icon={faShoppingCart}
        className="text-gray-300 text-5xl mb-4"
      />
      <p className="text-gray-500 text-lg">{title}</p>
      <p className="text-gray-400 text-sm mt-2">{subtitle}</p>
    </div>
  );
};

export default EmptyCartMessage;
