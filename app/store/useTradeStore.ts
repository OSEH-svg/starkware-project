import { create } from "zustand";

interface TradeState {
  activeMarket: string;
  setActiveMarket: (market: string) => void;
}

export const useTradeStore = create<TradeState>((set) => ({
  activeMarket: "BTC-USD",
  setActiveMarket: (market) => set({ activeMarket: market }),
}));
