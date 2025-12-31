"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import Image from "next/image";

const BENEFITS = [
  {
    title: "Seamless & powerful",
    description:
      "Experience lightning-fast and one-click trading with diverse markets, deep liquidity, and advanced order types. Tap into the power of decentralized finance with up.",
    icon: "/icons/Fast.svg", 
    badge: "Seamless & powerful",
  },
  {
    title: "Self-custody & transparency",
    description:
      "Enjoy decentralization with absence of frontrunning and MEV. Secure instant fiat transaction settlements through card payments and bank transfers with maximum.",
    icon: "/icons/Safe.svg", 
    badge: "Self-custody & transparency",
  },
  {
    title: "Vast fiat infrastructure",
    description:
      "Secure instant fiat transaction settlements through card payments and bank transfers with maximum capital efficiency. Secure instant fiat transaction settlements through card payments and bank transfers with maximum capital efficiency.",
    icon: "/icons/box.svg",
    badge: "Vast fiat infrastructure",
  },
  {
    title: "Low fees & rebates",
    description:
      "Benefit from gas-free trading, minimal taker fees and competitive maker rebates.",
    icon: "/icons/fee.svg",
    badge: "Low fees & rebates",
  },
];

export function TradeBenefits() {
  return (
    <section className="py-24 px-4 lg:px-48 relative overflow-hidden bg-black">
      <div className="absolute left-[-10%] top-[30%] w-[500px] h-[500px] bg-[#7C7EFF] opacity-20 blur-[174px] pointer-events-none rounded-full" />
      <div className="absolute right-[-10%] bottom-[30%] w-[500px] h-[500px] bg-[#7C7EFF] opacity-20 blur-[174px] pointer-events-none rounded-full" />

        <div className="flex flex-col items-start mb-20">
          
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full bg-[#7c7eff]/10 px-3 py-2 text-sm font-medium text-primary backdrop-blur-3xl relative shadow-lg mb-8"
          >
            <div className="absolute inset-0 gradient-border-1 rounded-full" />
            <div className="absolute inset-0 gradient-border-2 rounded-full" />
            <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
            Advanced Trading Power
          </motion.div>

          {/* User Text Specs: 55px Left, Description Right */}
          <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-[55px] leading-[1.1] text-white max-w-2xl text-left"
            >
              Why Trade Crypto with Perpify
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 text-lg md:text-xl max-w-md pb-2 text-left lg:text-left"
            >
              We provide a simplified, powerful interface for the Extended Protocol. Same liquidity, better tools.
            </motion.p>
          </div>
        </div>

        {/* Mobile Full Carousel */}
        <MobileCarousel benefits={BENEFITS} />

        {/* Desktop Grid Section: Glassmorphic Cards */}
        <div className="hidden md:block space-y-6">
          {/* First Row: 50% - 50% */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BenefitCard benefit={BENEFITS[0]} index={0} />
            <BenefitCard benefit={BENEFITS[1]} index={1} />
          </div>

          {/* Second Row: 70% - 30% */}
          <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
            <div className="md:col-span-7">
              <BenefitCard benefit={BENEFITS[2]} index={2} />
            </div>
            <div className="md:col-span-3">
              <BenefitCard benefit={BENEFITS[3]} index={3} />
            </div>
          </div>
        </div>
      
    </section>
  );
}

function MobileCarousel({ benefits }: { benefits: typeof BENEFITS }) {
  const [current, setCurrent] = useState(0);

  // Auto-slide functionality (optional, but good for UX)
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrent((prev) => (prev + 1) % benefits.length);
  //   }, 5000);
  //   return () => clearInterval(timer);
  // }, [benefits.length]);

  return (
    <div className="md:hidden relative pb-12">
        <div className="overflow-hidden">
             
             <motion.div 
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
             >
                 <BenefitCard benefit={benefits[current]} index={current} />
             </motion.div>

        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8 absolute bottom-0 left-0 right-0">
          {benefits.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-[#7C7EFF]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
    </div>
  );
}

function BenefitCard({ benefit, index }: { benefit: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative p-8 rounded-[32px] overflow-hidden min-h-[360px] flex flex-col justify-between"
           style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      
      {/* Bottom shadow for 3D depth */}
      <div 
        className="absolute -bottom-4 left-8 right-8 h-8 rounded-[32px] -z-10 transition-all duration-500 group-hover:opacity-80"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          filter: 'blur(20px)',
        }}
      />

      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(124, 126, 255, 0.1) 0%, transparent 70%)',
        }}
      />
        
        <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6"
               style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            
                {benefit.badge}
            </div>
            
            <p className="text-gray-400 leading-relaxed text-lg">
                {benefit.description}
            </p>
        </div>

        <div className="relative z-10 flex justify-end mt-8">
             <div className="relative w-24 h-24 transform group-hover:scale-110 transition-transform duration-500">
                <Image 
                    src={benefit.icon} 
                    alt={benefit.title} 
                    fill 
                    className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
             </div>
        </div>
    </motion.div>
  );
}
