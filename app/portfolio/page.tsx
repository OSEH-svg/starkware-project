"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { ArrowUpRight, TrendingUp, Wallet, Clock } from "lucide-react";
import { useAccount } from "@starknet-react/core";

export default function PortfolioPage() {
  const { address } = useAccount();

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
        <p className="text-muted-foreground">
          Manage your assets, track performance, and review history.
        </p>
        {address && (
          <p className="text-xs font-mono text-primary/80 pt-1">
            Account: {address}
          </p>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Equity"
          value="$12,345.00"
          change="+8.2%"
          trend="up"
          icon={<Wallet className="h-5 w-5 text-primary" />}
        />
        <MetricCard
          title="Unrealized PnL"
          value="+$450.23"
          change="+2.4%"
          trend="up"
          icon={<TrendingUp className="h-5 w-5 text-green-500" />}
        />
        <MetricCard
          title="24h Volume"
          value="$45,200.00"
          change=""
          trend="neutral"
          icon={<Clock className="h-5 w-5 text-blue-500" />}
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Placeholder */}
        <div className="lg:col-span-2">
          <Card className="h-[400px] border-white/5 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Performance History</CardTitle>
            </CardHeader>
            <CardContent className="h-full flex items-center justify-center text-muted-foreground">
              {/* In real app, Recharts or TradingView equity curve goes here */}
              <span className="italic">
                Equity chart visualization would render here
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Asset Allocation */}
        <div className="lg:col-span-1">
          <Card className="h-[400px] border-white/5 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AssetRow name="USDC" balance="10,230.50" percent="82%" />
                <AssetRow name="STRK" balance="1,500.00" percent="12%" />
                <AssetRow name="ETH" balance="614.50" percent="6%" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, trend, icon }: any) {
  return (
    <Card className="border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="text-2xl font-bold">{value}</div>
          </div>
          <div className="p-2 bg-background/20 rounded-full">{icon}</div>
        </div>
        {change && (
          <div className="mt-4 flex items-center text-xs">
            <span
              className={trend === "up" ? "text-green-500" : "text-red-500"}
            >
              {change}
            </span>
            <span className="text-muted-foreground ml-2">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AssetRow({ name, balance, percent }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-background/20">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
          {name[0]}
        </div>
        <span className="font-medium">{name}</span>
      </div>
      <div className="text-right">
        <div className="font-medium">${balance}</div>
        <div className="text-xs text-muted-foreground">{percent}</div>
      </div>
    </div>
  );
}
