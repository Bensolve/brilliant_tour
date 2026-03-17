'use client';

export default function WalletCard({ balance, role }: { balance: number, role: string }) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium uppercase tracking-wider opacity-80">
          {role} Wallet
        </span>
        <span className="bg-white/20 px-3 py-1 rounded-full text-xs">MoMo Ready</span>
      </div>
      
      <h2 className="text-4xl font-bold mb-6">
        GH₵ {balance.toFixed(2)}
      </h2>

      <div className="flex gap-3">
        <button 
          onClick={() => alert("Withdrawal request sent to Admin via MoMo!")}
          className="flex-1 bg-white text-blue-800 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Withdraw Cash
        </button>
        <button className="p-3 bg-blue-500/30 rounded-lg hover:bg-blue-500/50">
          🕒 History
        </button>
      </div>
    </div>
  );
}