"use client";

import { useAccount, useConnect } from "@starknet-react/core";
import { useStarknetkitConnectModal } from "starknetkit";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { Sparkles } from "lucide-react";
import { UserAccount } from "./UserAccount";

export function ConnectWallet() {
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  // disconnect is used inside UserAccount now, or we can keep it here if needed but UserAccount handles "logout"

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
    return <UserAccount />;
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
