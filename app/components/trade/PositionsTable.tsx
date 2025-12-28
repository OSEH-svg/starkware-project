"use client";

import { Card } from "@/app/components/ui/card";
import { cn } from "@/lib/utils";

interface Position {
  param: string;
  size: string;
  entry: number;
  mark: number;
  pnl: number;
  roe: number;
}

const MOCK_POSITIONS: Position[] = [
  //   { param: "BTC-USD", size: "0.5", entry: 64200, mark: 64500, pnl: 150, roe: 5.2 },
];

export function PositionsTable() {
  return (
    <Card className="h-full border-t border-x-0 border-b-0 rounded-none bg-background/50 backdrop-blur-sm flex flex-col">
      <div className="flex items-center px-4 py-3 border-b border-border gap-6">
        <span className="text-sm font-bold border-b-2 border-primary pb-3 -mb-3.5 text-foreground">
          Positions
        </span>
        <span className="text-sm font-medium text-muted-foreground pb-3 -mb-3.5 hover:text-foreground cursor-pointer">
          Open Orders
        </span>
        <span className="text-sm font-medium text-muted-foreground pb-3 -mb-3.5 hover:text-foreground cursor-pointer">
          History
        </span>
      </div>
      <div className="p-0 overflow-auto flex-1">
        <table className="w-full text-sm">
          <thead className="bg-secondary/30 text-xs text-muted-foreground uppercase sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Market</th>
              <th className="px-4 py-2 text-right font-medium">Size</th>
              <th className="px-4 py-2 text-right font-medium">Entry Price</th>
              <th className="px-4 py-2 text-right font-medium">Mark Price</th>
              <th className="px-4 py-2 text-right font-medium">Liq. Price</th>
              <th className="px-4 py-2 text-right font-medium">PnL</th>
              <th className="px-4 py-2 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_POSITIONS.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-12 text-muted-foreground"
                >
                  No open positions
                </td>
              </tr>
            ) : (
              MOCK_POSITIONS.map((p, i) => (
                <tr key={i}>
                  <td className="px-4 py-3">{p.param}</td>
                  {/* ... */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
