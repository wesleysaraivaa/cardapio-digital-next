import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { CartItem } from "@/types/cart";
import { OrderFormData } from "@/components/ui/cart/OrderForm";
import { formatWhatsAppMessage } from "@/utils/messageFormatters";

export const useOrderSubmission = (
  items: CartItem[],
  total: number,
  clearCart: () => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitOrder = async (formData: OrderFormData) => {
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
        return false;
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
        return false;
      }

      const whatsappUrl = `https://wa.me/5588997130026?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappUrl, "_blank");
      clearCart();
      return true;
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitOrder,
    isSubmitting,
  };
};
