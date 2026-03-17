import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, amount, metadata } = await request.json();

  // Convert GHS to Pesewas (Paystack works in the smallest currency unit)
  // e.g., GH₵ 100 becomes 10000 pesewas
  const paystackAmount = Math.round(amount * 100);

  try {
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Add this to your .env
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: paystackAmount,
        metadata, // This is where we store scout_id and operator_id
        callback_url: `${process.env.NEXT_PUBLIC_URL}/booking/success`, // Where they go after paying
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}