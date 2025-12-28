"use client";

import { MarketList } from "../components/trade/MarketList";
import { OrderForm } from "../components/trade/OrderForm";
import { Chart } from "../components/trade/Chart";
import { PositionsTable } from "../components/trade/PositionsTable";

export default function TradePage() {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full bg-background overflow-hidden">
      {/* Left Sidebar: Markets (Hidden on mobile, visible on XL screens) */}
      <div className="w-64 hidden xl:block border-r border-border h-full shrink-0">
        <MarketList />
      </div>

      {/* Center: Chart & Positions */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        <div className="flex-1 border-b border-border relative min-h-[300px]">
          <Chart />
        </div>
        <div className="h-72 shrink-0">
          <PositionsTable />
        </div>
      </div>

      {/* Right: Order Form */}
      <div className="w-full lg:w-80 border-l border-border h-full bg-background/50 shrink-0 overflow-y-auto lg:overflow-visible">
        <OrderForm />
      </div>
    </div>
  );
}
