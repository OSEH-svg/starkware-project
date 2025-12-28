"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const LEADERBOARD_DATA = [
  { rank: 1, name: "stark_whale.stark", pnl: "+$142,390", winRate: "82%" },
  { rank: 2, name: "degen_legend.x", pnl: "+$98,420", winRate: "76%" },
  { rank: 3, name: "cairo_master", pnl: "+$87,100", winRate: "79%" },
  { rank: 4, name: "0x432...8a91", pnl: "+$65,200", winRate: "68%" },
  { rank: 5, name: "builder_bob", pnl: "+$54,800", winRate: "71%" },
  { rank: 6, name: "starknet_enjoyer", pnl: "+$42,150", winRate: "64%" },
  { rank: 7, name: "alpha_seeker", pnl: "+$38,900", winRate: "58%" },
  { rank: 8, name: "giga_brain.stark", pnl: "+$31,200", winRate: "77%" },
  { rank: 9, name: "wagmi_fren", pnl: "+$28,400", winRate: "52%" },
  { rank: 10, name: "rekt_survivor", pnl: "+$22,100", winRate: "49%" },
];

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
          Hall of Fame
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Compete against the best traders on Starknet. Earn rewards, distinct
          badges, and eternal glory.
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-12 w-full max-w-4xl">
        <PodiumCard rank={2} data={LEADERBOARD_DATA[1]} />
        <PodiumCard
          rank={1}
          data={LEADERBOARD_DATA[0]}
          className="h-64 border-primary/50 bg-primary/5 shadow-[0_0_30px_rgba(0,255,157,0.1)]"
        />
        <PodiumCard rank={3} data={LEADERBOARD_DATA[2]} />
      </div>

      {/* Rest of the List */}
      <div className="w-full max-w-4xl space-y-2">
        {LEADERBOARD_DATA.slice(3).map((trader) => (
          <div
            key={trader.rank}
            className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 text-center font-mono font-bold text-muted-foreground">
                #{trader.rank}
              </div>
              <div className="font-medium text-foreground">{trader.name}</div>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Win Rate</div>
                <div>{trader.winRate}</div>
              </div>
              <div className="text-right w-24">
                <div className="text-xs text-muted-foreground">PnL</div>
                <div className="font-bold text-green-500">{trader.pnl}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PodiumCard({ rank, data, className }: any) {
  return (
    <Card
      className={cn(
        "relative flex flex-col items-center justify-end p-6 w-full md:w-1/3 min-h-[200px] border-white/10 bg-white/5 backdrop-blur-sm transition-transform hover:-translate-y-1",
        className
      )}
    >
      <div className="absolute -top-6">
        {rank === 1 && (
          <Trophy className="h-12 w-12 text-yellow-400 drop-shadow-lg" />
        )}
        {rank === 2 && (
          <Medal className="h-10 w-10 text-gray-400 drop-shadow-lg" />
        )}
        {rank === 3 && (
          <Award className="h-10 w-10 text-amber-700 drop-shadow-lg" />
        )}
      </div>
      <div className="mt-8 text-center space-y-1">
        <div className="text-2xl font-bold font-mono text-foreground">
          {rank}
        </div>
        <div className="font-medium truncate max-w-[120px] mx-auto">
          {data.name}
        </div>
        <div className="text-green-500 font-bold text-lg">{data.pnl}</div>
        <div className="text-xs text-muted-foreground">
          {data.winRate} Win Rate
        </div>
      </div>
    </Card>
  );
}
