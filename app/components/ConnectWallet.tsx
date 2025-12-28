"use client";

import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useStarknetkitConnectModal } from "starknetkit";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";
import { ArgentMobileConnector } from "starknetkit/argentMobile";

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
        className="px-4 py-2 rounded-full border border-primary/20 bg-background/50 text-sm font-medium hover:bg-primary/10 transition-colors text-primary"
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
      className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(0,255,157,0.3)]"
    >
      Connect Wallet
    </button>
  );
}
