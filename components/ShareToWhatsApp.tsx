'use client';

import React from 'react';

interface ShareProps {
  tripTitle: string;
  tripId: string;
  scoutId: string;
  scoutBounty: number;
}

export default function ShareToWhatsApp({ tripTitle, tripId, scoutId, scoutBounty }: ShareProps) {
  
  const handleShare = () => {
    // 1. Build the Magic Link (pointing to your website)
    const baseUrl = window.location.origin;
    const magicLink = `${baseUrl}/trips/${tripId}?ref=${scoutId}`;

    // 2. Draft the Message (Ghana Style)
    const message = `🔥 Big Trip: ${tripTitle}!\n\n` +
                    `Don't miss out on this. Book your seat here via MoMo: \n` +
                    `${magicLink}\n\n` +
                    `Safe travel guaranteed! ✅`;

    // 3. Open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-green-50 border-2 border-dashed border-green-200 p-4 rounded-xl mt-6">
      <p className="text-green-800 text-sm font-bold mb-2 flex items-center gap-1">
        🚀 SCOUT SIDE-HUSTLE
      </p>
      <p className="text-gray-600 text-xs mb-4">
        Share this trip. If someone books, you get **GH₵ ${scoutBounty}** instantly!
      </p>
      <button 
        onClick={handleShare}
        className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
      >
        <span className="text-xl">🤳</span>
        Share to WhatsApp Status
      </button>
    </div>
  );
}