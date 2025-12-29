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
      const response = await api.get<
        any,
        {
          status: string;
          data: {
            bid: { price: string; qty: string }[];
            ask: { price: string; qty: string }[];
          };
        }
      >(`/info/markets/${market}/orderbook`);

      // Transform API format { bid: [{price, qty}], ask: ... } to { bids: [[price, size]], asks: ... }
      return {
        market,
        bids: response.data.bid?.map((b) => [b.price, b.qty]) || [],
        asks: response.data.ask?.map((a) => [a.price, a.qty]) || [],
      } as OrderbookData;
    },
    refetchInterval: 2000, // Faster polling for orderbook
    enabled: !!market,
  });
}
