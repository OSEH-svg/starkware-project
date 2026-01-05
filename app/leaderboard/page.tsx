"use client";

import { useState } from "react";
import { LeaderboardEntry } from "@/lib/types";
import { Podium } from "@/app/components/leaderboard/Podium";
import { LeaderboardList } from "@/app/components/leaderboard/LeaderboardList";
import { LeaderboardEmptyState } from "@/app/components/leaderboard/EmptyState";
import { TourOverlay } from "@/app/components/onboarding/TourOverlay";
import { LEADERBOARD_TOUR_STEPS } from "./tour-config";
import {Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

// MOCK DATA - In a real app, this would be fetched via React Query or SWR
const MOCK_DATA: LeaderboardEntry[] = [
  { rank: 1, name: "stark_whale.stark", pnl: 142390, formattedPnl: "+$142,390", winRate: 82, volume: "$12.5M", address: "0x1" },
  { rank: 2, name: "degen_legend.x", pnl: 98420, formattedPnl: "+$98,420", winRate: 76, volume: "$8.2M", address: "0x2" },
  { rank: 3, name: "cairo_master", pnl: 87100, formattedPnl: "+$87,100", winRate: 79, volume: "$7.9M", address: "0x3" },
  { rank: 4, name: "0x432...8a91", pnl: 65200, formattedPnl: "+$65,200", winRate: 68, volume: "$5.1M", address: "0x4" },
  { rank: 5, name: "builder_bob", pnl: 54800, formattedPnl: "+$54,800", winRate: 71, volume: "$4.5M", address: "0x5" },
  { rank: 6, name: "starknet_enjoyer", pnl: 42150, formattedPnl: "+$42,150", winRate: 64, volume: "$3.8M", address: "0x6" },
  { rank: 7, name: "alpha_seeker", pnl: 38900, formattedPnl: "+$38,900", winRate: 58, volume: "$3.2M", address: "0x7" },
  { rank: 8, name: "giga_brain.stark", pnl: 31200, formattedPnl: "+$31,200", winRate: 77, volume: "$2.9M", address: "0x8" },
  { rank: 9, name: "wagmi_fren", pnl: 28400, formattedPnl: "+$28,400", winRate: 52, volume: "$2.1M", address: "0x9" },
  { rank: 10, name: "rekt_survivor", pnl: 22100, formattedPnl: "+$22,100", winRate: 49, volume: "$1.8M", address: "0x10" },
];

export default function LeaderboardPage() {
  // Developer Toggle for "Empty State" vs "Populated State"
  // In production, this would be derived from: const { data } = useLeaderboard();
  const [isEmptyState, setIsEmptyState] = useState(false);

  return (
    <div className="flex flex-col items-center min-h-screen select-none">
      
      <div className="bg-[url('/background.svg')] bg-cover bg-center w-full min-h-[75vh] flex flex-col items-center pt-12">
        <div className="container px-4 md:px-8 flex flex-col items-center text-center space-y-6 relative z-10 w-full">

            <h1 className="text-4xl md:text-6xl font-normal tracking-tighter text-white">
              Hall of <span className="text-[#7C7EFF]">Fame</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trade with professional speed and liquidity. <br className="hidden md:block" />
              Climb the ranks to earn exclusive rewards and badges.
            </p>
        </div>
      </div>

      {/* DEV TOGGLE - Remove in production */}
      <div className="fixed bottom-4 right-4 z-50 opacity-10 hover:opacity-100 transition-opacity">
          <button 
            onClick={() => setIsEmptyState(!isEmptyState)}
            className="bg-red-900 text-white px-2 py-1 text-xs rounded shadow-lg"
          >
            Toggle Empty State
          </button>
      </div>

      {/* Tour Overlay */}
      <TourOverlay steps={LEADERBOARD_TOUR_STEPS} tourId="leaderboard" />

      {/* Main Content Area */}
      <div className="container px-4 md:px-8 -mt-64 relative z-20 flex flex-col items-center w-full">
          {isEmptyState ? (
            <LeaderboardEmptyState />
          ) : (
            <>
                <div id="leaderboard-podium" className="w-full flex justify-center mb-16">
                    <Podium topThree={MOCK_DATA.slice(0, 3)} />
                </div>

                {/* Leaderboards Section Header & Filter */}
                <div className="w-full max-w-4xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <h2 className="text-3xl md:text-4xl font-normal text-white tracking-tight font-serif">
                        Leaderboards
                    </h2>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                             <input 
                                type="text" 
                                placeholder="Search" 
                                className="w-full bg-[#0E0F15] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#7C7EFF]/50 transition-colors"
                             />
                        </div>
                        <button className="p-2.5 rounded-full bg-[#0E0F15] border border-white/10 text-muted-foreground hover:text-white hover:border-white/30 transition-colors">
                            <SlidersHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div id="leaderboard-list" className="w-full flex justify-center mb-16">
                    <LeaderboardList entries={MOCK_DATA.slice(3)} />
                </div>
            </>
          )}
      </div>

    </div>
  );
}
