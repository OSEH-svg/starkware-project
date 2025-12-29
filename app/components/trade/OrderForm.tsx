"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Tabs } from "@/app/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useCreateOrder } from "@/app/hooks/useCreateOrder";
import { useBalance } from "@/app/hooks/useBalance";
import { useMarkets } from "@/app/hooks/useMarkets";
import { useTradeStore } from "@/app/store/useTradeStore";

interface OrderFormProps {
  isMobile?: boolean;
}

export function OrderForm({ isMobile }: OrderFormProps) {
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const [type, setType] = useState<"LIMIT" | "MARKET">("LIMIT");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [leverage, setLeverage] = useState(1);

  const { activeMarket } = useTradeStore();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { data: balanceData } = useBalance();
  const { data: markets } = useMarkets();

  // Find stats for active market
  const marketStats = markets?.find(
    (m) => m.name === activeMarket
  )?.marketStats;

  const handleSubmit = () => {
    let finalPrice = price;

    if (type === "MARKET" && marketStats) {
      // Simple Market Order simulation: Last Price * 1.05 (Buy) or * 0.95 (Sell)
      const basePrice = parseFloat(marketStats.lastPrice);
      if (side === "BUY") {
        finalPrice = (basePrice * 1.05).toFixed(2);
      } else {
        finalPrice = (basePrice * 0.95).toFixed(2);
      }
    }

    createOrder(
      {
        market: activeMarket,
        side,
        size,
        price: finalPrice,
      },
      {
        onSuccess: () => {
          alert("Order Signed and Sent!");
          setSize("");
          setPrice("");
        },
      }
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-secondary/5 border-white/5",
        isMobile ? "w-full border rounded-lg" : "w-[320px] border-l"
      )}
    >
      <div className="border-b border-white/5 px-4 py-3 bg-secondary/10">
        <h2 className="font-bold text-sm text-foreground">{activeMarket}</h2>
      </div>

      <div className="border-b border-white/5">
        <Tabs
          tabs={[
            { id: "LIMIT", label: "Limit" },
            { id: "MARKET", label: "Market" },
          ]}
          activeTab={type}
          onChange={(id) => setType(id as "LIMIT" | "MARKET")}
          className="bg-transparent w-full rounded-none p-0"
        />
      </div>

      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        {/* Side Selector */}
        <div className="grid grid-cols-2 gap-2 bg-background/50 p-1 rounded-lg">
          <button
            onClick={() => setSide("BUY")}
            className={cn(
              "py-2 text-sm font-medium rounded-md transition-all",
              side === "BUY"
                ? "bg-green-500/10 text-green-500 shadow-sm"
                : "text-muted-foreground hover:bg-white/5"
            )}
          >
            Buy / Long
          </button>
          <button
            onClick={() => setSide("SELL")}
            className={cn(
              "py-2 text-sm font-medium rounded-md transition-all",
              side === "SELL"
                ? "bg-red-500/10 text-red-500 shadow-sm"
                : "text-muted-foreground hover:bg-white/5"
            )}
          >
            Sell / Short
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Price (USD)</span>
              {type === "MARKET" && (
                <span className="text-primary">Market Price</span>
              )}
            </div>
            {type === "LIMIT" ? (
              <Input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            ) : (
              <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/20 text-sm text-muted-foreground flex items-center">
                {marketStats
                  ? parseFloat(marketStats.lastPrice).toLocaleString()
                  : "Loading..."}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Size ({activeMarket.split("-")[0]})</span>
            </div>
            <Input
              type="number"
              placeholder="0.00"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Leverage</span>
              <span>{leverage}x</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={leverage}
              onChange={(e) => setLeverage(parseInt(e.target.value))}
              className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground px-1">
              <span>1x</span>
              <span>10x</span>
              <span>20x</span>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-2 pt-4 border-t border-white/5 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Available</span>
            <span className="text-foreground">
              {balanceData
                ? parseFloat(balanceData.availableForTrade).toLocaleString()
                : "0.00"}{" "}
              USD
            </span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Builder Code</span>
            <span className="text-primary font-mono">ANTIGRAVITY</span>
          </div>
        </div>

        <Button
          className={cn(
            "w-full py-6 text-lg font-bold",
            side === "BUY"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          )}
          onClick={handleSubmit}
          disabled={isPending || !size || (type === "LIMIT" && !price)}
        >
          {isPending
            ? "Signing..."
            : side === "BUY"
            ? "Buy / Long"
            : "Sell / Short"}
        </Button>
      </div>
    </div>
  );
}
