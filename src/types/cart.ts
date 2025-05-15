import type { Product } from "./product";

export type OrderType = "RETIRADA" | "ENTREGA";
export type PaymentMethod =
  | "CARTAO_CREDITO"
  | "CARTAO_DEBITO"
  | "DINHEIRO"
  | "PIX";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  imageUrl?: string;
}

export interface CustomerInfo {
  name: string;
  phone?: string;
  address?: string;
  changeAmount?: number;
}

export interface Order {
  id: string;
  type: OrderType;
  paymentMethod: PaymentMethod;
  customerInfo: CustomerInfo;
  items: CartItem[];
  totalPrice: number;
  status: "PENDENTE" | "CONFIRMADO" | "ENTREGUE" | "CANCELADO";
  createdAt: Date;
  updatedAt: Date;
}

// Interface para o estado do carrinho
export interface CartStore {
  // Estado
  items: CartItem[];
  isOpen: boolean; // Para controlar o drawer do carrinho

  // Ações
  addItem: (product: Product, notes?: string) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  updateItemNotes: (itemId: string, notes: string) => void;
  clearCart: () => void;
  toggleCart: () => void;

  totalItems: number;
  totalPrice: number;
}
