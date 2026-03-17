'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function TripDetailsPage() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Look for the 'ref' in the URL (e.g., ?ref=kojo123)
    const ref = searchParams.get('ref');
    
    if (ref) {
      // Save it in the browser's "Long-term Memory" (Local Storage)
      localStorage.setItem('brilliant_tour_ref', ref);
      console.log("Scout tracking active for ID:", ref);
    }
  }, [searchParams]);

  return (
    // Your UI code here...
    <div>
       {/* Use the ShareToWhatsApp component here */}
    </div>
  );
}