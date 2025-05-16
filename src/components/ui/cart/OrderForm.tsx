import React, { useState } from "react";

import type { CartItem, PaymentMethod } from "@/types/cart";

import CustomerInfoForm from "./CustomerInfoForm";
import OrderTypeSelector from "./OrderTypeSelector";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { ChangeCalculator } from "./ChangeCalculator";
import { PixInfo } from "./PixInfo";
import OrderSummary from "./OrderSummary";

// O OrderDetails completo, que será o "resultado" deste formulário
export type OrderFormData = {
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  orderType: "entrega" | "retirada";
  paymentMethod: PaymentMethod;
  paymentDetails: {
    changeNeeded: boolean;
    changeAmount: number | null;
  };
};

type OrderFormProps = {
  items: CartItem[];
  total: number;
  isBusinessOpen: boolean;
  onSubmit: (formData: OrderFormData) => Promise<void>;
  isSubmitting: boolean;
};

const OrderForm = ({
  items,
  total,
  isBusinessOpen,
  onSubmit,
  isSubmitting,
}: OrderFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderType, setOrderType] = useState<"entrega" | "retirada">("entrega");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("DINHEIRO");
  const [paymentDetails, setPaymentDetails] = useState({
    changeNeeded: false,
    changeAmount: null as number | null,
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value);
  };

  const handleNeedChangeToggle = (needed: boolean) => {
    setPaymentDetails((prev) => ({
      ...prev,
      changeNeeded: needed,
      changeAmount: needed ? total : null,
    }));
  };

  const handleChangeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.,]/g, "").replace(",", ".");
    const amount = value ? parseFloat(value) : null;
    setPaymentDetails((prev) => ({ ...prev, changeAmount: amount }));
  };

  const handleChangeAmountBlur = () => {
    if (
      paymentDetails.changeAmount === null ||
      paymentDetails.changeAmount < total
    ) {
      setPaymentDetails((prev) => ({ ...prev, changeAmount: total }));
    }
  };

  const handleIncrementChange = () => {
    setPaymentDetails((prev) => ({
      ...prev,
      changeAmount: (prev.changeAmount || 0) + 1,
    }));
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
    if (orderType === "entrega" && (!phone.trim() || !address.trim()))
      return false;
    if (
      paymentMethod === "DINHEIRO" &&
      paymentDetails.changeNeeded &&
      (paymentDetails.changeAmount === null ||
        paymentDetails.changeAmount < total)
    )
      return false;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid() || !isBusinessOpen || isSubmitting) return;

    onSubmit({
      customerName: name,
      customerPhone: orderType === "entrega" ? phone : undefined,
      customerAddress: orderType === "entrega" ? address : undefined,
      orderType,
      paymentMethod,
      paymentDetails,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CustomerInfoForm
        name={name}
        phone={phone}
        address={address}
        isDelivery={orderType === "entrega"}
        onNameChange={(e) => setName(e.target.value)}
        onPhoneChange={handlePhoneChange}
        onAddressChange={(e) => setAddress(e.target.value)}
      />

      <OrderTypeSelector selectedType={orderType} onTypeSelect={setOrderType} />

      <PaymentMethodSelector
        selectedMethod={paymentMethod}
        onMethodSelect={setPaymentMethod}
      />

      {paymentMethod === "PIX" && <PixInfo pixKey="5511999999999" />}

      {paymentMethod === "DINHEIRO" && (
        <ChangeCalculator
          isChangeNeeded={paymentDetails.changeNeeded}
          changeAmount={paymentDetails.changeAmount}
          total={total}
          onChangeNeededToggle={handleNeedChangeToggle}
          onChangeAmountChange={handleChangeAmountChange}
          onChangeAmountBlur={handleChangeAmountBlur}
          onIncrement={handleIncrementChange}
          onDecrement={handleDecrementChange}
        />
      )}

      <OrderSummary
        total={total}
        isSubmitting={isSubmitting}
        isFormValid={isFormValid()}
        isBusinessOpen={isBusinessOpen}
      />
    </form>
  );
};

export default OrderForm;
