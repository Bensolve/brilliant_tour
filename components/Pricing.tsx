import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Pricing() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">No Monthly Fees</h2>
        <p className="text-gray-500 mb-12">We only make money when you do.</p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Operator Card */}
          <Card className="border-2 border-green-600 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Bus Operator</CardTitle>
              <CardDescription>For fleet owners in Ghana</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold">85% <span className="text-lg font-normal text-gray-500">Payout</span></div>
              <ul className="text-left space-y-2">
                <li className="flex items-center gap-2"><Check className="text-green-600" size={18}/> Free listing</li>
                <li className="flex items-center gap-2"><Check className="text-green-600" size={18}/> Instant MoMo Payouts</li>
                <li className="flex items-center gap-2"><Check className="text-green-600" size={18}/> Automatic Scout Network</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 py-6 text-lg">Register Fleet</Button>
            </CardFooter>
          </Card>

          {/* Scout Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Scout</CardTitle>
              <CardDescription>For referrers & influencers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold">GH₵ 20 <span className="text-lg font-normal text-gray-500">Bounty</span></div>
              <ul className="text-left space-y-2">
                <li className="flex items-center gap-2"><Check className="text-green-600" size={18}/> Unlimited Referrals</li>
                <li className="flex items-center gap-2"><Check className="text-green-600" size={18}/> Tracking Dashboard</li>
                <li className="flex items-center gap-2"><Check className="text-green-600" size={18}/> Weekly Commissions</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full py-6 text-lg">Become a Scout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}