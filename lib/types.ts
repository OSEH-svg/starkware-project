export interface LeaderboardEntry {
  rank: number;
  name: string;
  address: string; // Hex address for linking/identicon
  pnl: number;
  formattedPnl: string; // Pre-formatted for display (e.g. "+$142,390")
  winRate: number; // 0-100
  volume: string; // Display string e.g. "$1.2M"
  badges?: string[]; // Array of badge identifiers
}
