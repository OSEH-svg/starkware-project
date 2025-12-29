"use client";

import { useTradeStore } from "@/app/store/useTradeStore";
import { useMarkets } from "@/app/hooks/useMarkets";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView: any;
  }
}

export function Chart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeMarket } = useTradeStore();
  const { data: markets } = useMarkets();

  // Find asset name for TV symbol (e.g. BTC-USD -> BINANCE:BTCUSDT for mock)
  // In production, we'd use our own datafeed.
  // For MVP, we'll try to map common pairs or use a generic one.
  const activeMarketData = markets?.find((m) => m.name === activeMarket);
  const symbol = activeMarketData?.name.replace("-", "") + "T" || "BTCUSDT"; // Very rough mapping

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView && containerRef.current) {
        new window.TradingView.widget({
          autosize: true,
          symbol: `BINANCE:${symbol}`, // Fallback to Binance for visual verification
          interval: "1D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: false, // Lock to active market
          container_id: containerRef.current.id,
          hide_side_toolbar: false,
          studies: ["RSI@tv-basicstudies"],
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup if possible, usually TV widget handles itself or we just replace container
    };
  }, [symbol]); // Re-run when symbol changes

  return (
    <div
      className="h-full w-full bg-background"
      ref={containerRef}
      id={`tv_chart_container_${symbol}`}
    />
  );
}
