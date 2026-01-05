"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { useBalance } from "@/app/hooks/useBalance";
import { usePositions } from "@/app/hooks/usePositions";
import { Wallet, TrendingUp, History, PieChart, Sparkles } from "lucide-react";
import { TourOverlay } from "@/app/components/onboarding/TourOverlay";
import { DASHBOARD_TOUR_STEPS } from "./tour-config";

export default function DashboardPage() {
  const { data: balanceData } = useBalance();
  const { data: positions } = usePositions();

  // Calculate totals from positions
  const totalPositionsValue =
    positions?.reduce((acc: number, p: any) => acc + parseFloat(p.value), 0) || 0;
  const totalPnL =
    positions?.reduce((acc: number, p: any) => acc + parseFloat(p.unrealisedPnl), 0) || 0;

  return (
    <div className="flex flex-col items-center min-h-screen select-none relative">
       <TourOverlay steps={DASHBOARD_TOUR_STEPS} tourId="dashboard" />

       {/* Background */}
       <div className="fixed inset-0 z-0">
         <div className="absolute inset-0 bg-[url('/background.svg')] bg-cover bg-center w-full h-full opacity-100" />
         <div className="absolute inset-0 bg-black/40" />
       </div>

      <div className="container px-4 md:px-8 pt-32 pb-16 relative z-10 w-full space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center rounded-full bg-[#7c7eff]/10 px-3 py-1 text-xs font-medium text-[#7C7EFF] border border-[#7C7EFF]/20 mb-3">
                 <Sparkles className="h-3 w-3 mr-2" />
                 Personal Dashboard
              </div>
              <h1 className="text-4xl md:text-5xl font-normal tracking-tighter text-white">
                Trading <span className="text-[#7C7EFF]">Overview</span>
              </h1>
            </div>
        </div>

        {/* Key Metrics Grid */}
        <div id="dashboard-metrics" className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <DashboardCard 
            title="Total Equity" 
            icon={<Wallet className="h-4 w-4 text-[#7C7EFF]" />}
            value={balanceData ? parseFloat(balanceData.equity).toLocaleString() : "0.00"}
            subValue="USD"
          />
          
          <DashboardCard 
            title="Initial Balance" 
            icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
            value={balanceData ? parseFloat(balanceData.balance).toLocaleString() : "0.00"}
            subValue="USD"
          />

          <DashboardCard 
            title="Unrealized PnL" 
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
            value={totalPnL.toLocaleString()}
            subValue="USD"
            isPnL={true}
            pnlValue={totalPnL}
          />

          <DashboardCard 
            title="Positions Value" 
            icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
            value={totalPositionsValue.toLocaleString()}
            subValue="USD"
          />
        </div>

        {/* Charts & Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div id="dashboard-performance" className="md:col-span-2 relative group">
             <div className="absolute inset-0 bg-linear-to-r from-[#7C7EFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-xl" />
             <Card className="h-[400px] bg-[#0E0F15]/60 border-white/5 backdrop-blur-md relative overflow-hidden">
                <div className="absolute inset-0 gradient-border-1 opacity-10 rounded-xl pointer-events-none" />
                <CardHeader>
                  <CardTitle className="text-lg font-light tracking-tight text-white/90">Performance History</CardTitle>
                </CardHeader>
                <CardContent className="h-full flex items-center justify-center">
                  <div className="text-muted-foreground/50 flex flex-col items-center gap-2">
                    <History className="w-8 h-8 opacity-50" />
                    <span>Chart Loading...</span>
                  </div>
                </CardContent>
             </Card>
          </div>

          <div id="dashboard-allocation" className="col-span-1 relative group">
            <div className="absolute inset-0 bg-linear-to-r from-[#7C7EFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-xl" />
            <Card className="h-[400px] bg-[#0E0F15]/60 border-white/5 backdrop-blur-md relative overflow-hidden">
                <div className="absolute inset-0 gradient-border-1 opacity-10 rounded-xl pointer-events-none" />
                <CardHeader>
                  <CardTitle className="text-lg font-light tracking-tight text-white/90">Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 mt-4">
                    <div className="space-y-2">
                       <div className="flex justify-between text-sm">
                          <span className="text-white">Bitcoin</span>
                          <span className="text-white font-mono">100%</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#F7931A] w-full" />
                       </div>
                    </div>
                  </div>
                </CardContent>
             </Card>
          </div>
        </div>
        
      </div>
    </div>
  );
}

// Subcomponent for uniform card styling
function DashboardCard({ title, icon, value, subValue, isPnL = false, pnlValue = 0 }: any) {
    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-[#7C7EFF]/20 to-[#7C7EFF]/0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
            <Card className="bg-[#0E0F15]/80 border-white/5 backdrop-blur-md relative h-full transition-all duration-300 hover:border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground tracking-tight">
                    {title}
                    </CardTitle>
                    {icon}
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold tracking-tighter ${
                        isPnL 
                            ? (pnlValue >= 0 ? "text-[#4ADE80]" : "text-[#EF4444]")
                            : "text-white"
                    }`}>
                        {isPnL && (pnlValue >= 0 ? "+" : "")}
                        {isPnL && "$"}{value}
                        {!isPnL && <span className="text-lg text-muted-foreground/50 font-normal ml-1">$</span>} 
                    </div>
                    {subValue && !isPnL && <p className="text-xs text-muted-foreground mt-1">{subValue}</p>}
                </CardContent>
            </Card>
        </div>
    )
}
