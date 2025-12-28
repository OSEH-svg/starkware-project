"use client";

import Link from "next/link";
import { ConnectWallet } from "./ConnectWallet";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center">
            <div className="size-4 bg-primary rounded-sm shadow-[0_0_10px_var(--primary)]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            EXTENDED{" "}
            <span className="text-primary text-sm font-normal opacity-80">
              | BUILDER
            </span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/trade"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Trade
          </Link>
          <Link
            href="/portfolio"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Portfolio
          </Link>
          <Link
            href="/leaderboard"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Leaderboard
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
}
