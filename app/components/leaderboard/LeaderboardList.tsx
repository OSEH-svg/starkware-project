"use client";

import { LeaderboardEntry } from "@/lib/types";
import { motion } from "framer-motion";

interface LeaderboardListProps {
  entries: LeaderboardEntry[];
}

export function LeaderboardList({ entries }: LeaderboardListProps) {
  return (
    <div className="w-full max-w-4xl space-y-2">
      {/* List Header - Targeted by Tour */}
      <div 
        id="leaderboard-list-header"
        className="flex items-center justify-between p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider"
      >
         <div className="flex items-center gap-4 md:gap-8 w-1/3">
            <span className="w-8 text-center">Rank</span>
            <span>Trader</span>
         </div>
         <div className="flex items-center gap-4 md:gap-12 text-sm justify-end w-2/3">
             <span className="hidden md:block w-20 text-right">Volume</span>
             <span className="w-24 text-right">PnL</span>
         </div>
      </div>

      {entries.map((trader, index) => (
        <motion.div
          key={trader.rank}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + (index * 0.05) }}
          className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#0E0F15] hover:bg-[#13141b] hover:border-[#7C7EFF]/20 transition-all cursor-pointer shadow-sm"
        >
          <div className="flex items-center gap-4 md:gap-8">
            <div className="w-8 text-center font-mono font-bold text-muted-foreground group-hover:text-white transition-colors">
              #{trader.rank}
            </div>
            <div className="flex flex-col">
                 <span className="font-medium text-foreground text-sm md:text-base group-hover:text-[#7C7EFF] transition-colors">
                    {trader.name}
                 </span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-12 text-sm">
            <div className="text-right hidden md:block">
              <div className="text-xs text-muted-foreground mb-1">Volume</div>
              <div className="font-medium">{trader.volume}</div>
            </div>
            <div className="text-right w-24">
              <div className="text-xs text-muted-foreground mb-1">PnL</div>
              <div className="font-bold text-green-500">{trader.formattedPnl}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
