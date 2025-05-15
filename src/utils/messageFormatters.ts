import { CartItem } from "@/types/cart";
import { OrderFormData } from "@/components/ui/cart/OrderForm";

export const formatWhatsAppMessage = (
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
