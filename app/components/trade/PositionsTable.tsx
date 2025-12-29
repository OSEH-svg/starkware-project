"use client";

import { usePositions } from "@/app/hooks/usePositions";
import { cn } from "@/lib/utils";

export function PositionsTable() {
  const { data: positions, isLoading } = usePositions();

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading positions...
      </div>
    );
  }

  if (!positions || positions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <p>No open positions</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground uppercase bg-white/5">
          <tr>
            <th className="px-4 py-3">Market</th>
            <th className="px-4 py-3">Side</th>
            <th className="px-4 py-3 text-right">Size</th>
            <th className="px-4 py-3 text-right">Value</th>
            <th className="px-4 py-3 text-right">Entry Price</th>
            <th className="px-4 py-3 text-right">Mark Price</th>
            <th className="px-4 py-3 text-right">Liq. Price</th>
            <th className="px-4 py-3 text-right">PnL</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr
              key={position.id}
              className="border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <td className="px-4 py-3 font-medium">{position.market}</td>
              <td
                className={cn(
                  "px-4 py-3 font-medium",
                  position.side === "LONG" ? "text-green-500" : "text-red-500"
                )}
              >
                {position.side}
              </td>
              <td className="px-4 py-3 text-right">{position.size}</td>
              <td className="px-4 py-3 text-right">
                {parseFloat(position.value).toLocaleString()} USD
              </td>
              <td className="px-4 py-3 text-right">
                {parseFloat(position.openPrice).toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right">
                {parseFloat(position.markPrice).toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right text-orange-500">
                {parseFloat(position.liquidationPrice).toLocaleString()}
              </td>
              <td
                className={cn(
                  "px-4 py-3 text-right font-medium",
                  parseFloat(position.unrealisedPnl) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                )}
              >
                {parseFloat(position.unrealisedPnl) >= 0 ? "+" : ""}
                {parseFloat(position.unrealisedPnl).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
