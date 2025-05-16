import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

interface ChangeCalculatorProps {
  isChangeNeeded: boolean;
  changeAmount: number | null;
  total: number;
  onChangeNeededToggle: (needed: boolean) => void;
  onChangeAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAmountBlur: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const ChangeCalculator = ({
  isChangeNeeded,
  changeAmount,
  total,
  onChangeNeededToggle,
  onChangeAmountChange,
  onChangeAmountBlur,
  onIncrement,
  onDecrement,
}: ChangeCalculatorProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={() => onChangeNeededToggle(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isChangeNeeded
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Preciso de troco
        </button>
        <button
          type="button"
          onClick={() => onChangeNeededToggle(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !isChangeNeeded
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Não preciso de troco
        </button>
      </div>
      {isChangeNeeded && (
        <div className="mb-4 py-4">
          <label className="block mb-2 font-medium text-gray-700">
            Para quanto?
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDecrement}
              className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Diminuir valor"
            >
              <FontAwesomeIcon icon={faMinus} className="w-4 h-4" />
            </button>
            <input
              type="text"
              inputMode="decimal"
              value={
                changeAmount !== null
                  ? changeAmount.toString().replace(".", ",")
                  : ""
              }
              onChange={onChangeAmountChange}
              onBlur={onChangeAmountBlur}
              placeholder={`Valor mínimo: R$ ${total.toFixed(2)}`}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-sm bg-white/50"
            />
            <button
              type="button"
              onClick={onIncrement}
              className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Aumentar valor"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
