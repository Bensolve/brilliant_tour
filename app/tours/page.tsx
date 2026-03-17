// app/tours/page.tsx
import { createClient } from "@/utils/supabase/server";
import { TourCard } from "@/components/TourCard";

export default async function ToursPage() {
  const supabase = await createClient();
  
  // Fetch only tours that have available seats and are in the future
  const { data: tours } = await supabase
    .from('tours')
    .select('*, operators(company_name)')
    .gt('available_seats', 0)
    .order('departure_time', { ascending: true });

  return (
    <section className="max-container padding-container py-32">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="bold-40 lg:bold-64">Available Trips</h1>
        <p className="regular-16 text-gray-300">Book your next journey with Ghanas most reliable operators.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tours?.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
}