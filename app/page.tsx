"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { FAQSection } from "./components/landing/FAQSection";
import { HowItWorks } from "./components/landing/HowItWorks";
import { DiverseMarkets } from "./components/landing/DiverseMarkets"
import { TradeImage } from "./components/landing/TradeImage";
import { TradeBenefits } from "./components/landing/TradeBenefits";
import { Community } from "./components/landing/Community";
import { Footer } from "./components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full select-none">
      <div className="bg-[url('/background.svg')] bg-cover bg-center w-full flex flex-col items-center">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 pt-32 pb-48 lg:pt-40 lg:pb-82">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full bg-[#7c7eff]/10 px-3 py-2 text-sm font-medium text-primary backdrop-blur-3xl relative shadow-lg"
          >
            <div className="absolute inset-0 gradient-border-1 rounded-full" />
            <div className="absolute inset-0 gradient-border-2 rounded-full" />
            <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
            Live on Starknet Mainnet
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-[55px] font-normal tracking-tighter text-white max-w-4xl"
          >
            Trade Perps with <br />
            <span className="text-transparent bg-clip-text font-semibold bg-linear-to-r from-[#7C7EFF]/20 to-[#7C7EFF]">
              Professional Speed
            </span>
          </motion.h1>

          {/* Hero Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-150 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
          >
            The most advanced interface for Extended DEX. Self-custodial,
            lightning fast, and built for serious traders. Earn rewards via
            Builder Codes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 min-w-50"
          >
            <Link href="/trade">
              <button className="inline-flex h-12 items-center justify-center rounded-full bg-transparent border border-[#999999] px-8 text-sm font-medium text-white shadow-sm transition-colors hover:[#7c7eff]/90 w-full sm:w-auto">
                Start Trading <ArrowUpRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
            <Link href="https://starknet.io" target="_blank">
              <button className="inline-flex gap-2 h-12 items-center justify-center border border-input backdrop-blur-sm px-8 text-sm font-medium transition-colors hover:bg-[#7c7eff]/50 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto relative bg-[#7c7eff]/10 rounded-full shadow-lg">
                <div className="absolute inset-0 gradient-border-1 rounded-full" />
                <div className="absolute inset-0 gradient-border-2 rounded-full" />
                Learn about Starknet
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="-mt-20 lg:-mt-82 w-full flex justify-center z-10 transition-all duration-300">
         <TradeImage />
      </div>
      <HowItWorks />
      <DiverseMarkets />
      <TradeBenefits />
      <Community />
      <FAQSection />
      <Footer />
    </div>
  );
}