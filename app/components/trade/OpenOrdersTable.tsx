"use client";

import { useOrders, useCancelOrder } from "@/app/hooks/useOrders";
import { Loader2, Trash2 } from "lucide-react";
import { format } from "date-fns";

export function OpenOrdersTable({
  status = "OPEN",
}: {
  status?: "OPEN" | "HISTORY";
}) {
  const { data: orders, isLoading } = useOrders(status);
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading Orders...
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
        <p className="text-sm">No open orders</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-muted-foreground font-medium border-b border-white/5 bg-secondary/10">
          <tr>
            <th className="py-3 px-4">Time</th>
            <th className="py-3 px-4">Market</th>
            <th className="py-3 px-4">Side</th>
            <th className="py-3 px-4 text-right">Size</th>
            <th className="py-3 px-4 text-right">Price</th>
            <th className="py-3 px-4 text-right">Filled</th>
            <th className="py-3 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.orderId}
              className="border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <td className="py-3 px-4 font-mono text-muted-foreground">
                {format(new Date(order.timestamp), "HH:mm:ss")}
              </td>
              <td className="py-3 px-4 font-medium">{order.market}</td>
              <td
                className={`py-3 px-4 font-bold ${
                  order.side === "BUY" ? "text-green-500" : "text-red-500"
                }`}
              >
                {order.side}
              </td>
              <td className="py-3 px-4 text-right font-mono">{order.size}</td>
              <td className="py-3 px-4 text-right font-mono">
                {parseFloat(order.price).toLocaleString()}
              </td>
              <td className="py-3 px-4 text-right text-muted-foreground">
                {order.filledSize} / {order.size}
              </td>
              <td className="py-3 px-4 text-right">
                <button
                  onClick={() => cancelOrder(order.orderId)}
                  disabled={isCancelling}
                  className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                  title="Cancel Order"
                >
                  {isCancelling ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
