import { TourStep } from "@/app/hooks/useTour";

export const TRADE_TOUR_STEPS: TourStep[] = [
  {
    targetId: "market-list-panel",
    title: "Market Selection",
    content: "Browse available trading pairs here. Use the search to quickly find the asset you want to trade.",
    position: "right",
  },
  {
    targetId: "chart-container",
    title: "Price Action",
    content: "Real-time professional charts. Analyze price movements before taking a position.",
    position: "bottom",
  },
  {
    targetId: "order-form-panel",
    title: "Execute Trades",
    content: "Choose between Limit and Market orders. Set your size and leverage carefully.",
    position: "left",
  },
  {
    targetId: "positions-table",
    title: "Manage Positions",
    content: "Monitor your active trades, PnL, and liquidation prices here. Close positions instantly when needed.",
    position: "top",
  },
];
