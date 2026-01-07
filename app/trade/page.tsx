"use client";

import { MarketList } from "../components/trade/MarketList";
import { OrderForm } from "../components/trade/OrderForm";
import { Chart } from "../components/trade/Chart";
import { UserActivity } from "../components/trade/UserActivity";
import { PositionsTable } from "../components/trade/PositionsTable";
import { MarketStats } from "../components/trade/MarketStats";
import { Orderbook } from "../components/trade/Orderbook";
import { Sheet } from "../components/ui/sheet";
import { useState } from "react";
import { TourOverlay } from "@/app/components/onboarding/TourOverlay";
import { TRADE_TOUR_STEPS } from "./tour-config";

export default function TradePage() {
  const [isMarketsOpen, setIsMarketsOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full bg-background overflow-hidden relative">
      <TourOverlay steps={TRADE_TOUR_STEPS} tourId="trade" />

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
      <div
        id="market-list-panel"
        className="w-75 hidden xl:block border-r border-border h-full shrink-0"
      >
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
          <div
            id="chart-container"
            className="flex-1 flex flex-col overflow-hidden min-h-[400px] min-w-0"

          >
            <div className="flex-1 border-b lg:border-r border-border relative">
              <Chart />
            </div>
            {/* Positions Table (Bottom of Chart on Desktop) */}
            <div
              id="positions-table"
              className="h-64 shrink-0 border-t border-border hidden lg:block overflow-hidden"
            >
              <PositionsTable />
            </div>
          </div>

          {/* Orderbook Column (Desktop Only - Fixed Width) */}
          <div className="hidden lg:block w-60 border-r border-border h-full shrink-0 ml-2">
            <Orderbook />
          </div>

          {/* Mobile Stuff (Stacked) */}
          <div className="lg:hidden">
            <div className="border-b border-border p-4 bg-background">
              <OrderForm isMobile />
            </div>
            <div className="h-72 border-b border-border">
              <UserActivity />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Order Form (Desktop Only) */}
      <div
        id="order-form-panel"
        className="hidden lg:block w-80 border-l border-border h-full bg-background/50 shrink-0"
      >
        <OrderForm />
      </div>
    </div>
  );
}
