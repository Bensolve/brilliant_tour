"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Building2, Bus, Phone, MapPin } from "lucide-react";

export default function OperatorJoinPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data: userData, error: authError } = await supabase.auth.getUser();
    if (authError || !userData?.user) {
      setLoading(false);
      router.push("/login");
      return;
    }

    const user = userData.user;
    const formData = new FormData(e.currentTarget);

    const { error } = await supabase.from("operators").insert({
      user_id: user.id,
      company_name: formData.get("company"),
      fleet_size: parseInt(formData.get("fleet") as string),
      momo_number: formData.get("momo"),
      routes: formData.get("routes"),
      status: "pending",
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Application sent successfully!");
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-6">
      <Card className="max-w-2xl mx-auto border-none shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-green-600 text-white p-8">
          <CardTitle className="text-3xl font-bold">Partner with Us</CardTitle>
          <CardDescription className="text-green-100 text-lg">
            Register your fleet and start earning today.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input name="company" placeholder="e.g. VIP Jeoun" className="pl-10 h-12" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Fleet Size</Label>
                <div className="relative">
                  <Bus className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input name="fleet" type="number" placeholder="Number of buses" className="pl-10 h-12" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>MoMo Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input name="momo" placeholder="024 XXX XXXX" className="pl-10 h-12" required />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Main Routes</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input name="routes" placeholder="e.g. Accra - Kumasi" className="pl-10 h-12" required />
              </div>
            </div>

            <Button disabled={loading} className="w-full bg-green-600 h-14 text-lg rounded-xl font-bold">
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}