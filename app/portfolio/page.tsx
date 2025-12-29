"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { useBalance } from "@/app/hooks/useBalance";
import { usePositions } from "@/app/hooks/usePositions";
import { Wallet, TrendingUp, History, PieChart } from "lucide-react";

export default function PortfolioPage() {
  const { data: balanceData } = useBalance();
  const { data: positions } = usePositions();

  // Calculate totals from positions
  const totalPositionsValue =
    positions?.reduce((acc, p) => acc + parseFloat(p.value), 0) || 0;
  const totalPnL =
    positions?.reduce((acc, p) => acc + parseFloat(p.unrealisedPnl), 0) || 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Portfolio</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-secondary/10 border-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Equity
            </CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {balanceData
                ? parseFloat(balanceData.equity).toLocaleString()
                : "0.00"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/10 border-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Initial Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {balanceData
                ? parseFloat(balanceData.balance).toLocaleString()
                : "0.00"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/10 border-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unrealized PnL
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                totalPnL >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {totalPnL >= 0 ? "+" : ""}
              {totalPnL.toLocaleString()} USD
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/10 border-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Positions Value
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalPositionsValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-secondary/5 border-white/5">
          <CardHeader>
            <CardTitle>Performance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Chart Placeholder
            </div>
          </CardContent>
        </Card>
        <Card className="bg-secondary/5 border-white/5">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span>Bitcoin</span>
                </div>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
