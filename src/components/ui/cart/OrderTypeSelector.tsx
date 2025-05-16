type OrderType = "entrega" | "retirada";

interface OrderTypeSelectorProps {
  selectedType: OrderType;
  onTypeSelect: (type: OrderType) => void;
}

const OrderTypeSelector = ({
  selectedType,
  onTypeSelect,
}: OrderTypeSelectorProps) => {
  return (
    <div className="flex gap-3 mb-4">
      <button
        type="button"
        onClick={() => onTypeSelect("entrega")}
        className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
          selectedType === "entrega"
            ? "bg-pink-500 text-white hover:bg-pink-600"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        Entrega
      </button>
      <button
        type="button"
        onClick={() => onTypeSelect("retirada")}
        className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
          selectedType === "retirada"
            ? "bg-pink-500 text-white hover:bg-pink-600"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        Retirada
      </button>
    </div>
  );
};

export default OrderTypeSelector;
