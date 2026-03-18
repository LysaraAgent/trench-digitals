"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { Lock, PackageOpen, Trophy } from "lucide-react";
import { supabase } from "../../lib/supabase";

// Note: In a standard Next.js environment, we would use:
// import Link from "next/link";
// Since this preview environment uses Vite, we mock the Next.js Link component 
// to ensure it functions identically without breaking the build.
const Link = ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => (
  <a href={href} className={className}>{children}</a>
);

export default function VaultPage() {
  const { publicKey, connected } = useWallet();
  const [mounted, setMounted] = useState(false);
  const [unopenedPacks, setUnopenedPacks] = useState(0);
  const [collection, setCollection] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Prevent hydration mismatch on wallet connect
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchVaultData() {
      if (!publicKey) return;
      
      try {
        const walletAddress = publicKey.toBase58();
        
        // Fetch packs
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('packs_owned')
          .eq('wallet_address', walletAddress)
          .single();
          
        if (!userError && userData) {
          setUnopenedPacks(userData.packs_owned);
        }

        // Fetch inventory
        const { data: inventoryData, error: inventoryError } = await supabase
          .from('inventory')
          .select('*')
          .eq('wallet_address', walletAddress);
          
        if (!inventoryError && inventoryData) {
          setCollection(inventoryData.map((item, index) => ({
            id: item.id || index,
            name: item.card_name,
            image: item.image_url,
            isMangaRare: item.is_manga_rare,
            serial: `B-${String(index + 1).padStart(3, '0')}`
          })));
        }
      } catch (error) {
        console.error("Error fetching vault data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (connected && publicKey) {
      fetchVaultData();
    }
  }, [connected, publicKey]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (!mounted) return null;

  // Not Connected State
  if (!connected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6">
        <Lock className="w-16 h-16 text-slate-300 mb-6" />
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-4">
          Vault Locked.
        </h1>
        <p className="text-lg text-slate-500 font-medium mb-8 text-center">
          Please connect your Phantom Wallet to access your secure off-chain inventory.
        </p>
      </div>
    );
  }

  // Connected State (The Dashboard)
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase mb-2">
            YOUR VAULT
          </p>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-10">
            {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
          </h1>
        </motion.div>

        {/* The Pack Rip Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-16 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <PackageOpen className="w-8 h-8 text-slate-900 shrink-0" />
            <p className="text-xl font-bold text-slate-900">
              You have {unopenedPacks} Season 1 Packs ready to rip.
            </p>
          </div>
          <Link
            href="/rip"
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-[0_4px_15px_rgba(220,38,38,0.2)] transition-all uppercase tracking-widest text-center whitespace-nowrap"
          >
            RIP PACKS
          </Link>
        </motion.div>

        {/* The Collection Grid */}
        <div>
          <h2 className="text-2xl font-black tracking-tighter text-slate-900 mb-8 border-b border-slate-200 pb-4">
            Your Collection ({collection.length})
          </h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {collection.map((card) => (
              <motion.div
                key={card.id}
                variants={itemVariants}
                className="bg-white rounded-xl p-3 shadow-md border border-slate-200 flex flex-col ring-1 ring-slate-100 transition-transform hover:-translate-y-2 duration-300"
              >
                {/* Grading Label */}
                <div className="flex justify-between items-start border-b border-slate-200 pb-2 mb-3 px-1">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Trench Digitals</p>
                    <p className="text-xs font-black text-slate-900 uppercase truncate max-w-[120px]">{card.name}</p>
                    <p className="text-[10px] font-bold text-slate-500">{card.serial}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">GEM MINT</p>
                    <div className="bg-red-600 text-white text-sm font-black px-2 py-0.5 rounded border border-red-700 shadow-sm mt-0.5">
                      10
                    </div>
                  </div>
                </div>

                {/* Art Image */}
                <div className="aspect-[5/7] bg-slate-100 rounded border border-slate-200 overflow-hidden relative mb-4">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Redemption Button Logic */}
                {card.isMangaRare ? (
                  <Link
                    href="/contact"
                    className="w-full py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Trophy className="w-4 h-4" />
                    REDEEM PHYSICAL
                  </Link>
                ) : (
                  <div className="w-full py-2.5 bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center">
                    BASE CARD
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
