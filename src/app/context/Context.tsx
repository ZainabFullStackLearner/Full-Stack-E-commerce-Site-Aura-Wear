"use client"
import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "../hooks/localstorage";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  removeItem: (id: string) => void;
  addItem: (item: Omit<CartItem, "qty">, qty: number) => void;
  clearCart: () => void;
  updateQty: (id: string, qty: number) => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartState | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>("cart:v1", []);
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const newTotalItems = items.reduce((total, item) => total + item.qty, 0);
    const newSubtotal = items.reduce((total, item) => total + item.price * item.qty, 0);
    setTotalItems(newTotalItems);
    setSubtotal(newSubtotal);
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "qty">, qty: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prevItems, { ...item, qty }];
    });
  }, [setItems]);

  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, [setItems]);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id ? { ...item, qty } : item
      );
    });
  }, [setItems]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}