"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";

// Note: In a standard Next.js environment, we would use:
// import Link from "next/link";
// Since this preview environment uses Vite, we mock the Next.js Link component 
// to ensure it functions identically without breaking the build.
const Link = ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => (
  <a href={href} className={className}>{children}</a>
);

import { supabase } from '../../lib/supabase';

const BASE_CARDS = [
  { name: 'Ansem', baseImage: '/ansem' },
  { name: '404flipped', baseImage: '/404flipped' },
  { name: 'Pepe', baseImage: '/pepe' },
  { name: 'OGAntD', baseImage: '/ogant' },
  { name: 'Punch Monkey', baseImage: '/punch' },
  { name: 'The Dev', baseImage: '/the-dev' },
  { name: 'profit.eth', baseImage: '/profit' },
  { name: 'Trench God', baseImage: '/trench-god' },
  { name: 'Diamond Hands', baseImage: '/diamond-hands' },
  { name: 'Paper Hands', baseImage: '/paper-hands' }
];

export default function RipPage() {
  const [packState, setPackState] = useState<'sealed' | 'opening' | 'opened'>('sealed');
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false, false, false]);
  const [pulledCards, setPulledCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { publicKey } = useWallet();

  const handleRipPack = async () => {
    if (packState !== 'sealed' || loading) return;
    
    if (!publicKey) {
      alert("Please connect your Phantom wallet.");
      return;
    }

    setLoading(true);
    
    try {
      const walletAddress = publicKey.toBase58();

      // 1. Check if user has packs
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('packs_owned')
        .eq('wallet_address', walletAddress)
        .single();

      if (userError || !user || user.packs_owned <= 0) {
        alert("No packs available to open.");
        setLoading(false);
        return;
      }

      // 2. Deduct 1 pack
      const { error: updateError } = await supabase
        .from('users')
        .update({ packs_owned: user.packs_owned - 1 })
        .eq('wallet_address', walletAddress);

      if (updateError) throw updateError;

      // 3. Gacha Algorithm
      const generatedCards = [];
      for (let i = 0; i < 5; i++) {
        const randomBase = BASE_CARDS[Math.floor(Math.random() * BASE_CARDS.length)];
        const roll = Math.random();
        const isMangaRare = roll < 0.02; // 2% chance
        
        const card = {
          name: randomBase.name,
          image: `${randomBase.baseImage}${isMangaRare ? '-manga.png.webp' : '-normal.png.webp'}`,
          isMangaRare
        };
        generatedCards.push(card);
      }

      // 4. Save to inventory
      const inventoryData = generatedCards.map(card => ({
        wallet_address: walletAddress,
        card_name: card.name,
        image_url: card.image,
        is_manga_rare: card.isMangaRare
      }));

      const { error: inventoryError } = await supabase
        .from('inventory')
        .insert(inventoryData);

      if (inventoryError) throw inventoryError;

      setPulledCards(generatedCards);
      setPackState('opening');
      
      setTimeout(() => {
        setPackState('opened');
        setLoading(false);
      }, 1500);

    } catch (error: any) {
      console.error('Error opening pack:', error);
      alert("An unexpected error occurred.");
      setLoading(false);
    }
  };

  const handleFlipCard = (index: number) => {
    if (packState !== 'opened') return;
    const newFlipped = [...flippedCards];
    newFlipped[index] = !newFlipped[index]; // Toggle flip
    setFlippedCards(newFlipped);
  };

  const allFlipped = flippedCards.every(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden py-20">
      
      {/* White Flash Overlay during opening */}
      <AnimatePresence>
        {packState === 'opening' && (
          <motion.div 
            className="fixed inset-0 bg-white z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Screen 1 & 2: Sealed / Opening Pack */}
      {(packState === 'sealed' || packState === 'opening') && (
        <motion.div
          className="flex flex-col items-center justify-center z-10"
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <motion.img
            src="/boosterpack.png.webp"
            alt="Booster Pack"
            className={`w-64 md:w-80 object-contain drop-shadow-2xl mx-auto ${loading ? '' : 'cursor-pointer hover:scale-105'} transition-transform`}
            onClick={handleRipPack}
            animate={packState === 'opening' ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
            transition={packState === 'opening' ? { duration: 0.5, repeat: Infinity } : {}}
          />
          
          {packState === 'sealed' && (
            <button
              onClick={handleRipPack}
              disabled={loading}
              className="mt-10 px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-black tracking-widest text-xl rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "VERIFYING VAULT..." : "TEAR FOIL"}
            </button>
          )}
        </motion.div>
      )}

      {/* Screen 3: The Reveal */}
      {packState === 'opened' && (
        <div className="w-full flex flex-col items-center z-10">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-red-600 font-black tracking-widest text-xl uppercase mt-10 mb-12"
          >
            CLICK TO REVEAL
          </motion.h2>

          <div className="flex flex-wrap justify-center items-center gap-6 max-w-7xl mx-auto px-4 perspective-[1000px]">
            {pulledCards.map((card, index) => (
              <div key={index} className="w-64 lg:w-72 relative perspective-[1000px]">
                <motion.div
                  className="relative w-full cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: flippedCards[index] ? 180 : 0 }}
                  transition={{ duration: 0.6, type: 'spring' }}
                  onClick={() => handleFlipCard(index)}
                >
                  {/* Card Back */}
                  <div 
                    className="absolute inset-0 bg-slate-900 border-4 border-slate-700 rounded-xl flex items-center justify-center shadow-xl aspect-[768/1360]"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                  >
                    <span className="text-white font-black text-xl tracking-tighter transform -rotate-12">
                      TRENCH<br/>DIGITALS
                    </span>
                  </div>

                  {/* Card Front */}
                  <div 
                    className={`w-full rounded-xl bg-white p-3 flex flex-col aspect-[768/1360] ${
                      flippedCards[index] && card.isMangaRare 
                        ? 'ring-4 ring-red-600 shadow-[0_0_40px_rgba(220,38,38,0.6)] animate-pulse' 
                        : 'shadow-2xl'
                    }`}
                    style={{ 
                      transform: "rotateY(180deg)", 
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden"
                    }}
                  >
                    {/* Grading Label */}
                    <div className="flex justify-between items-start border-b border-slate-200 pb-2 mb-3">
                      <div className="flex flex-col min-w-0 pr-2">
                        <span className="text-[10px] font-black tracking-tighter text-slate-500 leading-none mb-1">TRENCH DIGITALS</span>
                        <span className="text-sm font-black text-slate-900 truncate uppercase">{card.name}</span>
                      </div>
                      <div className="flex flex-col items-end shrink-0">
                        <span className="text-[8px] text-slate-400 font-bold mb-0.5">GEM MINT</span>
                        <span className="bg-red-600 text-white font-black text-lg px-2 py-0.5 rounded shadow-sm leading-none">10</span>
                      </div>
                    </div>

                    {/* THE IMAGE FIX */}
                    <div className="w-full h-full rounded-lg border border-slate-200 overflow-hidden relative shadow-inner">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Post-Reveal Button */}
          <AnimatePresence>
            {allFlipped && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16"
              >
                <Link 
                  href="/vault"
                  className="px-8 py-4 border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all rounded-xl uppercase tracking-widest"
                >
                  RETURN TO VAULT
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
