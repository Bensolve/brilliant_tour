import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, Wallet, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Seamless Travel",
    desc: "Book air-conditioned, vetted buses across Ghana in seconds.",
    icon: Bus,
    role: "TRAVELER"
  },
  {
    title: "Zero-Cost Fleet Mgmt",
    desc: "Operators list buses for free and only pay when seats are filled.",
    icon: ShieldCheck,
    role: "OPERATOR"
  },
  {
    title: "Earn as a Scout",
    desc: "Share links and earn GH₵ 20 for every passenger you refer.",
    icon: Wallet,
    role: "SCOUT"
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">Built for Everyone</h2>
          <p className="text-gray-500 max-w-xl mx-auto">One platform, three ways to experience the journey.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <Card key={f.title} className="border-none shadow-lg hover:shadow-2xl transition-all group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <f.icon size={28} />
                </div>
                <CardTitle className="text-2xl">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
                <div className="mt-6 text-sm font-bold text-green-600 tracking-widest uppercase">
                   {f.role}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}