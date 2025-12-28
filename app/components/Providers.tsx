"use client";

import { StarknetConfig, jsonRpcProvider } from "@starknet-react/core";
import { mainnet, sepolia } from "@starknet-react/chains";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";
import { ArgentMobileConnector } from "starknetkit/argentMobile";

export function Providers({ children }: { children: React.ReactNode }) {
  const chains = [mainnet];

  const connectors = [
    new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector(),
  ];

  function rpc(chain: any) {
    return {
      nodeUrl: "https://starknet-mainnet.public.blastapi.io",
    };
  }

  return (
    <StarknetConfig
      chains={chains}
      provider={jsonRpcProvider({ rpc })}
      connectors={connectors as any}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
}
