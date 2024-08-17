"use client";

import { createContext, useContext, useState } from "react";

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number) => void;
}

export const CartContext = createContext({
  items: [],
} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(productId: number) {
    setCartItems((prevState) => {
      const productInCart = cartItems.some(
        (item) => item.productId === productId,
      );
      if (productInCart) {
        return prevState.map((product) => {
          if (product.productId === productId) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        });
      } else {
        return [...prevState, { productId, quantity: 1 }];
      }
    });
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
