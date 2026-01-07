import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "@fontsource/sanchez";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./components/Providers";
import { Navbar } from "./components/Navbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Extended Pro | Advanced Starknet DEX Frontend",
  description:
    "Trade perps on Extended with professional tools. Self-custodial, lightning fast, and optimized for Starknet traders.",
  keywords: ["Starknet", "DEX", "Extended", "Perpetuals", "Trading", "Crypto"],
  openGraph: {
    title: "Extended Pro | Advanced Starknet DEX",
    description:
      "The premier alternative frontend for Extended. Trade faster, earn rewards.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-primary/30",
          GeistSans.variable
        )}
      >
        <Providers>
          <Navbar />
          <main className="flex min-h-screen flex-col">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
