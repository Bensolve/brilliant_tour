import { Gem, ShieldCheck, Plane, Music, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServicesPage() {
  const SERVICES = [
    {
      title: "Global Concierge",
      description: "A dedicated personal assistant available 24/7 to handle every request, from dinner reservations to private events.",
      icon: Gem,
    },
    {
      title: "Private Aviation",
      description: "Seamless door-to-door travel via our network of premium private jets and helicopter transfers.",
      icon: Plane,
    },
    {
      title: "Elite Security",
      description: "Discreet, professional protection for you and your family, ensuring total peace of mind in any destination.",
      icon: ShieldCheck,
    },
    {
      title: "Curated Events",
      description: "Access to the world’s most exclusive events, from Fashion Weeks to private villa gala dinners.",
      icon: Music,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* 1. Header Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter italic mb-4">
            OUR <span className="text-blue-500 not-italic">SERVICES</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            The difference between a trip and a legacy is the detail. We manage the impossible so you can enjoy the moment.
          </p>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => (
            <div key={index} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="bg-blue-600 w-14 h-14 flex items-center justify-center rounded-xl text-white mb-6 group-hover:scale-110 transition-transform">
                <service.icon size={30} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold italic mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The "Concierge" Callout */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block p-3 bg-blue-50 rounded-full text-blue-600 mb-6">
             <Coffee size={32} />
          </div>
          <h2 className="text-3xl font-bold italic mb-6">Looking for something bespoke?</h2>
          <p className="text-gray-600 mb-10 text-lg">
            Our concierge team specializes in The Impossible. If it can be imagined, it can be arranged. 
            Speak to a specialist today to begin crafting your unique itinerary.
          </p>
          <Link href="/contact">
            <Button className="bg-gray-900 hover:bg-black text-white px-12 py-7 text-lg rounded-full">
              Start an Inquiry
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}