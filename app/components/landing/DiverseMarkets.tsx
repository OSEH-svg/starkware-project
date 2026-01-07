"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Image from "next/image";

// Mock Data Configuration
const INITIAL_MARKETS = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", price: 64230.50, change: 2.4, icon: "/icons/Bitcoin.svg" },
  { id: "eth", name: "Ethereum", symbol: "ETH", price: 3450.12, change: 1.8, icon: "/icons/Ethereum.svg" },
  { id: "strk", name: "Starknet", symbol: "STRK", price: 1.24, change: 5.2, icon: "/icons/Starknet.svg" },
  { id: "bnb", name: "BNB", symbol: "BNB", price: 590.45, change: -0.5, icon: "/icons/BNB.svg" },
  { id: "sol", name: "Solana", symbol: "SOL", price: 145.67, change: 4.1, icon: "/icons/Solana.svg" },
  { id: "avax", name: "Avalanche", symbol: "AVAX", price: 35.89, change: -1.2, icon: "/icons/Avalanche.svg" },
  { id: "sei", name: "Sei", symbol: "SEI", price: 0.65, change: 8.4, icon: "/icons/Sei.svg" },
  { id: "tron", name: "Tron", symbol: "TRX", price: 0.12, change: 0.8, icon: "/icons/Tron.svg" },
  { id: "link", name: "Chainlink", symbol: "LINK", price: 18.45, change: 3.2, icon: "/icons/Chainlink.svg" },
  { id: "matic", name: "Polygon", symbol: "MATIC", price: 0.72, change: -0.4, icon: "/icons/Polygon.svg" },
  { id: "arb", name: "Arbitrum", symbol: "ARB", price: 1.15, change: 2.1, icon: "/icons/Arbitrum.svg" },
  { id: "doge", name: "Dogecoin", symbol: "DOGE", price: 0.16, change: 1.5, icon: "/icons/Dogecoin.svg" },
];

export function DiverseMarkets() {
  const [markets, setMarkets] = useState(INITIAL_MARKETS);

  // Simulate Live Prices
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets((prevMarkets) =>
        prevMarkets.map((market) => {
          const fluctuation = (Math.random() - 0.5) * (market.price * 0.005);
          const newPrice = Math.max(0, market.price + fluctuation);
           const newChange = Math.random() > 0.8 
            ? market.change + (Math.random() - 0.5) * 0.2 
            : market.change;
          return { ...market, price: newPrice, change: newChange };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Split markets into 3 rows
  const row1 = markets.slice(0, 4);
  const row2 = markets.slice(4, 8);
  const row3 = markets.slice(8, 12);

  return (
    <section className="py-24 bg-black w-full overflow-hidden flex flex-col items-center">
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 35s linear infinite;
        }
        .animate-marquee-slow {
          animation: marquee 40s linear infinite;
        }
      `}</style>
      
      <div className="container px-4 text-center mb-16 mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Diverse Markets
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Trade the world's most popular assets with deep liquidity.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-8 w-full min-w-full">
         <MarqueeRow items={row1} direction="normal" speed="normal" />
         <MarqueeRow items={row2} direction="reverse" speed="slow" />
         <MarqueeRow items={row3} direction="normal" speed="slow" />
      </div>
    </section>
  );
}

function MarqueeRow({ items, direction, speed }: { items: typeof INITIAL_MARKETS, direction: "normal" | "reverse", speed: "normal" | "slow" }) {
    // Duplicate items to ensure smooth infinite scroll
    const marqueeItems = [...items, ...items, ...items, ...items]; 
    
    const animationClass = direction === "normal" 
        ? (speed === "normal" ? "animate-marquee" : "animate-marquee-slow")
        : "animate-marquee-reverse";

    return (
        <div className="flex overflow-hidden w-full relative">
            <div className={`flex gap-6 min-w-full ${animationClass} px-3`}>
                {marqueeItems.map((market, idx) => (
                    <MarketPill key={`${market.id}-${idx}`} market={market} />
                ))}
            </div>
        </div>
    );
}

function MarketPill({ market }: { market: typeof INITIAL_MARKETS[0] }) {
    const isPositive = market.change >= 0;

    return (
        <div className="flex items-center gap-4 rounded-full pl-2 pr-6 py-2 border border-white/5 bg-white/5 backdrop-blur-md min-w-[280px] shrink-0 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group">
             {/* Icon */}
             <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/20 shrink-0 overflow-hidden relative p-2">
                 <Image 
                    src={market.icon}
                    alt={market.name}
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                 />
             </div>
             
             <div className="flex flex-col flex-grow">
                 <div className="flex justify-between items-center w-full">
                      <span className="text-white font-bold group-hover:text-[#7C7EFF] transition-colors">{market.name}</span>
                      <span className="text-xs text-gray-500 group-hover:text-gray-400">{market.symbol}</span>
                 </div>
                 
                 <div className="flex justify-between items-center w-full mt-0.5">
                     <span className="text-white font-mono font-medium">
                        ${market.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                     </span>
                     <div className={`flex items-center gap-1 text-xs font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                         {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                         {Math.abs(market.change).toFixed(2)}%
                     </div>
                 </div>
             </div>
        </div>
    );
}
