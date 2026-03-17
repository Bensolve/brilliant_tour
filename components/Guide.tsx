import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Guide() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <p className="uppercase text-green-500 mb-3 tracking-widest font-bold">The Journey</p>
        <div className="flex flex-wrap justify-between gap-5">
          <h2 className="text-4xl font-bold max-w-[400px]">Guided by Local Expertise</h2>
          <p className="text-gray-500 max-w-[500px]">
            Our platform connects you with vetted drivers and real-time tracking, ensuring you never miss a connection or feel unsafe at a terminal.
          </p>
        </div>
      </div>

      <div className="relative">
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-3xl">
          <img src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff" alt="map" className="w-full h-full object-cover" />
        </AspectRatio>
        <div className="absolute top-10 left-10 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
          <div className="flex gap-4">
            <div className="w-1 bg-green-500 rounded-full" />
            <div>
              <p className="text-xs text-gray-400">Current Trip</p>
              <p className="font-bold">Accra → Kumasi</p>
              <p className="text-xs text-green-500 font-bold mt-2">Arrival: 45 mins</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}