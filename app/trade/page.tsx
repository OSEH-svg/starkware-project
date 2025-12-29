"use client";

import { MarketList } from "../components/trade/MarketList";
import { OrderForm } from "../components/trade/OrderForm";
import { Chart } from "../components/trade/Chart";
import { PositionsTable } from "../components/trade/PositionsTable";
import { MarketStats } from "../components/trade/MarketStats";
import { Sheet } from "../components/ui/sheet";
import { useState } from "react";

export default function TradePage() {
  const [isMarketsOpen, setIsMarketsOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full bg-background overflow-hidden relative">
      {/* Mobile Market List Sheet */}
      <Sheet
        isOpen={isMarketsOpen}
        onClose={() => setIsMarketsOpen(false)}
        title="Markets"
        side="left"
      >
        <div className="h-full pt-2">
          <MarketList />
        </div>
      </Sheet>

      {/* Left Sidebar: Markets (Desktop Only) */}
      <div className="w-64 hidden xl:block border-r border-border h-full shrink-0">
        <MarketList />
      </div>

      {/* Center: Chart & Positions */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-y-auto lg:overflow-hidden">
        <div className="shrink-0 sticky top-0 z-10 bg-background">
          <MarketStats onMenuClick={() => setIsMarketsOpen(true)} />
        </div>

        {/* Main Content Scroll Area for Mobile */}
        <div className="flex-1 flex flex-col lg:h-full lg:overflow-hidden">
          <div className="flex-1 border-b border-border relative min-h-[400px] lg:min-h-[300px]">
            <Chart />
          </div>

          {/* Mobile Order Form (Stacked below chart on mobile, hidden on desktop) */}
          <div className="lg:hidden border-b border-border p-4 bg-background">
            <OrderForm isMobile />
          </div>

          <div className="h-72 shrink-0 border-b lg:border-none border-border">
            <PositionsTable />
          </div>
        </div>
      </div>

      {/* Right: Order Form (Desktop Only) */}
      <div className="hidden lg:block w-80 border-l border-border h-full bg-background/50 shrink-0">
        <OrderForm />
      </div>
    </div>
  );
}
