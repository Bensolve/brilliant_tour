import { createClient } from "@/lib/supabase/server";
import { OperatorCard } from "@/components/operator-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Wallet, BusFront } from "lucide-react";

export default async function AdminDashboard() {
  // 1. Initialize Supabase using your specific path
  const supabase = await createClient();

  // 2. Fetch pending operators
  const { data: pendingOperators } = await supabase
    .from('operators')
    .select('*')
    .eq('status', 'pending');

  return (
    <div className="space-y-8 p-6">
      {/* 1. The High-Level Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Platform Revenue</CardTitle>
            <Wallet className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">GH₵ 0.00</div>
            <p className="text-xs text-gray-400">+0% from last month</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Scouts</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-gray-400">Waiting for first signup</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Live Buses</CardTitle>
            <BusFront className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-gray-400">Across 0 terminals</p>
          </CardContent>
        </Card>
      </div>

      {/* 2. The Verification Queue */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-gray-800">Pending Operator Verifications</h2>
          {pendingOperators && pendingOperators.length > 0 && (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none rounded-full px-4">
              {pendingOperators.length} New
            </Badge>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pendingOperators && pendingOperators.length > 0 ? (
            pendingOperators.map((op) => (
              <OperatorCard 
                key={op.id}
                id={op.id}
                userId={op.user_id}
                name={op.company_name} 
                fleetSize={op.fleet_size} 
                location={op.routes} 
                status={op.status} 
              />
            ))
          ) : (
            <div className="col-span-full border-2 border-dashed border-gray-200 p-12 rounded-3xl text-center text-gray-400">
              <p className="font-medium">No new applications today.</p>
              <Button variant="link" className="text-green-600 mt-2 font-bold">
                Share Operator Invite Link
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}