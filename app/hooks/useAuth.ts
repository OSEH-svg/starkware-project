import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      apiKey: null,
      isAuthenticated: false,
      setApiKey: (key) => set({ apiKey: key, isAuthenticated: !!key }),
    }),
    {
      name: "trade-auth-storage",
    }
  )
);

export function useAuth() {
  const { apiKey, isAuthenticated, setApiKey } = useAuthStore();

  const login = async (walletAddress: string, account: any) => {
    try {
      // 1. Get Nonce/Message from API (mocking the message structure for now based on standard patterns)
      // Usually: GET /auth/nonce?address=...
      // For Extended, let's assume standard off-chain signing

      const message = {
        domain: {
          name: "Extended",
          chainId: "SN_MAIN",
          version: "1",
        },
        types: {
          StarkNetDomain: [
            { name: "name", type: "felt" },
            { name: "chainId", type: "felt" },
            { name: "version", type: "felt" },
          ],
          Message: [
            { name: "action", type: "felt" },
            { name: "nonce", type: "felt" },
          ],
        },
        primaryType: "Message",
        message: {
          action: "Login",
          nonce: Date.now().toString(), // Simple nonce for unique sig
        },
      };

      // 2. Sign with Wallet
      const signature = await account.signMessage(message);

      // 3. Verify & Get Key (Mocking API call until precise endpoint is confirmed)
      // const res = await api.post('/auth/login', { address: walletAddress, signature, message });
      // setApiKey(res.data.apiKey);

      // Temporary Mock: Generate a fake key to prove flow works
      console.log("Signed:", signature);
      const mockKey = "pk_test_" + Math.random().toString(36).substring(7);
      setApiKey(mockKey);
    } catch (e) {
      console.error("Login failed:", e);
      throw e;
    }
  };

  const logout = () => {
    setApiKey(null);
  };

  return { apiKey, isAuthenticated, login, logout, setApiKey };
}
