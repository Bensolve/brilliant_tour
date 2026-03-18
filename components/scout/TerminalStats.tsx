import { MapPin, TrendingUp } from "lucide-react";

const stats = [
  { terminal: "Circle (VIP)", sales: 12, growth: "+14%" },
  { terminal: "Neoplan", sales: 8, growth: "+5%" },
];

export function TerminalStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {stats.map((stat) => (
        <div
          key={stat.terminal}
          className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-green-600/20 text-green-500">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">{stat.terminal}</p>
              <p className="text-xl font-bold text-white">
                {stat.sales} Bookings
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-green-400 text-sm font-bold bg-green-400/10 px-2 py-1 rounded-lg">
            <TrendingUp size={14} /> {stat.growth}
          </div>
        </div>
      ))}
    </div>
  );
}

