"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, ChartPie, Medal, Menu, X, HelpCircle } from "lucide-react";
import { ConnectWallet } from "./ConnectWallet";
import { motion, AnimatePresence } from "framer-motion";
import { useTourStore } from "@/app/hooks/useTour";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full select-none transition-colors duration-300 ${
          isScrolled || (!isHome && pathname !== "/leaderboard") || isMobileMenuOpen
            ? "bg-background/80 backdrop-blur-md border-b border-white/5 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-26 items-center justify-between px-4">
          
          <div className="flex items-center gap-4">
               {/* Mobile Menu Toggle (Left Side) */}
              <button 
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <Image src="/Logo.svg" alt="Extended Logo" width={36} height={36} />
                <span className="text-lg tracking-tight text-white hover:text-white/80 hidden sm:block">Perpify</span>
              </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center justify-center gap-8">
            <div id="nav-trade-link">
                <NavLink href="/trade" icon={<TrendingUp className="h-5 w-5" />} label="Trade" />
            </div>
            <NavLink href="/dashboard" icon={<ChartPie className="h-5 w-5" />} label="Dashboard" />
            <NavLink href="/leaderboard" icon={<Medal className="h-5 w-5" />} label="Leaderboard" />
          </div>

          <div className="flex items-center gap-4">
             {/* Help / Tour Button */}
             <button 
                onClick={() => {
                    if (pathname?.includes('/leaderboard')) {
                        useTourStore.getState().startTour('leaderboard');
                    } else if (pathname?.includes('/trade')) {
                         useTourStore.getState().startTour('trade');
                    } else if (pathname?.includes('/dashboard')) {
                         useTourStore.getState().startTour('dashboard');
                    } else {
                         // Fallback or generic help
                         console.log("No tour for this page");
                    }
                }}
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                title="Start Tour"
             >
                <span className="sr-only">Help</span>
                <HelpCircle className="w-5 h-5" />
             </button>

            <div id="nav-connect-wallet">
                 <ConnectWallet />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu (Drawer) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-[#050505] border-r border-white/10 z-50 flex flex-col pt-32 px-6 md:hidden"
            >
               <div className="flex flex-col gap-6">
                  <MobileNavLink href="/trade" icon={<TrendingUp className="h-6 w-6" />} label="Trade" onClick={() => setIsMobileMenuOpen(false)} />
                  <MobileNavLink href="/dashboard" icon={<ChartPie className="h-6 w-6" />} label="Dashboard" onClick={() => setIsMobileMenuOpen(false)} />
                  <MobileNavLink href="/leaderboard" icon={<Medal className="h-6 w-6" />} label="Leaderboard" onClick={() => setIsMobileMenuOpen(false)} />
                  <button
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                        if (pathname?.includes('/leaderboard')) useTourStore.getState().startTour('leaderboard');
                        else if (pathname?.includes('/trade')) useTourStore.getState().startTour('trade');
                        else if (pathname?.includes('/dashboard')) useTourStore.getState().startTour('dashboard');
                    }}
                    className="flex items-center gap-4 text-lg font-medium text-gray-300 hover:text-[#7c7eff] hover:bg-white/5 p-3 rounded-xl transition-all w-full text-left"
                  >
                    <div className="text-[#7c7eff]"><HelpCircle className="h-6 w-6" /></div>
                    Help & Tour
                  </button>
               </div>

                {/* Footer in Menu */}
               <div className="mt-auto pb-12 text-xs text-gray-500">
                  <p>© 2026 Perpify</p>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {!isHome && <div className="h-26" />}
    </>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname?.startsWith(href) && href !== "/");

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 text-sm font-medium transition-colors ${
        isActive ? "text-[#7c7eff]" : "text-foreground hover:text-[#7c7eff]"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function MobileNavLink({ href, icon, label, onClick }: { href: string; icon: React.ReactNode; label: string, onClick: () => void }) {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname?.startsWith(href) && href !== "/");

    return (
      <Link
        href={href}
        onClick={onClick}
        className={`flex items-center gap-4 text-lg font-medium p-3 rounded-xl transition-all ${
            isActive ? "text-[#7c7eff] bg-white/5" : "text-gray-300 hover:text-[#7c7eff] hover:bg-white/5"
        }`}
      >
        <div className={isActive ? "text-[#7c7eff]" : "text-[#7c7eff]"}>{icon}</div>
        {label}
      </Link>
    );
  }
