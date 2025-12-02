"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/app/context/Context";
import { toast } from "react-toastify";
import SuccessClientContent from "./SuccessClientContent";

export default function SuccessPage() {
  const { items, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [orderSaved, setOrderSaved] = useState(false);

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // mark page as mounted
  useEffect(() => setMounted(true), []);

  // save order to localStorage on first mount
  useEffect(() => {
    if (!mounted || orderSaved || !sessionId || items.length === 0) return;

    const order = {
      id: sessionId,
      items,
      date: new Date().toISOString(),
      total: items.reduce((sum, item) => sum + item.price * item.qty, 0),
      status: "confirmed",
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
    localStorage.setItem("latestOrder", JSON.stringify(order));

    setOrderSaved(true);
    clearCart();
    toast.success("Payment successful!");
  }, [mounted, sessionId, items, clearCart, orderSaved]);

  if (!mounted) return null; // avoid SSR/hydration issues

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex flex-col items-center justify-center px-4 py-16">
      <SuccessClientContent />
      {/* Add any extra animations/icons below if needed */}
    </div>
  );
}
