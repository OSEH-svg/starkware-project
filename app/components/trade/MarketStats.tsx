"use client";

import { useMarkets } from "@/app/hooks/useMarkets";
import { useTradeStore } from "@/app/store/useTradeStore";
import { cn } from "@/lib/utils";

import { Menu } from "lucide-react";

interface MarketStatsProps {
  onMenuClick?: () => void;
}

export function MarketStats({ onMenuClick }: MarketStatsProps) {
  const { activeMarket } = useTradeStore();
  const { data: markets, isLoading } = useMarkets();

  // Find the stats for the active market
  const activeMarketData = markets?.find((m) => m.name === activeMarket);
  const stats = activeMarketData?.marketStats;

  if (isLoading)
    return (
      <div className="h-14 flex items-center px-4 text-xs text-muted-foreground animate-pulse">
        Loading stats...
      </div>
    );

  if (!activeMarketData || !stats)
    return (
      <div className="h-14 flex items-center px-4 text-xs text-muted-foreground">
        Select a market
      </div>
    );

  const priceChange = parseFloat(stats.dailyPriceChangePercentage || "0");
  const isPositive = priceChange >= 0;

  return (
    <div className="flex items-center gap-6 px-4 py-2 border-b border-white/5 bg-background/50 backdrop-blur-sm h-16 w-full overflow-x-auto no-scrollbar whitespace-nowrap">
      {/* Mobile Menu Trigger */}
      <button
        onClick={onMenuClick}
        className="xl:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground shrink-0"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex flex-col shrink-0">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          {activeMarketData.name}
        </h2>
      </div>

      <div className="flex flex-col shrink-0 min-w-[80px]">
        <span className="text-xs text-muted-foreground">Price</span>
        <span className="text-sm font-bold text-foreground">
          {parseFloat(stats.lastPrice).toLocaleString()}
        </span>
      </div>

      <div className="flex flex-col shrink-0 min-w-[80px]">
        <span className="text-xs text-muted-foreground">24h Change</span>
        <span
          className={cn(
            "text-sm font-medium",
            isPositive ? "text-green-500" : "text-red-500"
          )}
        >
          {isPositive ? "+" : ""}
          {stats.dailyPriceChangePercentage}%
        </span>
      </div>

      <div className="flex flex-col shrink-0 min-w-[80px]">
        <span className="text-xs text-muted-foreground">24h Volume</span>
        <span className="text-sm font-medium text-foreground">
          ${parseFloat(stats.dailyVolume).toLocaleString()}
        </span>
      </div>

      <div className="flex flex-col shrink-0 min-w-[80px]">
        <span className="text-xs text-muted-foreground">24h High</span>
        <span className="text-sm font-medium text-foreground">
          $
          {parseFloat(
            activeMarketData.marketStats.dailyHigh || "0"
          ).toLocaleString()}
        </span>
      </div>

      <div className="flex flex-col shrink-0 min-w-[80px]">
        <span className="text-xs text-muted-foreground">24h Low</span>
        <span className="text-sm font-medium text-foreground">
          $
          {parseFloat(
            activeMarketData.marketStats.dailyLow || "0"
          ).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
