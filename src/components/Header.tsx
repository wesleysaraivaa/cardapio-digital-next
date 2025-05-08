import { getBusinessStatus, getBusinessHours } from "@/lib/businessHours";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { isOpen, message } = getBusinessStatus();
  const businessHours = getBusinessHours();

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faUtensils}
              className="text-[#FF6B6B]"
              width={24}
              height={24}
            />
            <h1 className="text-2xl font-bold text-[#FF6B6B]">
              Cardápio Digital
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2 text-sm">
            <div
              className={`px-3 py-1 rounded-full ${
                isOpen
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
            <div className="text-gray-600">
              Horário de funcionamento: {businessHours}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
