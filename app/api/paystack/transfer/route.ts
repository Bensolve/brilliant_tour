import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { amount, momoNumber, provider } = await req.json();

  // 1. Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  // 2. Double-check balance in DB before sending money
  const { data: profile } = await supabase
    .from('profiles')
    .select('balance')
    .eq('id', user.id)
    .single();

  if (!profile || profile.balance < amount) {
    return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
  }

  try {
    // 3. Initiate Paystack Transfer
    const response = await fetch("https://api.paystack.co/transfer", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "balance", // Uses your Paystack account balance
        amount: amount * 100, // Pesewas
        recipient: momoNumber, // You'd first create a 'Transfer Recipient' in Paystack
        reason: "Brilliant Tour Scout Payout",
      }),
    });

    const result = await response.json();

    if (result.status) {
      // 4. Deduct from Supabase balance
      await supabase.rpc('deduct_scout_balance', { 
        scout_uuid: user.id, 
        amount_to_subtract: amount 
      });
      
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    return NextResponse.json({ error: "Transfer failed" }, { status: 500 });
  }
}