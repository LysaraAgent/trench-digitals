"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function VaultTracker() {
  const TOTAL_PACKS = 1250;
  const [packsRemaining, setPacksRemaining] = useState<number | null>(null);

  const fetchPacksSold = async () => {
    try {
      const response = await fetch("/api/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      const { totalSold } = await response.json();
      setPacksRemaining(TOTAL_PACKS - totalSold);
    } catch (error) {
      console.error('Error fetching packs sold:', error);
      // Fallback to total if error
      setPacksRemaining(TOTAL_PACKS);
    }
  };

  useEffect(() => {
    fetchPacksSold();
  }, []);

  const percentage = packsRemaining !== null ? (packsRemaining / TOTAL_PACKS) * 100 : 100;

  return (
    <section className="w-full bg-white border-y border-slate-200 py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side (The Data) */}
        <div className="w-full md:w-1/2">
          <p className="text-red-600 font-bold tracking-[0.2em] text-xs uppercase mb-1">
            Season 1 Release Status
          </p>
          {packsRemaining === null ? (
            <div className="h-8 md:h-9 bg-slate-200 rounded animate-pulse w-3/4"></div>
          ) : (
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-slate-900">
              {packsRemaining} / {TOTAL_PACKS} PACKS REMAINING
            </h2>
          )}
        </div>

        {/* Right Side (The Animated Progress Bar) */}
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <div className="w-full h-3 bg-slate-100 rounded-full border border-slate-200 overflow-hidden relative">
            <motion.div
              className="h-full bg-red-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            />
          </div>
          <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider text-right">
            Strictly limited supply. Live on-chain & off-chain tracking.
          </p>
        </div>
      </div>
    </section>
  );
}
