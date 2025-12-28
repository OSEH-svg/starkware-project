"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, ShieldCheck, Zap } from "lucide-react";
import { FAQSection } from "./components/landing/FAQSection";
import { HowItWorks } from "./components/landing/HowItWorks";
import { ComparisonSection } from "./components/landing/ComparisonSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background w-full">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 py-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-3xl"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
          Live on Starknet Mainnet
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-7xl font-bold tracking-tighter text-white max-w-4xl"
        >
          Trade Perps with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
            Professional Speed
          </span>
        </motion.h1>

        {/* Hero Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
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
          className="flex flex-col sm:flex-row gap-4 min-w-[200px]"
        >
          <Link href="/trade">
            <button className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto">
              Start Trading <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
          <Link href="https://starknet.io" target="_blank">
            <button className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background/50 backdrop-blur-sm px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto">
              Learn about Starknet
            </button>
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-5xl"
        >
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-yellow-400" />}
            title="Instant Execution"
            description="Low latency order matching powered by Extended's off-chain CLOB."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-6 w-6 text-primary" />}
            title="Self-Custody"
            description="Your funds never leave your wallet until settlement. Secured by ZK-Rollups."
          />
          <FeatureCard
            icon={<BarChart2 className="h-6 w-6 text-blue-400" />}
            title="Pro Tools"
            description="Advanced charting, depth maps, and real-time position monitoring."
          />
        </motion.div>
      </div>

      <ComparisonSection />
      <HowItWorks />
      <FAQSection />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center space-y-2 p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
      <div className="p-3 rounded-full bg-background border border-white/10 mb-2">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-sm text-muted-foreground text-center">{description}</p>
    </div>
  );
}
