import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

interface PixInfoProps {
  pixKey: string;
}

export const PixInfo = ({ pixKey }: PixInfoProps) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-xl">
      <p className="text-sm text-gray-600 mb-3 font-medium">Chave Pix:</p>
      <div className="flex items-center justify-between">
        <span className="text-sm p-3 text-gray-600 bg-white rounded-lg border border-gray-200 font-mono">
          {pixKey}
        </span>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(pixKey)}
          className="bg-pink-50 text-pink-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-100 transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faCopy} className="w-4 h-4" /> Copiar
        </button>
      </div>
    </div>
  );
};
