"use client";

import { cn } from "@/lib/utils";
import { LeaderboardEntry } from "@/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";

interface PodiumProps {
  topThree: LeaderboardEntry[];
}

export function Podium({ topThree }: PodiumProps) {
  const sorted = [...topThree].sort((a, b) => a.rank - b.rank);
  const first = sorted.find((x) => x.rank === 1);
  const second = sorted.find((x) => x.rank === 2);
  const third = sorted.find((x) => x.rank === 3);

  if (!first) return null;

  return (
    <div className="flex flex-row items-end justify-center gap-2 md:gap-8 mb-12 w-full max-w-5xl px-2 md:px-0">
      {second && (
        <PodiumCard 
          rank={2} 
          data={second} 
          delay={0.2}
          medalSrc="/icons/secondMedal.png"
        />
      )}

      <PodiumCard
        rank={1}
        data={first}
        className="h-[280px] md:h-[420px] md:mb-22 z-20"
        delay={0}
        medalSrc="/icons/firstMedal.png"
        isFirst
      />

      {third && (
        <PodiumCard 
          rank={3} 
          data={third} 
          delay={0.4}
          medalSrc="/icons/thirdMedal.png"
        />
      )}
    </div>
  );
}

function PodiumCard({ 
    rank, 
    data, 
    className, 
    medalSrc, 
    delay,
    isFirst = false
}: { 
    rank: number; 
    data: LeaderboardEntry; 
    className?: string; 
    medalSrc: string; 
    delay: number;
    isFirst?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, type: "spring", bounce: 0.3 }}
      className={cn(
        "relative w-1/3 md:w-[220px] flex flex-col items-center",
        isFirst ? "order-first md:order-none" : "", 
        className
      )}
    >
    
        <div 
            className={`
                absolute inset-0 rounded-t-[60px] md:rounded-t-[140px] border border-white/10
                bg-linear-to-b from-[#7C7EFF]/0 to-[#7C7EFF]/40
                ${isFirst ? 'from-[#1a1b26] to-[#0A0B10]' : ''}
            `}
            style={{
                maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
            }}
        />
        
        <div className={cn(
            "relative z-10 flex flex-col items-center justify-start pt-2 pb-6 w-full h-[220px] md:h-[380px]",
            isFirst ? "pt-2 h-full" : ""
        )}>
            <div className={`
                relative mb-3 md:mb-6 flex items-center justify-center
                rounded-full bg-[#050505] border border-white/5 shadow-2xl
                ${isFirst ? 'w-24 h-24 md:w-40 md:h-40' : 'w-20 h-20 md:w-32 md:h-32'}
            `}>
                <Image 
                    src={medalSrc} 
                    alt={`Rank ${rank}`} 
                    width={isFirst ? 110 : 90} 
                    height={isFirst ? 110 : 90}
                    className="object-contain w-[70%] h-[70%]"
                />
            </div>

            {/* User Info */}
            <div className="text-center space-y-1 md:space-y-2 px-1 md:px-4 w-full">
                <div className="font-semibold text-xs md:text-lg text-white truncate w-full">
                    {data.name}
                </div>
                
                <div className="text-[#00FF57] font-bold text-sm md:text-2xl tracking-tight">
                    {data.formattedPnl}
                </div>
                
                {/* Address Pill */}
                <div className="pt-2 md:pt-4">
                     <span className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-black/40 border border-white/5 text-[8px] md:text-xs text-gray-500 font-mono">
                        {data.address ? `${data.address.slice(0, 4)}..${data.address.slice(-4)}` : "0x..."}
                     </span>
                </div>
            </div>
        </div>
    </motion.div>
  );
}
