"use client";

import { Card, CardHeader, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const MOCK_MARKETS = [
  { pair: "BTC-USD", price: 68432.5, change: 2.4 },
  { pair: "ETH-USD", price: 3450.12, change: -1.2 },
  { pair: "STRK-USD", price: 1.85, change: 5.7 },
  { pair: "SOL-USD", price: 145.2, change: 3.1 },
  { pair: "DOGE-USD", price: 0.12, change: -0.5 },
];

export function MarketList() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_MARKETS.filter((m) =>
    m.pair.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="h-full border-r border-y-0 border-l-0 rounded-none bg-background/50 backdrop-blur-sm flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-8 bg-secondary/50 border-none"
            placeholder="Search markets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filtered.map((m) => (
          <div
            key={m.pair}
            className="flex justify-between items-center p-4 hover:bg-secondary/30 cursor-pointer transition-colors border-b border-border/50"
          >
            <div className="flex flex-col">
              <span className="font-bold text-sm text-foreground">
                {m.pair}
              </span>
              <span className="text-xs text-muted-foreground">Perpetual</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-mono text-sm">
                {m.price.toLocaleString()}
              </span>
              <span
                className={cn(
                  "text-xs flex items-center",
                  m.change >= 0 ? "text-green-500" : "text-red-500"
                )}
              >
                {m.change >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {m.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
