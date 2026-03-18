"use client";

import { motion } from "framer-motion";

export default function TheGrails() {
  const grails = [
    { id: 1, name: "Atom", image: "/atom-manga.png.webp", serial: "P-032" },
    { id: 2, name: "Punch", image: "/punch.png.webp", serial: "P-001" },
    { id: 3, name: "Wrld", image: "/wrld-manga.png.webp", serial: "P-004" },
  ];

  return (
    <section id="grails" className="py-32 bg-slate-50 overflow-hidden border-b border-slate-200">
      {/* Header Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase mb-4">
          THE ARCHIVE
        </p>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6">
          1-of-20. Graded and Encased.
        </h2>
        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto mb-20 px-4">
          The Genesis Drop contains 30 Base Cards and the ultra-rare Manga Variants. Pull a Manga Variant, and the physical slab is yours.
        </p>
      </motion.div>

      {/* The Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 perspective-[2000px]">
        {grails.map((grail, index) => (
          <motion.div
            key={grail.id}
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5, zIndex: 40 }}
            className="bg-white backdrop-blur-md rounded-xl p-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-200/60 cursor-pointer flex flex-col relative ring-1 ring-slate-100"
          >
            {/* The Grading Label */}
            <div className="bg-white border-b border-slate-200 pb-2 mb-3 flex justify-between items-start rounded-t-lg pt-1">
              <div>
                <p className="text-[10px] font-black tracking-tighter text-slate-900 leading-none">
                  TRENCH DIGITALS
                </p>
                <p className="text-[9px] text-slate-500 font-bold">GEM MINT</p>
              </div>
              <div className="bg-red-600 text-white font-black text-lg px-2 py-0.5 rounded shadow-sm leading-none">
                10
              </div>
            </div>

            {/* The Art Image */}
            <div className="w-full aspect-[5/7] bg-slate-100 rounded border border-slate-200 overflow-hidden relative">
              <img
                src={grail.image}
                alt={grail.name}
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
