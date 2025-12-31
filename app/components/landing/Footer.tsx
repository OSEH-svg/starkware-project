"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black pt-16 pb-[15vw] relative overflow-hidden flex flex-col items-center">
      
      {/* Navigation Links */}
      <div className="flex gap-8 mb-12 relative z-10">
        <Link href="/trade" className="text-gray-400 hover:text-white transition-colors text-sm">
          Trade
        </Link>
        <Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors text-sm">
          Portfolio
        </Link>
        <Link href="/leaderboard" className="text-gray-400 hover:text-white transition-colors text-sm">
          Leaderboard
        </Link>
        <Link href="/docs" className="text-gray-400 hover:text-white transition-colors text-sm">
          Doc
        </Link>
      </div>

      {/* Copyright */}
      <div className="text-gray-500 text-xs relative z-10">
        © {currentYear} Perpify. All rights reserved.
      </div>

      {/* Large Watermark Logo */}
      <div className="absolute bottom-18 left-0 right-0 w-full flex justify-center select-none pointer-events-none opacity-20 translate-y-[50%]">
         <h1 className="text-[25vw] font-medium text-[#1a1a1a] leading-none tracking-tighter"
             style={{
                 WebkitTextStroke: '4px rgba(124, 126, 255, 0.4)',
                 color: 'transparent'
             }}
         >
             Perpify
         </h1>  
      </div>
    </footer>
  );
}
