import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      clearToken: () => set({ token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Hook for actual login logic
import { useSignTypedData, useAccount } from "@starknet-react/core";
import { useState } from 'react';
import { api } from '@/lib/api';

export function useAuth() {
    const { signTypedDataAsync } = useSignTypedData({});
    const { address } = useAccount();
    const { setToken, token, clearToken } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const login = async () => {
        if (!address) return;
        setIsLoading(true);
        try {
            // 1. Request Challenge from Backend (if applicable) or sign generic message
            // For MVP/Bounty: We'll sign a standard login message
            // The backend likely expects a specific format or nonce.
            // We'll try a generic "Login to Extended" if no docs found.
            // OR checks generic starknet signature verification.
            
            // Typed Data is preferred for SNIP-12 login
             const message = {
                domain: {
                    name: "Extended",
                    version: "1",
                    chainId: "SN_MAIN", 
                },
                types: {
                    StarkNetDomain: [
                        { name: "name", type: "string" },
                        { name: "version", type: "string" },
                        { name: "chainId", type: "shortString" },
                    ],
                    Login: [
                        { name: "message", type: "string" },
                        { name: "timestamp", type: "felt" }
                    ]
                },
                primaryType: "Login",
                message: {
                    message: "Login to Extended",
                    timestamp: Date.now().toString()
                }
            };
            
            // Sign the Typed Data
            // The signature result is an array of felts (string[]) usually.
            // We'll join it or just stringify it for the token.
             const signature = await signTypedDataAsync({
                 domain: message.domain,
                 types: message.types,
                 primaryType: message.primaryType,
                 message: message.message
             });
            
            // For MVP: Use the first part of signature or join them as a token
            // In reality, you send { account, signature, msg } to backend to get a JWT.
            const signatureStr = Array.isArray(signature) ? signature.join(',') : signature;
            setToken(signatureStr || "demo-session-token");
            
        } catch (e) {
            console.error("Login failed", e);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        clearToken();
    };

    return {
        login,
        logout,
        isAuthenticated: !!token,
        isLoading
    };
}
