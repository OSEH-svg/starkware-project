import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

export interface Order {
  orderId: string;
  market: string;
  side: "BUY" | "SELL";
  size: string;
  price: string;
  type: "LIMIT" | "MARKET";
  status: "OPEN" | "FILLED" | "CANCELLED";
  timestamp: number;
  filledSize: string;
}

export function useOrders(status: "OPEN" | "HISTORY" = "OPEN") {
  return useQuery({
    queryKey: ["orders", status],
    queryFn: async () => {
      // Switch endpoint based on status
      const endpoint =
        status === "HISTORY"
          ? "/user/orders/history"
          : "/user/orders?status=OPEN";

      const { data } = await api.get(endpoint);
      return data as Order[];
    },
    // Poll every 5 seconds for updates
    refetchInterval: 5000,
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      // Endpoint assumption: DELETE /orders/{id}
      // Some APIs require signature for cancel, others just API Key.
      // We'll try standard REST delete first.
      await api.delete(`/orders/${orderId}`);
    },
    onSuccess: () => {
      toast.success("Order cancelled");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] }); // tailored updates
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to cancel order");
    },
  });
}
