import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const CAMPS = [
  {
    title: "Accra Central",
    subtitle: "Greater Accra",
    people: "50+ Booked Today",
    img: "https://images.unsplash.com/photo-1590644300530-fa1743a73c2f",
  },
  {
    title: "Kumasi Terminal",
    subtitle: "Ashanti Region",
    people: "30+ Booked Today",
    img: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37",
  },
];

export default function Camp() {
  return (
    <section className="relative flex flex-col py-10 lg:py-20">
      <Carousel className="w-full">
        <CarouselContent className="flex gap-8 px-6 lg:px-12">
          {CAMPS.map((camp) => (
            <CarouselItem key={camp.title} className="md:basis-1/2 lg:basis-2/3">
              <div className="relative h-[400px] w-full overflow-hidden rounded-3xl lg:h-[600px]">
                <img
                  src={camp.img}
                  alt={camp.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 p-8 flex flex-col justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-green-500 p-4">✨</div>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-bold text-xl">{camp.title}</h4>
                      <p className="text-sm opacity-80">{camp.subtitle}</p>
                    </div>
                  </div>
                  <div className="font-bold">{camp.people}</div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-10 px-6 lg:-mt-60 lg:mr-6 flex justify-end">
        <div className="bg-green-600 p-8 lg:max-w-[500px] rounded-3xl text-white shadow-2xl z-10">
          <h2 className="text-2xl lg:text-4xl font-light">
            <strong>Stress-Free</strong> Travel Across Ghana
          </h2>
          <p className="mt-5 text-sm lg:text-lg opacity-80">
            From Circle to Kejetia, we manage the maps and the safety so you can
            focus on the journey.
          </p>
        </div>
      </div>
    </section>
  );
}

