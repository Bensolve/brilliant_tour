"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Bus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface OperatorCardProps {
  id: number;
  userId: string;
  name: string;
  fleetSize: number;
  location: string;
  status: string;
}

export function OperatorCard({ id, userId, name, fleetSize, location, status }: OperatorCardProps) {
  const [processing, setProcessing] = useState(false);

  const handleApprove = async () => {
    setProcessing(true);
    const supabase = createClient();

    const { error: operatorsError } = await supabase
      .from("operators")
      .update({ status: "active" })
      .eq("id", id);

    if (operatorsError) {
      alert("Failed to activate operator: " + operatorsError.message);
      setProcessing(false);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ role: "operator" })
      .eq("id", userId);

    if (profileError) {
      alert("Failed to update profile role: " + profileError.message);
      setProcessing(false);
      return;
    }

    alert("Operator approved successfully.");
    setProcessing(false);
    window.location.reload();
  };

  return (
    <Card className="hover:shadow-md transition-shadow rounded-3xl border-none shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-bold text-gray-700">{name}</CardTitle>
        <Badge
          variant={status === "pending" ? "outline" : "default"}
          className={
            status === "pending"
              ? "text-yellow-600 border-yellow-200 bg-yellow-50 capitalize"
              : "bg-green-600 capitalize"
          }
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-2xl font-black text-gray-900">
          <Bus className="text-green-500" size={24} /> {fleetSize} <span className="text-sm font-medium text-gray-400">Buses</span>
        </div>
        <p className="text-xs text-gray-500 mt-1 font-medium">Routes: {location}</p>
        
        <div className="flex gap-2 mt-6">
          <Button
            size="sm"
            disabled={processing || status !== "pending"}
            onClick={handleApprove}
            className="bg-green-600 hover:bg-green-700 w-full flex gap-1 rounded-xl h-10"
          >
            <CheckCircle2 size={14} /> {processing ? "Approving..." : "Approve"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled
            className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full flex gap-1 rounded-xl h-10"
          >
            <XCircle size={14} /> Deny
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}