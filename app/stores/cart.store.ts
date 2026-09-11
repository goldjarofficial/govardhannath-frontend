import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addItem: (item: Omit<CartItem, 'quantity'>) => void;

  increaseQuantity: (id: string) => void;

  decreaseQuantity: (id: string) => void;

  removeItem: (id: string) => void;

  clearCart: () => void;

  getTotalItems: () => number;

  getTotalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: item => {
        const currentItems = get().items;

        const existingItem = currentItems.find(
          cartItem => cartItem.id === item.id,
        );

        if (existingItem) {
          set({
            items: currentItems.map(cartItem =>
              cartItem.id === item.id
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                  }
                : cartItem,
            ),
          });

          return;
        }

        set({
          items: [
            ...currentItems,
            {
              ...item,
              quantity: 1,
            },
          ],
        });
      },

      increaseQuantity: id => {
        set({
          items: get().items.map(item =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        });
      },

      decreaseQuantity: id => {
        const updatedItems = get()
          .items.map(item =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          )
          .filter(item => item.quantity > 0);

        set({
          items: updatedItems,
        });
      },

      removeItem: id => {
        set({
          items: get().items.filter(item => item.id !== id),
        });
      },

      clearCart: () => {
        set({
          items: [],
        });
      },

      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0,
        );
      },

      getTotalAmount: () => {
        return get().items.reduce(
          (total, item) =>
            total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: 'govardhannath-prasadam-cart',
    },
  ),
);