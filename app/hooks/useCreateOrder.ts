import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAccount, useSignTypedData } from "@starknet-react/core";
import { API_URL, BUILDER_CODE } from "@/lib/constants";

// NOTE: precise EIP-712 types needed from SDK
const ORDER_TYPE = {
  StarkNetDomain: [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "felt" },
  ],
  Order: [
    { name: "market", type: "string" },
    { name: "side", type: "string" }, // 0 = Buy, 1 = Sell ? Or string "BUY"
    { name: "amount", type: "u256" },
    { name: "price", type: "u256" },
    { name: "nonce", type: "felt" },
    { name: "expiration", type: "felt" },
    { name: "fee", type: "u256" },
  ],
};

export function useCreateOrder() {
  const { account } = useAccount();
  const { signTypedDataAsync } = useSignTypedData({});

  return useMutation({
    mutationFn: async (vars: {
      market: string;
      side: "BUY" | "SELL";
      size: string;
      price: string;
    }) => {
      if (!account) throw new Error("Wallet not connected");

      // 1. Prepare Order Data
      const nonce = Date.now().toString(); // Simple nonce
      const expiration = Math.floor(Date.now() / 1000) + 3600; // 1h expiry
      const fee = "0.0001"; // Generic fee placeholder

      // 2. Sign Order (EIP-712)
      // We need to construct the message exactly as the backend expects.
      // This is the critical part that requires the SDK definition.
      // Below is a best-effort structural guess.
      const message = {
        market: vars.market,
        side: vars.side,
        amount: vars.size, // Needs decimal conversion
        price: vars.price, // Needs decimal conversion
        nonce,
        expiration,
        fee,
      };

      const signature = await signTypedDataAsync({
        domain: {
          name: "Extended",
          version: "1",
          chainId: "SN_MAIN", // Verify chain ID
        },
        types: ORDER_TYPE,
        primaryType: "Order",
        message: message as any,
      });

      // 3. Submit to API
      // Transform signature to r, s structure if needed, or pass as array
      // API docs settleStruct: { signature: { r, s }, starkKey, ... }

      // We need the Public Key (Stark Key) of the account.
      // account.address is the contract address.
      // We might need to ask the wallet for the Stark Key specifically or use the address if it's 1:1 mapped (Argent/Braavos usually map).
      // But usually 'starkKey' param is the *signer* key.

      const payload = {
        market: vars.market,
        side: vars.side,
        qty: vars.size,
        price: vars.price,
        timeInForce: "GTT",
        expiryEpochMillis: expiration * 1000,
        fee,
        nonce,
        setupId: BUILDER_CODE, // Check if this is passed as 'builderCode' or 'builderId'
        signature, // API might expect raw signature array or {r,s}
        // ... other params
      };

      return api.post("/orders", payload);
    },
    onError: (err) => {
      console.error("Order Failed", err);
      alert("Order Failed: " + err.message);
    },
  });
}
