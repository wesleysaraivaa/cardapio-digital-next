import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

interface DeliveryInfoFormProps {
  phone: string;
  address: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDelivery: boolean;
}

export const DeliveryInfoForm: React.FC<DeliveryInfoFormProps> = ({
  phone,
  address,
  onPhoneChange,
  onAddressChange,
  isDelivery,
}) => {
  if (!isDelivery) return null;

  return (
    <>
      <div className="relative">
        <FontAwesomeIcon
          icon={faPhone}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="tel"
          placeholder="DDD + número do WhatsApp"
          value={phone}
          onChange={onPhoneChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-sm bg-white/50"
          required
          maxLength={13}
        />
        {phone.trim() === "" && (
          <p className="text-red-500 text-xs mt-1">
            Telefone é obrigatório para entrega
          </p>
        )}
      </div>
      <div className="relative">
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Rua, Número, Bairro, Ponto de referência"
          value={address}
          onChange={onAddressChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-sm bg-white/50"
          required
        />
        {address.trim() === "" && (
          <p className="text-red-500 text-xs mt-1">
            Endereço é obrigatório para entrega
          </p>
        )}
      </div>
    </>
  );
};
