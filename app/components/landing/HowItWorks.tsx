"use client";

import { motion } from "framer-motion";
import { Lock, Zap, Code } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="py-24 bg-secondary/20 w-full flex justify-center">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Trade Here?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide a simplified, powerful interface for the Extended
            Protocol. Same liquidity, better tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            icon={<Zap className="h-8 w-8 text-yellow-400" />}
            title="1. Connect"
            text="Link your Argent or Braavos wallet. No registration required."
          />
          <StepCard
            icon={<Code className="h-8 w-8 text-primary" />}
            title="2. Trade"
            text="Access deep liquidity on BTC, ETH, and STRK perps with up to 20x leverage."
          />
          <StepCard
            icon={<Lock className="h-8 w-8 text-blue-400" />}
            title="3. Earn"
            text="Positions are settled on Starknet. Fast, cheap, and secure."
          />
        </div>
      </div>
    </section>
  );
}

function StepCard({ icon, title, text }: any) {
  return (
    <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-background/50 border border-white/5 backdrop-blur-lg">
      <div className="mb-6 p-4 rounded-full bg-secondary/50">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}
