// components/scout/WithdrawModal.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, Smartphone } from "lucide-react";

export function WithdrawModal({ currentBalance }: { currentBalance: number }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    setLoading(true);
    // Call the API route we just made
    const res = await fetch("/api/paystack/transfer", {
      method: "POST",
      body: JSON.stringify({ amount: Number(amount) }),
    });
    
    if (res.ok) alert("Money sent to your MoMo!");
    setLoading(false);
  };

  return (
    <div className="p-8 rounded-3xl bg-white text-black shadow-2xl space-y-6">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
          <Wallet size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold">Withdraw Earnings</h3>
          <p className="text-sm text-gray-500">Available: GH₵ {currentBalance}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold uppercase text-gray-400">Amount (GHS)</label>
          <Input 
            type="number" 
            placeholder="0.00" 
            className="h-14 text-2xl font-bold rounded-xl"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleWithdraw}
          disabled={loading || Number(amount) > currentBalance || Number(amount) < 50}
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg font-bold transition-all"
        >
          {loading ? "Processing..." : "Send to MoMo"}
        </Button>
        <p className="text-center text-[10px] text-gray-400">Min. withdrawal: GH₵ 50.00</p>
      </div>
    </div>
  );
}