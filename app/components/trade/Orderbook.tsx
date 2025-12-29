"use client";

import { useOrderbook } from "@/app/hooks/useOrderbook";
import { useTradeStore } from "@/app/store/useTradeStore";
import { cn } from "@/lib/utils";

export function Orderbook() {
  const { activeMarket } = useTradeStore();
  const { data: orderbook, isLoading } = useOrderbook(activeMarket);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
        Loading Orderbook...
      </div>
    );
  }

  if (!orderbook) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
        No Data
      </div>
    );
  }

  // Helper to render rows
  const renderRow = (price: string, size: string, side: "bid" | "ask") => {
    // Simple mock depth visualization using background gradient could be added here
    return (
      <div
        key={price}
        className="grid grid-cols-3 gap-2 py-0.5 text-xs hover:bg-white/5 cursor-pointer"
      >
        <span
          className={cn(
            "text-left",
            side === "bid" ? "text-green-500" : "text-red-500"
          )}
        >
          {parseFloat(price).toLocaleString()}
        </span>
        <span className="text-right text-foreground">
          {parseFloat(size).toFixed(4)}
        </span>
        <span className="text-right text-muted-foreground">
          {(parseFloat(price) * parseFloat(size)).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-hidden border-r border-border bg-background/50">
      <div className="px-3 py-2 border-b border-border bg-secondary/10 shrink-0">
        <h3 className="text-xs font-bold text-muted-foreground uppercase">
          Order Book
        </h3>
      </div>

      {/* Headers */}
      <div className="grid grid-cols-3 gap-2 px-3 py-1.5 text-[10px] items-center text-muted-foreground border-b border-white/5 shrink-0">
        <span className="text-left">Price (USD)</span>
        <span className="text-right">Size</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (Sells) - Red - Reverse order to show lowest ask at bottom */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col justify-end pb-1">
          {orderbook.asks
            .slice(0, 15)
            .reverse()
            .map(([price, size]) => renderRow(price, size, "ask"))}
        </div>
      </div>

      {/* Spread / Last Price Placeholder */}
      <div className="py-1 border-y border-white/5 bg-white/5 text-center shrink-0 my-0.5">
        <span
          className={cn(
            "text-sm font-bold",
            // Determine color based on spread or last price (mock logic for color)
            "text-foreground"
          )}
        >
          {/* We could show spread here */}
          Spread
        </span>
      </div>

      {/* Bids (Buys) - Green */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto no-scrollbar pt-1">
          {orderbook.bids
            .slice(0, 15)
            .map(([price, size]) => renderRow(price, size, "bid"))}
        </div>
      </div>
    </div>
  );
}
