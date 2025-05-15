"use client";

import React, { useState } from "react";
import { useCartStore } from "@/app/store/cartStore";
import type { CartItem } from "@/types/cart";
import { supabase } from "@/lib/supabase";
import { getBusinessStatus } from "@/lib/businessHours";
import CartHeader from "@/components/ui/cart/CartHeader";
import BusinessStatusAlert from "@/components/ui/cart/BusinessStatusAlert";
import EmptyCartMessage from "@/components/ui/cart/EmptyCartMessage";
import CartItemsList from "@/components/ui/cart/CartItemsList";
import OrderForm, { type OrderFormData } from "@/components/ui/cart/OrderForm";

type CartProps = {
  onClose: () => void;
};

export default function Cart({ onClose }: CartProps) {
  const { items, updateItemQuantity, removeItem, updateItemNotes, clearCart } =
    useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const businessStatus = getBusinessStatus();
  const isBusinessOpen = businessStatus.isOpen;

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatWhatsAppMessage = (
    orderDetails: OrderFormData & { items: CartItem[]; total: number }
  ) => {
    let message = `*NOVO PEDIDO*\n\n`;
    message += `*Cliente:* ${orderDetails.customerName}\n`;
    if (orderDetails.orderType === "entrega") {
      message += `*Telefone:* ${orderDetails.customerPhone}\n`;
      message += `*Endereço:* ${orderDetails.customerAddress}\n`;
    }
    message += `\n*Tipo:* ${
      orderDetails.orderType === "entrega" ? "Entrega" : "Retirada"
    }\n`;
    message += `\n*Itens:*\n`;
    orderDetails.items.forEach((item: CartItem) => {
      message += `• ${item.quantity}x ${item.name}`;
      if (item.notes) {
        message += ` (Obs: ${item.notes})`;
      }
      message += ` - R$ ${(item.price * item.quantity).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}\n`;
    });
    message += `\n*Total:* R$ ${orderDetails.total.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}\n`;

    let paymentMethodText = "";
    switch (orderDetails.paymentMethod) {
      case "DINHEIRO":
        paymentMethodText = "Dinheiro";
        break;
      case "CARTAO_CREDITO":
        paymentMethodText = "Cartão de Crédito";
        break;
      case "CARTAO_DEBITO":
        paymentMethodText = "Cartão de Débito";
        break;
      case "PIX":
        paymentMethodText = "Pix";
        break;
      default:
        paymentMethodText = orderDetails.paymentMethod;
    }
    message += `*Pagamento:* ${paymentMethodText}`;

    if (
      orderDetails.paymentMethod === "DINHEIRO" &&
      orderDetails.paymentDetails.changeNeeded
    ) {
      message += `\n*Troco para:* R$ ${orderDetails.paymentDetails.changeAmount?.toLocaleString(
        "pt-BR",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )}`;
    }
    message += `\n\n*Por favor, confirme o pedido!*`;
    return message;
  };

  const handleFinalSubmit = async (formData: OrderFormData) => {
    setIsSubmitting(true);
    try {
      const fullOrderDetails = {
        ...formData,
        items,
        total,
      };
      const whatsappMessage = formatWhatsAppMessage(fullOrderDetails);

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            customer_name: formData.customerName,
            address:
              formData.orderType === "entrega"
                ? formData.customerAddress
                : null,
            phone:
              formData.orderType === "entrega" ? formData.customerPhone : null,
            total,
            payment_method: formData.paymentMethod,
            order_type: formData.orderType.toUpperCase(),
            status: "PENDENTE",
            notes: "",
            change_amount:
              formData.paymentMethod === "DINHEIRO" &&
              formData.paymentDetails.changeNeeded
                ? formData.paymentDetails.changeAmount
                : null,
            whatsapp_message: whatsappMessage,
          },
        ])
        .select()
        .single();

      if (orderError) {
        console.error("Erro ao salvar pedido:", orderError);
        setIsSubmitting(false);
        return;
      }

      const orderId = orderData.id;
      const itemsToInsert = items.map((item) => ({
        order_id: orderId,
        product_id: item.id,
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity,
        notes: item.notes || "",
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(itemsToInsert);

      if (itemsError) {
        console.error("Erro ao salvar itens do pedido:", itemsError);
        setIsSubmitting(false);
        return;
      }

      const whatsappUrl = `https://wa.me/5588997130026?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappUrl, "_blank");
      clearCart();
      onClose();
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white/95 p-4 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <CartHeader onClose={onClose} />
        <BusinessStatusAlert isOpen={isBusinessOpen} />

        {items.length === 0 ? (
          <EmptyCartMessage />
        ) : (
          <>
            <CartItemsList
              items={items}
              onUpdateQuantity={updateItemQuantity}
              onRemoveItem={removeItem}
              onUpdateNotes={updateItemNotes}
            />
            <OrderForm
              items={items}
              total={total}
              isBusinessOpen={isBusinessOpen}
              onSubmit={handleFinalSubmit}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </div>
    </div>
  );
}
