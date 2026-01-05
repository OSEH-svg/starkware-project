"use client";

import { motion } from "framer-motion";
import { Timer, Bell } from "lucide-react";
import { useState } from "react";

export function LeaderboardEmptyState() {
  const [notified, setNotified] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg space-y-8"
      >
        {/* Illustration */}
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative z-10 bg-white/5 p-6 rounded-2xl border border-white/10">
                <Timer className="w-16 h-16 text-yellow-400" />
            </div>
        </div>

        <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Season 1 Starts Soon
            </h2>
            <p className="text-muted-foreground text-lg">
                The arena is being prepared. Trading competition will begin shortly.
                Get your strategies ready and warm up your wallets.
            </p>
        </div>

        <div className="flex justify-center pt-4">
            <button
                onClick={() => setNotified(true)}
                disabled={notified}
                className={`
                    group relative inline-flex items-center gap-2 px-8 py-3 rounded-full 
                    font-medium transition-all duration-300
                    ${notified 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20 cursor-default' 
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/30'}
                `}
            >
                {notified ? (
                    <>
                        <span className="relative flex h-2 w-2 mr-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        You'll be notified
                    </>
                ) : (
                    <>
                        <Bell className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        Notify Me When Live
                    </>
                )}
            </button>
        </div>
      </motion.div>
    </div>
  );
}
