"use client";

import React, { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      {/* Left Side (Logo) */}
      <a 
        href="/"
        className="flex items-center gap-2 cursor-pointer"
        onClick={(e) => {
          if (window.location.pathname === "/") {
            e.preventDefault();
            scrollToTop();
          }
        }}
      >
        <span className="text-xl font-black tracking-tighter text-slate-900 uppercase flex items-center gap-2">
          TRENCH DIGITALS
          <div className="w-2 h-2 bg-red-600 rounded-sm"></div>
        </span>
      </a>

      {/* Middle (The Links) */}
      <div className="hidden md:flex items-center gap-8">
        <a 
          href="/vault"
          className="text-sm font-bold text-slate-500 hover:text-red-600 uppercase tracking-widest transition-colors cursor-pointer"
        >
          My Vault
        </a>
        <a 
          href="/#how-it-works" 
          onClick={(e) => {
            if (window.location.pathname === "/") scrollTo(e, "#how-it-works");
          }}
          className="text-sm font-bold text-slate-500 hover:text-red-600 uppercase tracking-widest transition-colors cursor-pointer"
        >
          How It Works
        </a>
        <a 
          href="/#grails" 
          onClick={(e) => {
            if (window.location.pathname === "/") scrollTo(e, "#grails");
          }}
          className="text-sm font-bold text-slate-500 hover:text-red-600 uppercase tracking-widest transition-colors cursor-pointer"
        >
          The Grails
        </a>
        <a 
          href="/#faq" 
          onClick={(e) => {
            if (window.location.pathname === "/") scrollTo(e, "#faq");
          }}
          className="text-sm font-bold text-slate-500 hover:text-red-600 uppercase tracking-widest transition-colors cursor-pointer"
        >
          FAQ
        </a>
      </div>

      {/* Right Side (Contact & Wallet) */}
      <div className="hidden md:flex items-center gap-4">
        <a 
          href="/contact"
          className="flex items-center justify-center border border-slate-200 hover:border-slate-300 hover:text-slate-900 text-slate-500 bg-transparent px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all shadow-sm"
        >
          Contact
        </a>
        <WalletMultiButton />
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-900 p-2 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg flex flex-col py-4 px-6 md:hidden"
          >
            <div className="mb-6 flex justify-center">
              <WalletMultiButton />
            </div>
            <a 
              href="/vault"
              className="py-3 text-sm font-bold text-slate-900 hover:text-red-600 uppercase tracking-widest transition-colors cursor-pointer border-b border-slate-100"
            >
              My Vault
            </a>
            <a 
              href="/#how-it-works" 
              onClick={(e) => {
                if (window.location.pathname === "/") scrollTo(e, "#how-it-works");
              }}
              className="py-3 text-sm font-bold text-slate-900 hover:text-red-600 uppercase tracking-widest transition-colors cursor-pointer border-b border-slate-100"
            >
              How It Works
            </a>
            <a 
              href="/#grails" 
              onClick={(e) => {
                if (window.location.pathname === "/") scrollTo(e, "#grails");
              }}
              className="py-3 text-sm font-bold text-slate-900 hover:text-red-600 uppercase tracking-widest transition-colors cursor-pointer border-b border-slate-100"
            >
              The Grails
            </a>
            <a 
              href="/#faq" 
              onClick={(e) => {
                if (window.location.pathname === "/") scrollTo(e, "#faq");
              }}
              className="py-3 text-sm font-bold text-slate-900 hover:text-red-600 uppercase tracking-widest transition-colors cursor-pointer border-b border-slate-100"
            >
              FAQ
            </a>
            <a 
              href="/contact"
              className="py-3 text-sm font-bold text-slate-900 hover:text-red-600 uppercase tracking-widest transition-colors cursor-pointer"
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
