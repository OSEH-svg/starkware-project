"use client";

import { MarketList } from "../components/trade/MarketList";
import { OrderForm } from "../components/trade/OrderForm";
import { Chart } from "../components/trade/Chart";
import { PositionsTable } from "../components/trade/PositionsTable";
import { MarketStats } from "../components/trade/MarketStats";
import { Orderbook } from "../components/trade/Orderbook";
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

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row lg:h-full lg:overflow-hidden">
          {/* Chart Column (Flexible) */}
          <div className="flex-1 flex flex-col overflow-hidden min-h-[400px]">
            <div className="flex-1 border-b lg:border-r border-border relative">
              <Chart />
            </div>
            {/* Positions Table (Bottom of Chart on Desktop) */}
            <div className="h-64 shrink-0 border-t border-border hidden lg:block overflow-hidden">
              <PositionsTable />
            </div>
          </div>

          {/* Orderbook Column (Desktop Only - Fixed Width) */}
          <div className="hidden lg:block w-64 border-r border-border h-full shrink-0">
            <Orderbook />
          </div>

          {/* Mobile Stuff (Stacked) */}
          <div className="lg:hidden">
            <div className="border-b border-border p-4 bg-background">
              <OrderForm isMobile />
            </div>
            <div className="h-72 border-b border-border">
              <PositionsTable />
            </div>
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
