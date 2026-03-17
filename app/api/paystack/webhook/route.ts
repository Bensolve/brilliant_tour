import { createClient } from "@/lib/supabase/server"; // Use your server-side client
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.text();
  
  // 1. Verify the request actually came from Paystack (Security)
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  if (hash !== req.headers.get("x-paystack-signature")) {
    return new Response("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(body);

  // 2. Only act if the payment was successful
  if (event.event === "charge.success") {
    const supabase = await createClient();
    const { metadata, amount, customer, reference } = event.data;
    
    // Paystack sends amount in Pesewas, convert back to GHS
    const totalGHS = amount / 100;
    
    // 3. Your Business Logic: The "Brilliant Split"
    const scoutBounty = metadata.scout_id ? 20 : 0;
    const brilliantCommission = totalGHS * 0.15;
    const operatorEarnings = totalGHS - brilliantCommission - scoutBounty;

    // 4. Update Database
    // Add the booking record
    const { error: bookingError } = await supabase
      .from("bookings")
      .insert({
        payment_ref: reference,
        user_email: customer.email,
        tour_id: metadata.tour_id,
        amount_paid: totalGHS,
        status: "confirmed"
      });

    // Credit the Scout if one exists
    if (metadata.scout_id) {
      await supabase.rpc('increment_scout_balance', { 
        scout_uuid: metadata.scout_id, 
        amount_to_add: scoutBounty 
      });
    }

    // Add to Operator's pending balance
    await supabase.rpc('add_operator_balance', { 
      op_id: metadata.operator_id, 
      amount_to_add: operatorEarnings 
    });

    console.log(`✅ Payment Processed: GH₵ ${totalGHS} split successfully.`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}