"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Tracker() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  useEffect(() => {
    if (ref) {
      document.cookie = `scout_ref=${ref}; path=/; max-age=86400; SameSite=Lax`;
      console.log("✅ Scout attribution captured:", ref);
    }
  }, [ref]);

  return null;
}

export default function ReferralTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}

