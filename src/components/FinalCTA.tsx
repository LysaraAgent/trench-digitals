"use client";

import { motion } from "framer-motion";

export default function FinalCTA({ onBuy }: { onBuy?: (solAmount: number, packsToAdd: number) => void }) {
  return (
    <>
      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto px-6 lg:px-12 py-16 bg-slate-900 rounded-3xl shadow-2xl text-center relative overflow-hidden"
          >
            {/* Subtle red glowing radial gradient */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="relative z-10">
              <p className="text-red-500 font-bold tracking-[0.2em] text-sm uppercase mb-4">
                THE VAULT IS OPEN
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
                Secure Your Season 1 Packs.
              </h2>
              <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto mb-10">
                1,250 Packs total. Pull the culture. Redeem the physical slab.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => onBuy && onBuy(0.025, 1)}
                  className="px-8 py-4 rounded-xl border-2 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all w-full sm:w-auto"
                >
                  Buy 1 Pack (0.025 SOL)
                </button>
                <button 
                  onClick={() => onBuy && onBuy(0.075, 3)}
                  className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:-translate-y-1 transition-all w-full sm:w-auto"
                >
                  Buy Booster Box (0.075 SOL)
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-slate-50 border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-lg font-black tracking-tighter text-slate-900">
              TRENCH DIGITALS
            </span>
            <span className="text-sm text-slate-500 font-medium mt-1">
              © 2026 Trench Digitals. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com" className="text-sm text-slate-500 hover:text-red-600 font-bold transition-colors cursor-pointer">
              Twitter / X
            </a>
            <a href="/terms" className="text-sm text-slate-500 hover:text-red-600 font-bold transition-colors cursor-pointer">
              Terms of Service
            </a>
            <a href="/privacy" className="text-sm text-slate-500 hover:text-red-600 font-bold transition-colors cursor-pointer">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
