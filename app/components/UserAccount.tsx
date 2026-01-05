"use client";

import { useState } from "react";
import { useAccount, useDisconnect } from "@starknet-react/core";
import { useAuth } from "@/app/hooks/useAuth";
import { Key, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function UserAccount() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { apiKey, setApiKey } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [inputKey, setInputKey] = useState("");

  const handleSave = () => {
    if (inputKey.trim()) {
      setApiKey(inputKey.trim());
      setIsOpen(false);
      setInputKey("");
    }
  };

  const handleClear = () => {
    setApiKey(null);
    setIsOpen(false);
  };

  if (!address) return null;

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-secondary/20 rounded-full pl-4 pr-1 py-1 border border-white/5">
        <span className="text-xs font-mono text-muted-foreground hidden md:block">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>

        {/* API Key Status Indicator */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "p-2 rounded-full transition-colors",
            apiKey
              ? "text-green-500 hover:bg-green-500/10"
              : "text-amber-500 hover:bg-amber-500/10"
          )}
          title={apiKey ? "API Key Set" : "Set API Key"}
        >
          <Key className="w-4 h-4" />
        </button>

        <button
          onClick={() => disconnect()}
          className="p-2 rounded-full text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
          title="Disconnect Wallet"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Settings Dropdown/Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-72 bg-card border border-border shadow-xl rounded-xl p-4 z-50 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Settings className="w-4 h-4" />
              <span>API Authentication</span>
            </div>

            <p className="text-xs text-muted-foreground">
              Enter your Extended API Key to view balances and open orders.
            </p>

            {apiKey ? (
              <div className="bg-secondary/30 p-2 rounded text-xs font-mono break-all border border-white/5">
                {apiKey.slice(0, 10)}...****************
              </div>
            ) : null}

            <div className="flex flex-col gap-2">
              {!apiKey && (
                <input
                  type="password"
                  placeholder="Paste X-Api-Key here"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  className="bg-background border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              )}

              {apiKey ? (
                <button
                  onClick={handleClear}
                  className="w-full py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/10 rounded transition-colors"
                >
                  Clear API Key
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  disabled={!inputKey}
                  className="w-full py-2 bg-primary text-primary-foreground rounded text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  Save Key
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
