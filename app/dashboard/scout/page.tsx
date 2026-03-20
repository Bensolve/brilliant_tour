"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Share2 } from "lucide-react";

export default function ScoutDashboard({ user_id = "USER_ID_FROM_SUPABASE" }) {
  // This works everywhere—server, client, and Vercel build!
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
// Remove any trailing slash from siteUrl first, then add /tours
const cleanSiteUrl = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`;
const referralLink = `${cleanSiteUrl}tours?ref=${user_id}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 pt-24">
      <h1 className="text-3xl font-bold">Scout Dashboard</h1>
      
      <Card className="bg-green-600 text-white border-none shadow-xl">
        <CardContent className="pt-6">
          <p className="text-green-100 mb-1">Total Earnings</p>
          <h2 className="text-5xl font-black">GH₵ 0.00</h2>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-none shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="text-green-600" /> Your Unique Referral Link
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Share this link. Every traveler who books using this link earns you <span className="font-bold text-green-600">GH₵ 20</span> instantly.
          </p>
          <div className="flex gap-2">
            <Input readOnly value={referralLink} className="bg-gray-50 h-12" />
            <Button onClick={copyToClipboard} className="h-12 bg-black hover:bg-gray-800">
              {copied ? "Copied!" : <Copy size={20} />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}