import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Our Community",
    links: ["Booking Guide", "Travel Tips", "Scout Rewards", "Safety First"],
  },
  {
    title: "For Operators",
    links: ["List a Bus", "Operator Portal", "Fleet Insurance", "Payout Schedule"],
  },
];

export default function Footer() {
  return (
    <footer className="flexCenter mb-24 pt-20 border-t border-gray-100">
      <div className="padding-container max-container flex w-full flex-col gap-14">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          <Link href="/" className="mb-10 text-2xl font-bold">
            BRILLIANT<span className="text-green-600">TOUR</span>
          </Link>

          <div className="flex flex-wrap gap-10 sm:justify-between md:flex-1">
            {FOOTER_LINKS.map((col) => (
              <div key={col.title} className="flex flex-col gap-5">
                <h4 className="font-bold whitespace-nowrap">{col.title}</h4>
                <ul className="text-gray-500 flex flex-col gap-4">
                  {col.links.map((link) => (
                    <Link href="/" key={link} className="hover:text-green-600 transition-colors">
                      {link}
                    </Link>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col gap-5">
              <h4 className="font-bold">Contact Us</h4>
              <p className="text-gray-500">Phone: +233 24 000 0000</p>
              <p className="text-gray-500">Email: hello@brillianttour.com</p>
            </div>

            <div className="flex flex-col gap-5">
              <h4 className="font-bold">Socials</h4>
              <div className="flex gap-4 text-gray-400">
                <Twitter className="hover:text-blue-400 cursor-pointer" />
                <Facebook className="hover:text-blue-600 cursor-pointer" />
                <Instagram className="hover:text-pink-600 cursor-pointer" />
                <Youtube className="hover:text-red-600 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="border bg-gray-20" />
        <p className="text-center text-gray-400 text-sm">2026 Brilliant Tour | All rights reserved</p>
      </div>
    </footer>
  );
}