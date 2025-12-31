"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, MessageCircle, Twitter } from "lucide-react";

export function Community() {
  return (
    <section className="relative min-h-[100vh] py-24 w-full flex justify-center overflow-hidden">
      {/* Background Image Container */}
<div className="absolute inset-0 z-0 flex justify-center">
  <Image
    src="/images/P background.png"
    alt="Community Background"
    width={1110}
    height={780}
    className="max-w-full h-auto"
  />
</div>

      <div className="container px-4 relative z-10 flex flex-col items-center text-center">
        
        {/* Socials Badge */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="inline-flex items-center rounded-full bg-[#7c7eff]/10 px-3 py-2 text-sm font-medium text-primary backdrop-blur-3xl relative shadow-lg mb-8 border border-[#7C7eff]/20"
        >
            <div className="absolute inset-0 gradient-border-1 rounded-full" />
            <div className="absolute inset-0 gradient-border-2 rounded-full" />
            <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
            Socials
        </motion.div>

        {/* Heading */}
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[55px] font-normal text-white mt-6 mb-12 tracking-tight"
        >
            Connect with Perpify Community
        </motion.h2>

        {/* Hexagon Buttons Row */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-6 mb-12"
        >
             {/* Discord Hexagon */}
             <HexagonButton href="https://discord.com" label="Discord">
                 {/* Custom Discord-like Icon using SVG path or Lucide placeholder */}
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white w-8 h-8">
                     <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 14.155 14.155 0 0 0-.27 2.054 18.27 18.27 0 0 0-7.302 0 14.285 14.285 0 0 0-.272-2.054.075.075 0 0 0-.079-.037 19.78 19.78 0 0 0-4.885 1.515.064.064 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                 </svg>
             </HexagonButton>

             {/* X (Twitter) Hexagon */}
             <HexagonButton href="https://twitter.com" label="X">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white w-7 h-7">
                     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                 </svg>
             </HexagonButton>
        </motion.div>

        {/* Start Trading Button */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-12"
        >
             <Link href="/trade">
              <button className="inline-flex h-12 items-center justify-center rounded-full bg-transparent border border-[#999999] px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#7c7eff]/10 hover:border-[#7c7eff] w-full sm:w-auto overflow-hidden relative group">
                <span className="relative z-10 flex items-center">Start Trading <ArrowUpRight className="ml-2 h-4 w-4" /></span>
                <div className="absolute inset-0 bg-[#7c7eff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
        </motion.div>
        
        {/* Footer Text */}
        <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.4 }}
             viewport={{ once: true }}
             className="text-gray-400 space-y-2 max-w-lg mx-auto"
        >
            <p className="text-sm">Join the conversation and stay updated on the latest features.</p>
        </motion.div>

      </div>
    </section>
  );
}

function HexagonButton({ href, children, label }: { href: string, children: React.ReactNode, label: string }) {
    return (
        <Link href={href} target="_blank" className="group relative w-14 h-16 md:w-16 md:h-18 flex items-center justify-center">
            {/* Hexagon Shape */}
            <div className="absolute inset-0 bg-linear-to-r from-[#7C7EFF] to-[#4A4C99] hover:bg-[#7C7EFF]/20 hover:border-[#7C7EFF]/50 transition-all duration-300"
                 style={{
                     clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                 }}
            />
            
            {/* Inner Content */}
            <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                {children}
            </div>
            
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-[#7C7EFF] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 z-0" />
        </Link>
    );
}