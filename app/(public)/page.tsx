import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Camp from "@/components/Camp";
import Guide from "@/components/Guide";
import Pricing from "@/components/Pricing";
import GetApp from "@/components/GetApp";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

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