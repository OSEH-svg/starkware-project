"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTourStore, TourStep } from "@/app/hooks/useTour";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

interface TourOverlayProps {
  steps: TourStep[];
  tourId: string;
}

export function TourOverlay({ steps, tourId }: TourOverlayProps) {
  const { activeTourId, currentStepIndex, nextStep, prevStep, skipTour, endTour } = useTourStore();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  
  // Need to be client-side only for Portal
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isActive = activeTourId === tourId;
  const currentStep = steps[currentStepIndex];

  // Update target position
  useEffect(() => {
    if (!isActive || !currentStep) return;
    
    // Safety check: if step index out of bounds (can happen when switching tours)
    if (!currentStep) return;

    const updatePosition = () => {
      const element = document.getElementById(currentStep.targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Add window scroll offset since getBoundingClientRect is relative to viewport
        // but absolute positioning might be relative to document if we aren't careful.
        // Actually for fixed overlay, viewport relative is fine.
        setTargetRect(rect);
        
        // Scroll element into view if needed
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        // If element not found, warn or skip?
        console.warn(`Target element #${currentStep.targetId} not found`);
      }
    };

    // Tiny delay to allow for page transitions (if any)
    const timer = setTimeout(updatePosition, 100);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [isActive, currentStep, currentStepIndex]);

  if (!mounted || !isActive || !currentStep || !targetRect) return null;

  const isLastStep = currentStepIndex === steps.length - 1;

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-none">
      {/* Semi-transparent Backdrop with "Hole" */}
      {/* Note: Implementing a true "hole" in CSS is tricky with just one div. 
          We use a massive border or SVG mask. 
          Here we'll use 4 divs to frame the target, which is robust. 
      */}
      <div className="absolute inset-0 pointer-events-auto">
         {/* Top */}
         <div 
            className="absolute bg-black/70 backdrop-blur-[2px] transition-all duration-300" 
            style={{ top: 0, left: 0, right: 0, height: targetRect.top }} 
         />
         {/* Bottom */}
         <div 
            className="absolute bg-black/70 backdrop-blur-[2px] transition-all duration-300"
            style={{ top: targetRect.bottom, left: 0, right: 0, bottom: 0 }}
         />
         {/* Left */}
         <div 
            className="absolute bg-black/70 backdrop-blur-[2px] transition-all duration-300"
            style={{ top: targetRect.top, left: 0, width: targetRect.left, height: targetRect.height }}
         />
         {/* Right */}
         <div 
            className="absolute bg-black/70 backdrop-blur-[2px] transition-all duration-300"
            style={{ top: targetRect.top, left: targetRect.right, right: 0, height: targetRect.height }}
         />
         
         {/* The Highlight Hole Border */}
         <div 
            className="absolute border-2 border-[#7C7EFF] rounded-lg shadow-[0_0_30px_rgba(124,126,255,0.4)] transition-all duration-300"
            style={{ 
                top: targetRect.top - 4, 
                left: targetRect.left - 4, 
                width: targetRect.width + 8, 
                height: targetRect.height + 8 
            }}
         />
      </div>

      {/* Tooltip Card - Positioned relative to target */}
      <div className="absolute inset-0 pointer-events-none flex items-start justify-start"> {/* Removed items-center justify-center */}
          <TooltipContainer 
            key={currentStepIndex}
            targetRect={targetRect}
            step={currentStep}
            totalSteps={steps.length}
            currentStepIndex={currentStepIndex}
            onSkip={skipTour}
            onNext={isLastStep ? endTour : nextStep}
            onPrev={prevStep}
            isLastStep={isLastStep}
          />
      </div>
    </div>,
    document.body
  );
}

function TooltipContainer({ 
    targetRect, 
    step, 
    totalSteps, 
    currentStepIndex, 
    onSkip, 
    onNext, 
    onPrev, 
    isLastStep 
}: {
    targetRect: DOMRect;
    step: TourStep;
    totalSteps: number;
    currentStepIndex: number;
    onSkip: () => void;
    onNext: () => void;
    onPrev: () => void;
    isLastStep: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 });

    useEffect(() => {
        if (!ref.current || !targetRect) return;

        const card = ref.current.getBoundingClientRect();
        const viewport = { w: window.innerWidth, h: window.innerHeight };
        const padding = 16;
        const gap = 12;

        let top = 0;
        let left = 0;

        // Mobile Check (< 640px)
        const isMobile = viewport.w < 640;

        if (isMobile) {
            // Mobile: Always float at bottom or top of SCREEN, or center if possible.
            // Safer: Pin to bottom of screen if target is top-half, Pin to top if target is bottom-half.
            // Simple approach: Center horizontally, push below target if space, else above.
            
            left = (viewport.w - card.width) / 2; // Center horizontal

            const spaceBelow = viewport.h - targetRect.bottom;
            const spaceAbove = targetRect.top;

            // Prefer below if 30% of screen is available, else try above
            if (spaceBelow > card.height + gap || spaceBelow > spaceAbove) {
                top = targetRect.bottom + gap;
            } else {
                top = targetRect.top - card.height - gap;
            }
            
            // Hard clamp to viewport
            if (top + card.height > viewport.h - padding) top = viewport.h - card.height - padding;
            if (top < padding) top = padding;

        } else {
            // Desktop Logic
            const preferredPos = step.position || 'bottom';

            if (preferredPos === 'right') {
                left = targetRect.right + gap;
                top = targetRect.top + (targetRect.height / 2) - (card.height / 2);
                
                // Flip to left if no space
                if (left + card.width > viewport.w - padding) {
                     left = targetRect.left - card.width - gap;
                }
            } else if (preferredPos === 'left') {
                left = targetRect.left - card.width - gap;
                top = targetRect.top + (targetRect.height / 2) - (card.height / 2);

                // Flip to right if no space
                if (left < padding) {
                    left = targetRect.right + gap;
                }
            } else if (preferredPos === 'top') {
                left = targetRect.left + (targetRect.width / 2) - (card.width / 2);
                top = targetRect.top - card.height - gap;

                // Flip if no space
                if (top < padding) {
                    top = targetRect.bottom + gap;
                }
            } else {
                // Bottom (Default)
                left = targetRect.left + (targetRect.width / 2) - (card.width / 2);
                top = targetRect.bottom + gap;
                
                 // Flip if no space
                if (top + card.height > viewport.h - padding) {
                    top = targetRect.top - card.height - gap;
                }
            }

            // Final safety clamp to keep within viewport
            if (left < padding) left = padding;
            if (left + card.width > viewport.w - padding) left = viewport.w - card.width - padding;
            
            if (top < padding) top = padding;
            if (top + card.height > viewport.h - padding) top = viewport.h - card.height - padding;
        }

        setStyle({
            top: top,
            left: left,
            opacity: 1,
            position: 'absolute'
        });

    }, [targetRect, step]); // Re-run when target moves or step changes

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto bg-[#1A1B23] border border-white/10 rounded-xl p-5 shadow-2xl w-[calc(100vw-32px)] max-w-sm"
            style={style}
          >
             <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold font-mono text-[#7C7EFF] uppercase tracking-wider">
                    Step {currentStepIndex + 1} of {totalSteps}
                </span>
                <button onClick={onSkip} className="text-gray-500 hover:text-white">
                    <X className="w-4 h-4" />
                </button>
             </div>
             
             <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
             <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {step.content}
             </p>
             
             <div className="flex justify-between items-center">
                 <button 
                    onClick={onPrev}
                    disabled={currentStepIndex === 0}
                    className="text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 px-2 py-1"
                 >
                    Back
                 </button>
                 
                 <button 
                    onClick={onNext}
                    className="inline-flex items-center gap-2 bg-[#7C7EFF] hover:bg-[#6b6de6] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                 >
                    {isLastStep ? "Finish" : "Next"}
                    {!isLastStep && <ChevronRight className="w-4 h-4" />}
                 </button>
             </div>
          </motion.div>
    );
}

