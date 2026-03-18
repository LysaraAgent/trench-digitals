/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, PublicKey, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import Navbar from "./components/Navbar";
import HowItWorks from "./components/HowItWorks";
import TheGrails from "./components/TheGrails";
import VaultSecurity from "./components/VaultSecurity";
import VaultTracker from "./components/VaultTracker";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import ContactPage from "./app/contact/page";
import VaultPage from "./app/vault/page";
import RipPage from "./app/rip/page";

import { supabase } from './lib/supabase';

export default function App() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleBuy = async (solAmount: number, packsToAdd: number) => {
    if (!publicKey) {
      alert("Please connect your Phantom wallet.");
      return;
    }

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey('CKMA3o8xtM46UQAwkD17GV88gjyxbb8R3zuZDV62tLB'),
          lamports: solAmount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'processed');

      const walletAddress = publicKey.toBase58();

      // 1. Check if the walletAddress exists in the users table
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('packs_owned')
        .eq('wallet_address', walletAddress)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (!existingUser) {
        // 2. If it DOES NOT exist, insert a new row
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            wallet_address: walletAddress,
            packs_owned: packsToAdd
          });

        if (insertError) throw insertError;

      } else {
        // 3. If it DOES exist, add packsToAdd to current packs_owned and update
        const newPacksTotal = existingUser.packs_owned + packsToAdd;
        
        const { error: updateError } = await supabase
          .from('users')
          .update({ packs_owned: newPacksTotal })
          .eq('wallet_address', walletAddress);

        if (updateError) throw updateError;
      }

      alert("Transaction successful! Packs added to your Vault.");
    } catch (error: any) {
      console.error('Purchase failed:', error);
      alert(`Transaction failed: ${error.message}`);
    }
  };

  useEffect(() => {
    document.title = "Trench Digitals | For The Trenches";
  }, []);

  // Simple router for Vite preview environment
  if (typeof window !== "undefined" && window.location.pathname === "/contact") {
    return <ContactPage />;
  }
  if (typeof window !== "undefined" && window.location.pathname === "/vault") {
    return (
      <div className="font-sans">
        <Navbar />
        <VaultPage />
      </div>
    );
  }
  if (typeof window !== "undefined" && window.location.pathname === "/rip") {
    return (
      <div className="font-sans">
        <Navbar />
        <RipPage />
      </div>
    );
  }

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
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-hidden">
        {/* Left Column */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col"
        >
          <motion.div variants={itemVariants}>
            <p className="text-red-600 font-bold tracking-[0.2em] text-sm mb-6 uppercase">
              The First of its Kind
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tight text-slate-900 leading-[0.95] mb-8">
              The Culture, Graded.
            </h1>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg mb-12">
              1,250 Packs. 30+ Icons. Open digital packs instantly on-chain. Pull a Secret Rare, and we ship the physical, foil-printed slab directly to your vault. No NFTs. Just pure collectibles.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => handleBuy(0.025, 1)}
              className="px-8 py-4 rounded-xl border-2 border-slate-200 bg-white hover:border-red-600 hover:text-red-600 text-slate-900 font-bold transition-all w-full sm:w-auto text-center"
            >
              Buy 1 Pack (0.025 SOL)
            </button>
            <button 
              onClick={() => handleBuy(0.075, 3)}
              className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center"
            >
              Buy Booster Box (0.075 SOL)
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="w-full flex justify-center lg:justify-end"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="drop-shadow-2xl"
          >
            <img 
              src="/booster-box.webp" 
              alt="Trench Digitals Booster Box" 
              className="w-full max-w-md object-contain"
            />
          </motion.div>
        </motion.div>
      </main>

      {/* Vault Tracker Section */}
      <VaultTracker />

      {/* How It Works Section */}
      <HowItWorks />

      {/* The Grails Section */}
      <TheGrails />

      {/* Vault Security Section */}
      <VaultSecurity />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA & Footer */}
      <FinalCTA onBuy={handleBuy} />
    </div>
  );
}
