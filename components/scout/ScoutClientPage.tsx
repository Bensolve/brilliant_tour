"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Share2, Wallet, TrendingUp, Users, CheckCircle2 } from "lucide-react";

interface ScoutProps {
  userId: string;
}

export default function ScoutClientPage({ userId }: ScoutProps) {
  const [copied, setCopied] = useState(false);

  // Referral Link Logic
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const cleanSiteUrl = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`;
  const referralLink = `${cleanSiteUrl}tours?ref=${userId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 pt-24 max-w-5xl mx-auto min-h-screen bg-white">
      {/* HEADER */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Scout Dashboard</h1>
        <p className="text-slate-500 mt-2 font-medium">Your influence is your income. Track your referrals here.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* MAIN WALLET CARD */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-green-600 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-green-100">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 opacity-80">
                <Wallet size={20} />
                <span className="font-bold uppercase tracking-widest text-xs">Total Earnings</span>
              </div>
              <h2 className="text-6xl font-black mb-10">GH₵ 0.00</h2>
              <Button className="bg-white hover:bg-slate-50 text-green-600 rounded-2xl h-14 px-8 font-bold text-lg border-none">
                Request Payout
              </Button>
            </div>
            {/* Background Icon Decoration */}
            <TrendingUp className="absolute -bottom-12 -right-12 text-white/10" size={280} />
          </div>

          {/* REFERRAL LINK CARD */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <Share2 size={20} />
              </div>
              <div>
                <h3 className="font-black text-slate-900">Your Referral Link</h3>
                <p className="text-sm text-slate-400">Earn GH₵ 20 for every successful booking.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Input 
                  readOnly 
                  value={referralLink} 
                  className="bg-slate-50 border-none h-14 rounded-2xl font-mono text-sm text-slate-600 pr-12 focus-visible:ring-green-500" 
                />
              </div>
              <Button 
                onClick={copyToClipboard} 
                className={`h-14 px-8 rounded-2xl font-bold transition-all duration-300 ${
                  copied ? "bg-green-500 hover:bg-green-600" : "bg-slate-900 hover:bg-slate-800"
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="mr-2" size={20} /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2" size={20} /> Copy Link
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* SIDEBAR: STATS & ACTIVITY */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Users size={18} className="text-green-600" /> Referral Stats
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Total Clicks</span>
                <span className="font-black text-slate-900">0</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200 pt-4">
                <span className="text-slate-500 text-sm">Successful Sales</span>
                <span className="font-black text-slate-900">0</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200 pt-4">
                <span className="text-slate-500 text-sm">Conversion Rate</span>
                <span className="font-black text-slate-900">0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}