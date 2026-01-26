"use client";

export async function getPaystack() {
  const PaystackPop = (await import("@paystack/inline-js")).default;
  return new PaystackPop();
}
