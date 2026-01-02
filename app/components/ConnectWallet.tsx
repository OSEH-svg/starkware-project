"use client";

import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useStarknetkitConnectModal } from "starknetkit";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { Sparkles } from "lucide-react";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: [
      new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
      new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
      new WebWalletConnector({ url: "https://web.argent.xyz" }),
      new ArgentMobileConnector(),
    ] as any,
  });

  const handleConnect = async () => {
    const { connector } = await starknetkitConnectModal();
    if (connector) {
      await connect({ connector });
    }
  };

  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="px-4 py-2 rounded-full bg-transparent text-sm font-medium hover:bg-primary/10 transition-colors text-primary"
      >
        {address
          ? `${address.slice(0, 6)}...${address.slice(-4)}`
          : "Connected"}
      </button>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="flex items-center gap-2 font-semibold relative backdrop-blur-md bg-[#7c7eff]/10 rounded-full shadow-lg px-4 py-4"
    >
      <div className="absolute inset-0 gradient-border-1 rounded-full" />
      <div className="absolute inset-0 gradient-border-2 rounded-full" />
      <Sparkles className="h-4 w-4" />
      Connect Wallet
    </button>
  );
}
