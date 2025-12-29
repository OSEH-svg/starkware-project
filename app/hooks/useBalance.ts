import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface BalanceData {
  balance: string;
  equity: string;
  availableForTrade: string;
  unrealisedPnl: string;
  marginRatio: string;
}

interface BalanceResponse {
  status: string;
  data: BalanceData;
}

export function useBalance() {
  return useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      try {
        const response = await api.get<any, BalanceResponse>("/user/balance");
        return response.data;
      } catch (error: any) {
        if (error.response?.status === 401) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
  });
}
