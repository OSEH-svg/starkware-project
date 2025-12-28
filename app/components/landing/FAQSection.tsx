"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "What makes this interface different?",
    answer:
      "This is a specialized 'Pro' interface built on top of the Extended Protocol. We offer advanced charting, a gamified leaderboard, and portfolio tracking that is not available on the standard frontend.",
  },
  {
    question: "How do I earn rewards?",
    answer:
      "Simply by trading! Our interface routes orders with a specific Builder Code that splits fees. We return a portion of these fees to active traders in the form of competitions and prizes tracking via the Leaderboard.",
  },
  {
    question: "Can I trade with leverage?",
    answer:
      "Yes. You can trade BTC, ETH, and STRK with up to 20x leverage. The liquidity is sourced directly from the Extended main orderbook, ensuring tight spreads and fast execution.",
  },
  {
    question: "Do I need to deposit funds?",
    answer:
      "No. This is a non-custodial DEX. You trade directly from your Starknet wallet (Argent or Braavos). Your funds remain in your control until the moment a trade is executed on-chain.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 w-full max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <FAQItem key={i} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/5 bg-white/5 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left font-medium hover:bg-white/5 transition-colors"
      >
        {question}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-muted-foreground text-sm leading-relaxed border-t border-white/5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
