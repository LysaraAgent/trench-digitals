"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Bot, LockKeyhole } from "lucide-react";

export default function VaultSecurity() {
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
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    },
  };

  return (
    <section className="py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Area */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center"
        >
          <p className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase mb-4">
            VAULT SECURITY
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-6">
            Bulletproof Allocation.
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto mb-16 px-4">
            The trenches are full of exploits and wallet drainers. We built Trench Digitals with off-chain security to protect your assets. Here is why we require a Phantom Wallet connection to play.
          </p>
        </motion.div>

        {/* The Grid (3 Security Pillars) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Pillar 1 */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-red-200 transition-colors"
          >
            <Bot className="text-slate-400 w-8 h-8 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Anti-Bot Protection
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              With a strict supply of only 1,250 packs, bots would drain the site in seconds. Cryptographic wallet signatures ensure real humans get fair access to the Season 1 Pack release.
            </p>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-red-200 transition-colors"
          >
            <LockKeyhole className="text-red-600 w-8 h-8 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Your Unhackable Key
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              We do not use easily hacked emails or passwords. Your Phantom Wallet acts as your unique, cryptographically secure key to access your off-chain digital binder.
            </p>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-red-200 transition-colors"
          >
            <ShieldCheck className="text-slate-400 w-8 h-8 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Zero-Risk Connection
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Connecting your wallet and signing a verification message costs exactly 0 SOL and cannot move funds. You only authorize a transaction when you explicitly click Buy Pack.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
