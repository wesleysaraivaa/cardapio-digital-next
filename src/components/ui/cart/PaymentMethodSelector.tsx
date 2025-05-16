import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faCreditCard,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";

import type { PaymentMethod } from "@/types/cart";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodSelect: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector = ({
  selectedMethod,
  onMethodSelect,
}: PaymentMethodSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => onMethodSelect("DINHEIRO")}
        className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
          selectedMethod === "DINHEIRO"
            ? "bg-pink-500 text-white hover:bg-pink-600"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        <FontAwesomeIcon icon={faMoneyBill} className="w-4 h-4" /> Dinheiro
      </button>
      <button
        type="button"
        onClick={() => onMethodSelect("CARTAO_CREDITO")}
        className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
          selectedMethod === "CARTAO_CREDITO"
            ? "bg-pink-500 text-white hover:bg-pink-600"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4" /> Crédito
      </button>
      <button
        type="button"
        onClick={() => onMethodSelect("CARTAO_DEBITO")}
        className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
          selectedMethod === "CARTAO_DEBITO"
            ? "bg-pink-500 text-white hover:bg-pink-600"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4" /> Débito
      </button>
      <button
        type="button"
        onClick={() => onMethodSelect("PIX")}
        className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
          selectedMethod === "PIX"
            ? "bg-pink-500 text-white hover:bg-pink-600"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        <FontAwesomeIcon icon={faQrcode} className="w-4 h-4" /> Pix
      </button>
    </div>
  );
};
