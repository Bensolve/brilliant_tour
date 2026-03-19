import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ReferralTracker from "@/components/scout/ReferralTracker";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata =  {
  title: "Brilliant Tour | Ghana's Best Travel Network",
  description: "Book buses and earn rewards with the Brilliant Tour Scout Network.",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReferralTracker />
       
        {children}
      </body>
    </html>
  );
}
