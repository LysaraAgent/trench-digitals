"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "Are these NFTs?",
      answer: "No. Trench Digitals operates on a Web2.5 model. You purchase packs on-chain using SOL, but your card inventory is stored securely off-chain in your digital vault. This means zero gas fees, instant pack ripping, and no wallet clutter.",
    },
    {
      question: "How do I claim a physical slab?",
      answer: "If you pull one of the ultra-rare Manga Variants from a digital Season 1 Pack, a Redeem button will unlock in your vault. Provide your shipping details (P.O. Boxes are accepted for privacy), and we will ship your physical slab.",
    },
    {
      question: "What is the quality of the physical cards?",
      answer: "Museum-grade. The physical cards are printed with premium holographic foil, sealed inside a thick, tamper-proof acrylic slab, and topped with an official Trench Digitals grading label.",
    },
    {
      question: "Will you ever print more Season 1 packs?",
      answer: "Never. The Season 1 supply is strictly capped at 1,250 packs. Once the vault hits zero, the supply is locked forever. No restocks, no reprints.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 border-t border-slate-200">
      {/* Header Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase mb-4">
          INTELLIGENCE
        </p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-12">
          Frequently Asked Questions.
        </h2>
      </motion.div>

      {/* The Accordion Layout */}
      <div className="max-w-3xl mx-auto px-6 flex flex-col gap-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={index} className="flex flex-col">
              {/* Question Row */}
              <button
                onClick={() => toggleFaq(index)}
                className="bg-white border border-slate-200 rounded-xl p-6 flex justify-between items-center cursor-pointer hover:border-red-200 transition-colors shadow-sm text-left relative z-10"
              >
                <span className="text-lg font-bold text-slate-900">
                  {faq.question}
                </span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                </motion.div>
              </button>

              {/* The Answer Reveal */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-slate-500 font-medium leading-relaxed bg-white rounded-b-xl border-x border-b border-slate-200 -mt-2 shadow-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
