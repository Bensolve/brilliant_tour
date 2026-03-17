import { Map, Globe, ShieldCheck, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ExperiencePage() {
  return (
    <main className="bg-white">
      {/* 1. HERO SECTION: The "Dream" */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter italic mb-6">
            THE <span className="text-blue-500 not-italic">EXPERIENCE</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
            Beyond destinations. We curate moments that define a lifetime for the worlds most discerning travelers.
          </p>
        </div>
      </section>

      {/* 2. THE THREE PILLARS: Why us? */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <div className="bg-blue-50 w-12 h-12 flex items-center justify-center rounded-lg text-blue-600">
              <Globe size={28} />
            </div>
            <h3 className="text-2xl font-bold italic">Global Reach</h3>
            <p className="text-gray-600 leading-relaxed">
              From the hidden gems of Ghana to the private islands of the Maldives, our network is truly borderless.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 w-12 h-12 flex items-center justify-center rounded-lg text-blue-600">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-bold italic">Absolute Privacy</h3>
            <p className="text-gray-600 leading-relaxed">
              Your journey is your own. We handle every detail with the highest level of discretion and security.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 w-12 h-12 flex items-center justify-center rounded-lg text-blue-600">
              <Compass size={28} />
            </div>
            <h3 className="text-2xl font-bold italic">Curated Discovery</h3>
            <p className="text-gray-600 leading-relaxed">
              We dont do tours. We build personalized expeditions designed around your unique passions.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CALL TO ACTION: The Handshake */}
      <section className="bg-gray-50 py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 italic">Ready to begin your journey?</h2>
          <Link href="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-6 text-lg shadow-xl">
              Apply for Membership
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}