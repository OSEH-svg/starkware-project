"use client";

import { useState } from "react";
import { PositionsTable } from "./PositionsTable";
import { OpenOrdersTable } from "./OpenOrdersTable";

export function UserActivity() {
  const [activeTab, setActiveTab] = useState("POSITIONS");

  return (
    <div className="flex flex-col h-full bg-background border-t border-border">
      <div className="border-b border-border px-4 flex items-center gap-6">
        <button
          onClick={() => setActiveTab("POSITIONS")}
          className={`py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "POSITIONS"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Positions
        </button>
        <button
          onClick={() => setActiveTab("OPEN_ORDERS")}
          className={`py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "OPEN_ORDERS"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Open Orders
        </button>
        <button
          onClick={() => setActiveTab("HISTORY")}
          className={`py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "HISTORY"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Trade History
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-card/50">
        {activeTab === "POSITIONS" && <PositionsTable />}
        {activeTab === "OPEN_ORDERS" && <OpenOrdersTable status="OPEN" />}
        {activeTab === "HISTORY" && <OpenOrdersTable status="HISTORY" />}
      </div>
    </div>
  );
}
