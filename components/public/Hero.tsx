import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoveRight, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-full h-full opacity-20">
        <div className="absolute inset-0 bg-[url('/map-pattern.png')] bg-cover" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <Badge
              variant="outline"
              className="px-4 py-1 border-green-500 text-green-600 bg-green-50 rounded-full"
            >
              ✨ New: Earn GH₵ 20 per referral as a Scout
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900">
              Travel Ghana, <span className="text-green-600">Smarter.</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              The only platform where you can book safe buses, manage your fleet,
              or earn money by sharing the journey. No hidden fees, just brilliant
              travel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full bg-green-600 hover:bg-green-700 text-lg shadow-xl group"
                >
                  Start Your Journey{" "}
                  <MoveRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="lg"
                className="h-14 px-8 rounded-full text-lg"
              >
                <PlayCircle className="mr-2 h-6 w-6" /> How it works
              </Button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"
                alt="Brilliant Travel"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

