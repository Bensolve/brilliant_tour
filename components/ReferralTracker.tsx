"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Tracker() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  useEffect(() => {
    if (ref) {
      // Store the Scout ID in a cookie for 24 hours
      // SameSite=Lax is important for cross-site link tracking
      document.cookie = `scout_ref=${ref}; path=/; max-age=86400; SameSite=Lax`;
      console.log("✅ Scout attribution captured:", ref);
    }
  }, [ref]);

  return null; // This component doesn't render anything UI-wise
}

export default function ReferralTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}