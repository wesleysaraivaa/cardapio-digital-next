import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

interface OrderSummaryProps {
  total: number;
  isSubmitting: boolean;
  isFormValid: boolean;
  isBusinessOpen: boolean;
}

const OrderSummary = ({
  total,
  isSubmitting,
  isFormValid,
  isBusinessOpen,
}: OrderSummaryProps) => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="flex justify-between items-center mb-6">
        <span className="font-bold text-lg text-gray-800">Total:</span>
        <span className="font-bold text-2xl text-pink-600">
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !isFormValid || !isBusinessOpen}
        className={`w-full py-4 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium ${
          isSubmitting || !isFormValid || !isBusinessOpen
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        {isSubmitting ? (
          <span>Processando...</span>
        ) : (
          <>
            <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
            <span>Finalizar Pedido</span>
          </>
        )}
      </button>
    </div>
  );
};

export default OrderSummary;
