import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAccount, useSignTypedData } from "@starknet-react/core";
import { API_URL, BUILDER_CODE } from "@/lib/constants";
import { uint256, num } from "starknet";

// Standard Starknet EIP-712 Types for Extended
const ORDER_TYPE = {
  StarkNetDomain: [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "shortString" }, // 'felt' is deprecated in strict types, 'shortString' or 'string' often used
  ],
  Order: [
    { name: "market", type: "string" },
    { name: "side", type: "string" },
    { name: "amount", type: "u256" },
    { name: "price", type: "u256" },
    { name: "nonce", type: "felt" },
    { name: "expiration", type: "felt" },
    { name: "fee", type: "u256" },
  ],
  // u256 MUST be defined if not natively supported by the revision, 
  // but Starknet.js v6 handles 'u256' type in 'types' automatically if passed as {low, high}.
  // We'll define it just in case if the backend expects explicit struct.
  u256: [
    { name: "low", type: "felt" },
    { name: "high", type: "felt" },
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
      const nonce = Date.now().toString(); 
      const expiration = Math.floor(Date.now() / 1000) + 3600; // 1h expiry
      // Fee should be 0 or specific? Using 0 for MVP unless backend rejects.
      // Note: '0.0001' string is float, needs to be uint256. 
      // Assuming 18 decimals for fees?
      const feeBN = BigInt(0); 

      // Convert Floats to BigInt (assuming 18 decimals for now, ideally per-market precision)
      // Size: usually base asset precision (e.g. 18 for ETH)
      // Price: usually quote asset precision (e.g. 6 or 18 for USDC)
      const sizeBN = BigInt(Math.floor(parseFloat(vars.size) * 1e18));
      const priceBN = BigInt(Math.floor(parseFloat(vars.price) * 1e18));

      const sizeUint256 = uint256.bnToUint256(sizeBN);
      const priceUint256 = uint256.bnToUint256(priceBN);
      const feeUint256 = uint256.bnToUint256(feeBN);

      // 2. Sign Order (EIP-712)
      const message = {
        market: vars.market,
        side: vars.side,
        amount: sizeUint256,
        price: priceUint256,
        nonce,
        expiration,
        fee: feeUint256,
      };

      const signature = await signTypedDataAsync({
        domain: {
          name: "Extended",
          version: "1",
          chainId: "SN_MAIN", 
        },
        types: ORDER_TYPE,
        primaryType: "Order",
        message: message as any,
      });

      // 3. Submit to API
      const payload = {
        market: vars.market,
        side: vars.side,
        qty: vars.size, // API often takes readable numbers
        price: vars.price,
        timeInForce: "GTT",
        expiryEpochMillis: expiration * 1000,
        fee: "0",
        nonce,
        builderCode: BUILDER_CODE,
        signature, 
        // We might need to send the 'typedData' or at least the raw signature components
        // API often needs { r, s } derived from signature array
        address: account.address
      };

      return api.post("/orders", payload);
    },
    onError: (err) => {
      console.error("Order Failed", err);
      // We will add toast here later
    },
  });
}
