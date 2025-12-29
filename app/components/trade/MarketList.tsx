"use client";

import { useMarkets } from "@/app/hooks/useMarkets";
import { useTradeStore } from "@/app/store/useTradeStore";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

export function MarketList() {
  const { data: markets, isLoading } = useMarkets();
  const { activeMarket, setActiveMarket } = useTradeStore();
  const [search, setSearch] = useState("");

  const filteredMarkets =
    markets?.filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <div className="flex flex-col h-full bg-secondary/5 border-r border-white/5 w-[300px]">
      <div className="p-4 border-b border-white/5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search markets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-3 px-4 py-2 text-xs font-medium text-muted-foreground">
          <div>Market</div>
          <div className="text-right">Price</div>
          <div className="text-right">24h</div>
        </div>

        {isLoading ? (
          <div className="p-4 text-center text-xs text-muted-foreground">
            Loading markets...
          </div>
        ) : (
          filteredMarkets.map((market) => (
            <div
              key={market.name}
              onClick={() => setActiveMarket(market.name)}
              className={cn(
                "grid grid-cols-3 px-4 py-3 cursor-pointer transition-colors border-b border-white/[0.02]",
                activeMarket === market.name
                  ? "bg-white/10"
                  : "hover:bg-white/5"
              )}
            >
              <div className="font-medium text-sm truncate pr-2">
                {market.name}
              </div>
              <div className="text-right text-sm truncate">
                {parseFloat(market.marketStats.lastPrice).toLocaleString()}
              </div>
              <div
                className={cn(
                  "text-right text-sm truncate",
                  parseFloat(market.marketStats.dailyPriceChangePercentage) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                )}
              >
                {parseFloat(market.marketStats.dailyPriceChangePercentage) >= 0
                  ? "+"
                  : ""}
                {market.marketStats.dailyPriceChangePercentage}%
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
