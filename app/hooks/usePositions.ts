import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Position {
  id: number;
  market: string;
  side: "LONG" | "SHORT";
  size: string;
  value: string;
  openPrice: string;
  markPrice: string;
  liquidationPrice: string;
  unrealisedPnl: string;
  leverage: string;
}

interface PositionsResponse {
  status: string;
  data: Position[];
}

export function usePositions() {
  return useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      // NOTE: This endpoint requires Authentication.
      // We will handle X-Api-Key injection in the API interceptor or here if available.
      // For now, assuming Global headers or public access (which is wrong for positions).
      // If no key, this will 401.
      const response = await api.get<any, PositionsResponse>("/user/positions");
      return response.data;
    },
    retry: false, // Don't retry if 401
  });
}
