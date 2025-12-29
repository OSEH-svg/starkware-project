"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  side?: "left" | "right" | "bottom";
  className?: string;
}

export function Sheet({
  isOpen,
  onClose,
  title,
  children,
  side = "left",
  className,
}: SheetProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const variants = {
    hidden: {
      x: side === "left" ? "-100%" : side === "right" ? "100%" : 0,
      y: side === "bottom" ? "100%" : 0,
      opacity: 0,
    },
    visible: { x: 0, y: 0, opacity: 1 },
    exit: {
      x: side === "left" ? "-100%" : side === "right" ? "100%" : 0,
      y: side === "bottom" ? "100%" : 0,
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed z-50 bg-background border-border shadow-2xl p-4 flex flex-col",
              side === "left" && "inset-y-0 left-0 w-[80%] max-w-sm border-r",
              side === "right" && "inset-y-0 right-0 w-[80%] max-w-sm border-l",
              side === "bottom" &&
                "inset-x-0 bottom-0 max-h-[90vh] border-t rounded-t-xl",
              className
            )}
          >
            <div className="flex items-center justify-between mb-4">
              {title && <h2 className="text-lg font-bold">{title}</h2>}
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto -mx-4 px-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
