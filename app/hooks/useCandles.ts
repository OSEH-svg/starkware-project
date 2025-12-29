import { api } from "@/lib/api";

export interface Candle {
  t: number; // Time
  o: string; // Open
  h: string; // High
  l: string; // Low
  c: string; // Close
  v: string; // Volume
}

interface CandlesResponse {
  status: string;
  data: Candle[];
}

export const fetchCandles = async (market: string, resolution: string) => {
  // Mapping resolution to API params if needed, for now assuming default or adjusting
  // API endpoint: GET /api/v1/info/candles/{market}/trades?interval={interval}
  // Extended intervals: 1m, 5m, 15m, 1h, 4h, 1d

  // Simple mapping:
  let interval = "1h";
  if (resolution === "1") interval = "1m";
  if (resolution === "5") interval = "5m";
  if (resolution === "15") interval = "15m";
  if (resolution === "60") interval = "1h";
  if (resolution === "240") interval = "4h";
  if (resolution === "1D") interval = "1d";

  const response = await api.get<any, CandlesResponse>(
    `/info/candles/${market}/trades`,
    {
      params: { interval },
    }
  );
  return response.data;
};
