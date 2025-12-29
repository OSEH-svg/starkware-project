import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface OrderbookData {
  market: string;
  bids: [string, string][]; // [price, size]
  asks: [string, string][];
}

interface OrderbookResponse {
  status: string;
  data: OrderbookData;
}

export function useOrderbook(market: string) {
  return useQuery({
    queryKey: ["orderbook", market],
    queryFn: async () => {
      const response = await api.get<any, OrderbookResponse>(
        `/info/markets/${market}/orderbook`
      );
      return response.data;
    },
    refetchInterval: 2000, // Faster polling for orderbook
    enabled: !!market,
  });
}
