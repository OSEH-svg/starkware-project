import { TourStep } from "@/app/hooks/useTour";

export const DASHBOARD_TOUR_STEPS: TourStep[] = [
  {
    targetId: "dashboard-metrics",
    title: "Your Account Overview",
    content: "View your total equity, realized PnL, and current positions value at a glance.",
    position: "bottom",
  },
  {
    targetId: "dashboard-performance",
    title: "Performance History",
    content: "Track your growth over time. This chart updates as you close profitable trades.",
    position: "right",
  },
  {
    targetId: "dashboard-allocation",
    title: "Asset Allocation",
    content: "See exactly where your funds are distributed across different assets.",
    position: "left",
  },
];
