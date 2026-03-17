import { MailOpen, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Header Section */}
      <section className="bg-gray-900 text-white py-24 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter italic mb-6">
            BEGIN THE <span className="text-blue-500 not-italic">INQUIRY</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg font-light">
            Your journey is personal. Our approach is bespoke. Share your vision with our concierge team, and we will handle the rest.
          </p>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Side: The Form */}
          <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
            <h2 className="text-3xl font-bold italic mb-8">Send an Inquiry</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Full Name</label>
                  <Input placeholder="John Doe" className="bg-white border-none h-12 shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Email Address</label>
                  <Input type="email" placeholder="john@example.com" className="bg-white border-none h-12 shadow-sm" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Desired Destination</label>
                <Input placeholder="e.g. Serengeti, Private Island, Ghana" className="bg-white border-none h-12 shadow-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Your Vision</label>
                <Textarea placeholder="Tell us about the experience you wish to create..." className="bg-white border-none min-h-[150px] shadow-sm" />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-8 text-lg rounded-xl flex gap-3 shadow-lg">
                <Send size={20} />
                Submit Inquiry
              </Button>
            </form>
          </div>

          {/* Right Side: The Details */}
          <div className="flex flex-col justify-center space-y-12">
            <div>
              <h2 className="text-3xl font-bold italic mb-6">Direct Channels</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Prefer a more direct conversation? Our executive concierge team is available for private consultations.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Private Line</h4>
                  <p className="text-gray-500">+233 (0) XX XXX XXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
                  <MailOpen size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Confidential Email</h4>
                  <p className="text-gray-500">concierge@brillianttour.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
                  <Clock size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Global Response</h4>
                  <p className="text-gray-500">Our concierge team responds within 2 hours, 24/7.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}