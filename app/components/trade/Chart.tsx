"use client";

import React, { useEffect, useRef, memo } from "react";

// Using a transparent iframe approach or script injection for TradingView
// For speed, we will use the standard TradingView Widget embed snippet logic wrapped in React container.

export const Chart = memo(function Chart() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if script already exists to avoid duplicates
    if (container.current && !container.current.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        enable_publishing: false,
        backgroundColor: "rgba(5, 5, 5, 1)",
        gridColor: "rgba(42, 46, 57, 0.06)",
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        calendar: false,
        hide_volume: true,
        support_host: "https://www.tradingview.com",
      });
      container.current.appendChild(script);
    }
  }, []);

  return <div className="h-full w-full" ref={container} />;
});
