import { useState } from "react";
import { createTrip } from "@/lib/actions/trip.actions";

export default function CreateTripForm({ operatorId }: { operatorId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await createTrip({
      title: formData.get("title"),
      from_place: formData.get("from_place"),
      to_place: formData.get("to_place"),
      price: Number(formData.get("price")),
      scout_bounty: Number(formData.get("scout_bounty")), // THE MONEY LOGIC
      departure_date: formData.get("departure_date"),
      operator_id: operatorId,
    });

    if ("error" in result) alert(result.error);
    else alert("Trip posted successfully! Scouts can now see the reward.");

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold">Post a New Trip</h2>

      <input
        name="title"
        placeholder="Trip Title (e.g. World Cup Shuttle)"
        className="w-full border p-2 rounded"
        required
      />

      <div className="flex gap-4">
        <input
          name="from_place"
          placeholder="From (e.g. Accra)"
          className="w-1/2 border p-2 rounded"
          required
        />
        <input
          name="to_place"
          placeholder="To (e.g. Kumasi)"
          className="w-1/2 border p-2 rounded"
          required
        />
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="text-sm text-gray-500">Ticket Price (GH₵)</label>
          <input
            name="price"
            type="number"
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="text-sm font-bold text-green-600">
            Scout Reward (GH₵)
          </label>
          <input
            name="scout_bounty"
            type="number"
            className="w-full border-2 border-green-500 p-2 rounded"
            required
          />
        </div>
      </div>

      <input
        name="departure_date"
        type="datetime-local"
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700"
      >
        {loading ? "Posting..." : "Post Trip & Activate Scouts"}
      </button>
    </form>
  );
}

