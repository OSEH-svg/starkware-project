import { useMutation } from "@tanstack/react-query";
import { useAccount } from "@starknet-react/core";
import { api } from "@/lib/api";
import { BUILDER_ID, BUILDER_FEE } from "@/lib/constants";
import { toQuantized } from "@/lib/utils";
import { toast } from "sonner"; // Assuming sonner or generic toast

interface CreateOrderParams {
  market: string;
  side: "BUY" | "SELL";
  size: string; // Human readable size
  price: string;
  type: "LIMIT" | "MARKET";
}

export function useCreateOrder() {
  const { account } = useAccount();

  return useMutation({
    mutationFn: async (params: CreateOrderParams) => {
      if (!account) throw new Error("Wallet not connected");

      // 1. Prepare Order Data
      // Note: Real API would require precise unit conversion (decimals).
      // We will assume the API accepts string-based human readable values or handles decimals.
      // If not, we'd need a `useMarkets` lookup to get decimals (e.g. 1 BTC = 1e8 sats).

      const nonce = Date.now();
      const expiration = Math.floor(Date.now() / 1000) + 3600; // 1 hour

      // 2. EIP-712 Typed Data Definition (Standard Starknet DEX pattern)
      const typedData = {
        domain: {
          name: "Perpetuals",
          version: "v0",
          chainId: "SN_MAIN", // Should match network
        },
        types: {
          StarkNetDomain: [
            { name: "name", type: "felt" },
            { name: "version", type: "felt" },
            { name: "chainId", type: "felt" },
          ],
          Order: [
            { name: "market", type: "felt" },
            { name: "side", type: "felt" },
            { name: "amount", type: "u128" },
            { name: "price", type: "u128" },
            { name: "nonce", type: "felt" },
            { name: "expiration", type: "felt" },
            { name: "builderId", type: "u128" },
            { name: "builderFee", type: "u128" },
          ],
        },
        primaryType: "Order",
        message: {
          market: params.market,
          side: params.side === "BUY" ? "1" : "2",
          amount: toQuantized(params.size, 18),
          price: toQuantized(params.price, 18),
          nonce: nonce.toString(),
          expiration: expiration.toString(),
          builderId: BUILDER_ID.toString(),
          builderFee: toQuantized(BUILDER_FEE, 18),
        },
      };

      console.log("Signing Order:", typedData);

      // 3. Sign
      let signature;
      try {
        signature = await account.signMessage(typedData);
      } catch (err) {
        console.error("Signing failed:", err);
        throw new Error("User rejected signature");
      }

      // 4. Submit to API
      // We attach BUILDER_CODE here for fee attribution
      const payload = {
        market: params.market,
        side: params.side,
        size: params.size,
        price: params.price,
        type: params.type,
        signature: signature,
        nonce,
        expiration,
        // Builder Fee Integration
        builderId: BUILDER_ID,
        builderFee: BUILDER_FEE,
      };

      const response = await api.post("/orders", payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Order placed successfully!");
      console.log("Order Success:", data);
    },
    onError: (error: any) => {
      console.error("Order Error:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    },
  });
}
