import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Market {
  name: string;
  assetName: string;
  assetPrecision: number;
  marketStats: {
    lastPrice: string;
    dailyPriceChangePercentage: string;
    dailyVolume: string;
    dailyHigh?: string;
    dailyLow?: string;
    askPrice?: string;
    bidPrice?: string;
  };
  active: boolean;
}

interface MarketsResponse {
  status: string;
  data: Market[];
}

export function useMarkets() {
  return useQuery({
    queryKey: ["markets"],
    queryFn: async () => {
      const response = await api.get<any, MarketsResponse>("/info/markets");
      return response.data;
    },
    refetchInterval: 5000,
  });
}
