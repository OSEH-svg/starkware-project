"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Mock Data Configuration
const INITIAL_MARKETS = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", price: 64230.50, change: 2.4, color: "from-orange-500 to-orange-600", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { id: "eth", name: "Ethereum", symbol: "ETH", price: 3450.12, change: 1.8, color: "from-blue-500 to-blue-600", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { id: "strk", name: "Starknet", symbol: "STRK", price: 1.24, change: 5.2, color: "from-indigo-500 to-indigo-600", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
  { id: "bnb", name: "BNB", symbol: "BNB", price: 590.45, change: -0.5, color: "from-yellow-500 to-yellow-600", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  { id: "sol", name: "Solana", symbol: "SOL", price: 145.67, change: 4.1, color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { id: "avax", name: "Avalanche", symbol: "AVAX", price: 35.89, change: -1.2, color: "from-red-500 to-red-600", bg: "bg-red-500/10", border: "border-red-500/20" },
  { id: "sei", name: "Sei", symbol: "SEI", price: 0.65, change: 8.4, color: "from-teal-500 to-teal-600", bg: "bg-teal-500/10", border: "border-teal-500/20" },
  { id: "tron", name: "Tron", symbol: "TRX", price: 0.12, change: 0.8, color: "from-rose-500 to-rose-600", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  { id: "link", name: "Chainlink", symbol: "LINK", price: 18.45, change: 3.2, color: "from-blue-400 to-blue-500", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  { id: "matic", name: "Polygon", symbol: "MATIC", price: 0.72, change: -0.4, color: "from-purple-500 to-purple-600", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { id: "arb", name: "Arbitrum", symbol: "ARB", price: 1.15, change: 2.1, color: "from-cyan-500 to-cyan-600", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { id: "doge", name: "Dogecoin", symbol: "DOGE", price: 0.16, change: 1.5, color: "from-amber-500 to-amber-600", bg: "bg-amber-500/10", border: "border-amber-500/20" },
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
        <div className={`flex items-center gap-4 rounded-full pl-2 pr-6 py-2 border ${market.border} ${market.bg} backdrop-blur-md min-w-[280px] shrink-0 hover:bg-white/10 transition-colors duration-300`}>
             {/* Icon Placeholder (Stylized Circle with Initial) */}
             <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${market.color} shadow-lg shrink-0`}>
                 <span className="font-bold text-white text-lg">{market.symbol[0]}</span>
             </div>
             
             <div className="flex flex-col flex-grow">
                 <div className="flex justify-between items-center w-full">
                      <span className="text-white font-bold">{market.name}</span>
                      <span className="text-xs text-gray-400">{market.symbol}</span>
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
