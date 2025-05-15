import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore, CartItem } from "@/types/cart";
import { Product } from "@/types/product";

// Estado inicial
const initialState = {
  items: [] as CartItem[],
  isOpen: false,
};

// Store
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      ...initialState,

      // Ações
      addItem: (product: Product, notes?: string) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) =>
            item.productId === String(product.id) && item.notes === notes
        );

        if (existingItem) {
          // Se o item já existe com as mesmas observações, aumenta a quantidade
          set({
            items: currentItems.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Se é um item novo ou com observações diferentes, adiciona ao carrinho
          set({
            items: [
              ...currentItems,
              {
                id: String(product.id),
                productId: String(product.id),
                name: product.name,
                price: product.price,
                quantity: 1,
                notes: notes || "",
                imageUrl: product.image_url ?? undefined,
              },
            ],
          });
        }
      },

      removeItem: (itemId: string) => {
        set({
          items: get().items.filter((item) => item.id !== itemId),
        });
      },

      updateItemQuantity: (itemId: string, quantity: number) => {
        if (quantity < 1) return;

        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      updateItemNotes: (itemId: string, notes: string) => {
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, notes } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      // Computed
      get totalItems() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      get totalPrice() {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage", // nome para o localStorage
    }
  )
);
