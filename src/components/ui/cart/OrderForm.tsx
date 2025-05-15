import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faMapMarkerAlt, faMoneyBill, faCreditCard, faQrcode, faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import type { CartItem, PaymentMethod as GlobalPaymentMethod } from '@/types/cart';

// Copiar estes tipos de Cart.tsx por enquanto, ou movê-los para um arquivo de tipos compartilhado se forem usados em mais lugares
type PaymentDetails = {
  changeNeeded: boolean;
  changeAmount: number | null;
};

// O OrderDetails completo, que será o "resultado" deste formulário
export type OrderFormData = {
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  orderType: 'entrega' | 'retirada';
  paymentMethod: GlobalPaymentMethod;
  paymentDetails: PaymentDetails;
};

type OrderFormProps = {
  items: CartItem[]; // Necessário para validação e para o total
  total: number;
  isBusinessOpen: boolean;
  onSubmit: (formData: OrderFormData) => Promise<void>; // Função que lida com a submissão (chamada ao Supabase, etc.)
  isSubmitting: boolean; // Para controlar o estado do botão de submit
};

const OrderForm: React.FC<OrderFormProps> = ({ items, total, isBusinessOpen, onSubmit, isSubmitting }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [tipoPedido, setTipoPedido] = useState<'entrega' | 'retirada'>('entrega');
  const [paymentMethod, setPaymentMethod] = useState<GlobalPaymentMethod>('DINHEIRO');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    changeNeeded: false,
    changeAmount: null,
  });

  // Handlers de mudança e validação (copiados de Cart.tsx e adaptados)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value);
  };

  const handleNeedChangeToggle = (needed: boolean) => {
    setPaymentDetails((prev) => ({
      ...prev,
      changeNeeded: needed,
      changeAmount: needed ? total : null, // Ajustar para o total recebido por props
    }));
  };

  const handleChangeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    const amount = value ? parseFloat(value) : null;
    setPaymentDetails((prev) => ({ ...prev, changeAmount: amount }));
  };

  const handleChangeAmountBlur = () => {
    if (paymentDetails.changeAmount === null || paymentDetails.changeAmount < total) {
      setPaymentDetails((prev) => ({ ...prev, changeAmount: total }));
    }
  };

  const handleIncrementChange = () => {
    setPaymentDetails((prev) => {
      let currentAmount: number = 0;
      if (prev.changeAmount !== null) {
        currentAmount = prev.changeAmount!;
      }
      return {
        ...prev,
        changeAmount: currentAmount + 1,
      };
    });
  };

  const handleDecrementChange = () => {
    if (paymentDetails.changeAmount && paymentDetails.changeAmount > total) {
      setPaymentDetails((prev) => ({
        ...prev,
        changeAmount: prev.changeAmount! - 1,
      }));
    }
  };

  const isFormValid = () => {
    if (items.length === 0) return false;
    if (!name.trim()) return false;
    if (tipoPedido === 'entrega' && (!phone.trim() || !address.trim())) return false;
    if (paymentMethod === 'DINHEIRO' && paymentDetails.changeNeeded && (paymentDetails.changeAmount === null || paymentDetails.changeAmount < total)) return false;
    return true;
  };
  
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir o submit padrão do formulário se envolvermos em <form>
    if (!isFormValid() || !isBusinessOpen || isSubmitting) return;

    onSubmit({
      customerName: name,
      customerPhone: tipoPedido === 'entrega' ? phone : undefined,
      customerAddress: tipoPedido === 'entrega' ? address : undefined,
      orderType: tipoPedido,
      paymentMethod: paymentMethod,
      paymentDetails: paymentDetails,
    });
  };

  // O JSX do formulário será copiado de Cart.tsx para cá.
  return (
    <form onSubmit={handleSubmitForm}> {/* Adicionado <form> para semântica e submit */}
      <div className="space-y-4 mb-6">
        {/* Nome */}
        <div className="relative">
          <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-sm bg-white/50"
            required
          />
          {name.trim() === "" && ( // Exemplo de validação inline simples
            <p className="text-red-500 text-xs mt-1">Nome é obrigatório</p>
          )}
        </div>

        {/* Tipo de Pedido */}
        <div className="flex gap-3 mb-4">
          <button
            type="button" // Evitar submit do formulário
            onClick={() => setTipoPedido("entrega")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
              tipoPedido === "entrega"
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Entrega
          </button>
          <button
            type="button" // Evitar submit do formulário
            onClick={() => setTipoPedido("retirada")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
              tipoPedido === "retirada"
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Retirada
          </button>
        </div>

        {/* Campos de Entrega */}
        {tipoPedido === "entrega" && (
          <>
            <div className="relative">
              <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                placeholder="DDD + número do WhatsApp"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-sm bg-white/50"
                required={tipoPedido === "entrega"}
                maxLength={13}
              />
               {tipoPedido === "entrega" && phone.trim() === "" && (
                <p className="text-red-500 text-xs mt-1">Telefone é obrigatório para entrega</p>
              )}
            </div>
            <div className="relative">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rua, Número, Bairro, Ponto de referência"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-sm bg-white/50"
                required={tipoPedido === "entrega"}
              />
              {tipoPedido === "entrega" && address.trim() === "" && (
                <p className="text-red-500 text-xs mt-1">Endereço é obrigatório para entrega</p>
              )}
            </div>
          </>
        )}

        {/* Métodos de Pagamento */}
        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={() => setPaymentMethod("DINHEIRO")} className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${paymentMethod === "DINHEIRO" ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            <FontAwesomeIcon icon={faMoneyBill} className="w-4 h-4" /> Dinheiro
          </button>
          <button type="button" onClick={() => setPaymentMethod("CARTAO_CREDITO")} className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${paymentMethod === "CARTAO_CREDITO" ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4" /> Crédito
          </button>
          <button type="button" onClick={() => setPaymentMethod("CARTAO_DEBITO")} className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${paymentMethod === "CARTAO_DEBITO" ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4" /> Débito
          </button>
          <button type="button" onClick={() => setPaymentMethod("PIX")} className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${paymentMethod === "PIX" ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            <FontAwesomeIcon icon={faQrcode} className="w-4 h-4" /> Pix
          </button>
        </div>
      </div>

      {/* Detalhes do Pagamento PIX */}
      {paymentMethod === "PIX" && (
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600 mb-3 font-medium">Chave Pix:</p>
          <div className="flex items-center justify-between">
            <span className="text-sm p-3 text-gray-600 bg-white rounded-lg border border-gray-200 font-mono">
              5511999999999 {/* Substituir pela chave real ou variável */}
            </span>
            <button type="button" onClick={() => navigator.clipboard.writeText('5511999999999')} className="bg-pink-50 text-pink-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-100 transition-colors flex items-center gap-2">
              <FontAwesomeIcon icon={faCopy} className="w-4 h-4" /> Copiar
            </button>
          </div>
        </div>
      )}

      {/* Detalhes do Pagamento Dinheiro (Troco) */}
      {paymentMethod === "DINHEIRO" && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <button type="button" onClick={() => handleNeedChangeToggle(true)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${paymentDetails.changeNeeded ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              Preciso de troco
            </button>
            <button type="button" onClick={() => handleNeedChangeToggle(false)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!paymentDetails.changeNeeded ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              Não preciso de troco
            </button>
          </div>
          {paymentDetails.changeNeeded && (
            <div className="mb-4 py-4">
              <label className="block mb-2 font-medium text-gray-700">Para quanto?</label>
              <div className="flex items-center gap-2">
                <button type="button" onClick={handleDecrementChange} className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors" aria-label="Diminuir valor">
                  <FontAwesomeIcon icon={faMinus} className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  inputMode="decimal"
                  value={paymentDetails.changeAmount !== null ? paymentDetails.changeAmount.toString().replace('.', ',') : ''}
                  onChange={handleChangeAmountChange}
                  onBlur={handleChangeAmountBlur}
                  placeholder={`Valor mínimo: R$ ${total.toFixed(2)}`}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-sm bg-white/50"
                />
                <button type="button" onClick={handleIncrementChange} className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors" aria-label="Aumentar valor">
                  <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                </button>
              </div>
              {paymentDetails.changeAmount && paymentDetails.changeAmount >= total && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600">
                    Troco para: {paymentDetails.changeAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-gray-600">
                    Valor do troco: {(paymentDetails.changeAmount - total).toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Total e Botão de Finalizar */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-lg text-gray-800">Total:</span>
          <span className="font-bold text-2xl text-pink-600">
            {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </span>
        </div>
        <button
          type="submit" // Botão de submit do formulário
          disabled={isSubmitting || !isFormValid() || !isBusinessOpen}
          className={`w-full py-4 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium ${
            isSubmitting || !isFormValid() || !isBusinessOpen
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
    </form>
  );
};

export default OrderForm; 