import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "https://api.starknet.extended.exchange/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
