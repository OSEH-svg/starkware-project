"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Tabs } from "@/app/components/ui/tabs";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Info } from "lucide-react";
import { useAccount } from "@starknet-react/core";
import { BUILDER_CODE } from "@/lib/constants";

export function OrderForm() {
  const [activeTab, setActiveTab] = useState("limit");
  const [side, setSide] = useState<"long" | "short">("long");
  const [leverage, setLeverage] = useState(1);
  const { account, isConnected } = useAccount();

  return (
    <Card className="flex flex-col h-full border-l border-y-0 border-r-0 rounded-none bg-background/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <Tabs
          tabs={[
            { id: "limit", label: "Limit" },
            { id: "market", label: "Market" },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </CardHeader>
      <CardContent className="space-y-6 flex-1">
        {/* Side Selector */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={side === "long" ? "default" : "secondary"}
            className={
              side === "long"
                ? "bg-green-500 hover:bg-green-600 text-white"
                : ""
            }
            onClick={() => setSide("long")}
          >
            Long
          </Button>
          <Button
            variant={side === "short" ? "default" : "secondary"}
            className={
              side === "short" ? "bg-red-500 hover:bg-red-600 text-white" : ""
            }
            onClick={() => setSide("short")}
          >
            Short
          </Button>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {activeTab === "limit" && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Price (USD)
              </label>
              <Input
                type="number"
                placeholder="0.00"
                className="bg-secondary/50 border-transparent focus:border-primary"
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Size (ETH)
            </label>
            <Input
              type="number"
              placeholder="0.00"
              className="bg-secondary/50 border-transparent focus:border-primary"
            />
          </div>

          {/* Leverage Slider Mockup */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Leverage</span>
              <span className="text-foreground font-bold">{leverage}x</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="pt-4 space-y-2 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Total</span>
            <span className="text-foreground">$0.00</span>
          </div>
          <div className="flex justify-between">
            <span>Fee (Builder)</span>
            <span className="text-primary flex items-center gap-1">
              0.05% <Info className="h-3 w-3" />
            </span>
          </div>
          <div className="text-[10px] text-right text-muted-foreground/50">
            Code: {BUILDER_CODE}
          </div>
        </div>

        <Button className="w-full text-lg font-bold" disabled={!isConnected}>
          {isConnected
            ? side === "long"
              ? "Buy / Long"
              : "Sell / Short"
            : "Connect Wallet to Trade"}
        </Button>
      </CardContent>
    </Card>
  );
}
