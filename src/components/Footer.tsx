import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-white shadow-md mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:flex md:justify-around">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#FF6B6B]">
              Menu de Sobremesas
            </h3>
            <p className="text-gray-600 md:max-w-xl">
              Experimente nossos deliciosos produtos, feitos com ingredientes
              selecionados e preparados com muito carinho.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#FF6B6B] flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="text-[#FF6B6B]" />
              Horário de funcionamento
            </h4>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <strong>Segunda a Sexta-feira:</strong>
                <span>10:00 - 22:00</span>
              </div>
              <div className="flex justify-between">
                <strong>Horário de almoço:</strong>
                <span>12:00 - 14:00</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#FF6B6B]">Contato</h4>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPhone} className="text-[#FF6B6B]" />
                (99) 99999-9999
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#FF6B6B]" />
                contato@cardapiodigital.com
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-[#FF6B6B]"
                />
                Rua dos constituinte, nº 0
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Cardápio Digital. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
