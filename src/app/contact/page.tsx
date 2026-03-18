"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Mocking next/link for Vite compatibility in this environment
// In a real Next.js app, you would use: import Link from "next/link";
const Link = ({ href, children, className }: any) => (
  <a href={href} className={className}>
    {children}
  </a>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    walletAddress: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", walletAddress: "", message: "" });
      alert("Message sent! Our team will reach out shortly.");
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-20 px-6">
      <div className="w-full max-w-2xl">
        <Link
          href="/"
          className="text-sm font-bold text-slate-500 hover:text-red-600 uppercase tracking-widest flex items-center gap-2 mb-8 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Vault
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <p className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase mb-4 text-center">
          SUPPORT
        </p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4 text-center">
          Contact Trench Digitals.
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-xl text-center mb-12 mx-auto">
          Have an issue with your Season 1 Packs or physical slab redemption?
          Reach out below.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 w-full max-w-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-bold text-slate-900 uppercase tracking-wider"
            >
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-bold text-slate-900 uppercase tracking-wider"
            >
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="walletAddress"
              className="text-sm font-bold text-slate-900 uppercase tracking-wider"
            >
              Phantom Wallet Address{" "}
              <span className="text-slate-400 normal-case tracking-normal font-medium">
                (Optional - Helpful for transaction support)
              </span>
            </label>
            <input
              type="text"
              id="walletAddress"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
              placeholder="Enter your Solana wallet address"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-bold text-slate-900 uppercase tracking-wider"
            >
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium placeholder:text-slate-400 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 mt-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Submit Message"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
