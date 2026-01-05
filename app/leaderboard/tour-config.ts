import { TourStep } from "@/app/hooks/useTour";

export const LEADERBOARD_TOUR_STEPS: TourStep[] = [
  {
    targetId: "nav-connect-wallet",
    title: "Connect Your Wallet",
    content: "Start by connecting your Starknet wallet. This will allow you to track your own ranking and participate in competitions.",
    position: "bottom",
  },
  {
    targetId: "leaderboard-podium",
    title: "The Hall of Fame",
    content: "Here are the top performers of the season. Finish in the top 3 to earn exclusive badges and major rewards.",
    position: "bottom",
  },
  {
    targetId: "leaderboard-list-header",
    title: "Rankings & Stats",
    content: "Track performance metrics like PnL and Win Rate in real-time. Analyze the strategies of top traders.",
    position: "top",
  },
  {
    targetId: "nav-trade-link", // We need to add this ID to Navbar
    title: "Start Trading",
    content: "Ready to climb the ranks? Head over to the Trade page to open your first position.",
    position: "bottom",
  },
];
