import { Button } from "@/components/ui/button";
import { Smartphone, Download } from "lucide-react";

export default function GetApp() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto bg-gray-900 rounded-3xl p-12 lg:p-24 flex flex-col lg:flex-row items-center justify-between text-white gap-12 overflow-hidden relative">
        <div className="z-10 space-y-8">
          <h2 className="text-4xl lg:text-6xl font-bold">Download Free Now!</h2>
          <p className="text-gray-400">Available on iOS and Android for all Travelers and Scouts.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="secondary" className="rounded-full h-14 px-8"><Smartphone className="mr-2"/> App Store</Button>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 border-white text-white hover:bg-white/10"><Download className="mr-2"/> Play Store</Button>
          </div>
        </div>
        <div className="lg:w-1/2 opacity-50 lg:opacity-100">
           <div className="w-64 h-96 bg-gray-800 rounded-3xl border-4 border-gray-700 shadow-2xl rotate-12 flex items-center justify-center">
              <span className="text-gray-600">App Preview</span>
           </div>
        </div>
      </div>
    </section>
  );
}