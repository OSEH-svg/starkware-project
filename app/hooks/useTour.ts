"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TourStep {
  targetId: string;
  title: string;
  content: string;
  position: "top" | "bottom" | "left" | "right";
}

interface TourState {
  activeTourId: string | null;
  currentStepIndex: number;
  seenTours: Record<string, boolean>;
  
  startTour: (tourId: string) => void;
  endTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  resetTour: (tourId: string) => void;
}

export const useTourStore = create<TourState>()(
  persist(
    (set, get) => ({
      activeTourId: null,
      currentStepIndex: 0,
      seenTours: {},

      startTour: (tourId) => set({ activeTourId: tourId, currentStepIndex: 0 }),
      
      endTour: () => {
          const { activeTourId, seenTours } = get();
          if (activeTourId) {
              set({ 
                  activeTourId: null, 
                  seenTours: { ...seenTours, [activeTourId]: true } 
              });
          }
      },

      skipTour: () => {
          const { activeTourId, seenTours } = get();
          if (activeTourId) {
              set({ 
                  activeTourId: null, 
                  seenTours: { ...seenTours, [activeTourId]: true } 
              });
          }
      },
      
      nextStep: () => set((state) => ({ currentStepIndex: state.currentStepIndex + 1 })),
      prevStep: () => set((state) => ({ currentStepIndex: Math.max(0, state.currentStepIndex - 1) })),
      
      resetTour: (tourId) => set((state) => ({ 
          activeTourId: tourId, 
          currentStepIndex: 0, 
          seenTours: { ...state.seenTours, [tourId]: false } 
      })),
    }),
    {
      name: "perpify-tour-storage",
      partialize: (state) => ({ seenTours: state.seenTours }), 
    }
  )
);
