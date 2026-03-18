"use client";

import { motion } from "framer-motion";
import { Package, Sparkles, Shield } from "lucide-react";

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="how-it-works" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-16"
        >
          <p className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase mb-4 text-center">
            THE MECHANICS
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 text-center">
            Curating the Chaos.
          </h2>
        </motion.div>

        {/* The Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Step 1 */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-red-200 transition-all duration-300"
          >
            <Package className="text-red-600 w-8 h-8 mb-6" />
            <h3 className="text-xl font-extrabold text-slate-900 mb-3 tracking-tight">
              1. Rip Digital Packs
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Spend SOL to instantly open packs on-chain. Zero gas fees, zero wait times. Your pulls are stored securely in your Trench Digitals vault.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-red-200 transition-all duration-300"
          >
            <Sparkles className="text-red-600 w-8 h-8 mb-6" />
            <h3 className="text-xl font-extrabold text-slate-900 mb-3 tracking-tight">
              2. Hunt The Grails
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Collect 30+ legendary Crypto Icons. Beat the odds and hunt down the ultra-rare 1-of-20 Manga Variants hidden inside the Genesis Drop.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-red-200 transition-all duration-300"
          >
            <Shield className="text-red-600 w-8 h-8 mb-6" />
            <h3 className="text-xl font-extrabold text-slate-900 mb-3 tracking-tight">
              3. Redeem Physical Slabs
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Pull a Secret Rare? Click redeem. We will securely print, foil, and encase your card in a museum-grade slab and ship it directly to your door.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
