import Hero from "@/components/public/Hero";
import Features from "@/components/public/Features";
import Camp from "@/components/public/Camp";
import Guide from "@/components/public/Guide";
import Pricing from "@/components/public/Pricing";
import GetApp from "@/components/public/GetApp";
import FAQ from "@/components/public/FAQ";
import Footer from "@/components/public/Footer";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* 1. The Hook: High-impact visuals and "Get Started" */}
      <Hero />

      {/* 2. The Destinations: Showing the "Product" (Ghanaian Routes) */}
      <Camp />

      {/* 3. The Trust: Explaining the "How-To" and safety */}
      <Guide />

      {/* 4. The Business: Explaining the 3-role Magic Split */}
      <Features />

      {/* 5. The Economics: Clear payout/bounty info */}
      <Pricing />

      {/* 6. The Mobile Push: Encouraging the app experience */}
      <GetApp />

      {/* 7. The Details: Solving common user anxieties */}
      <FAQ />

      {/* 8. The Anchor: Navigation and Socials */}
      <Footer />
    </main>
  );
}