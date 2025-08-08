"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function Hero() {
  return (
    <section 
      aria-label="Hero" 
      className="relative min-h-[80vh] py-8 sm:py-12 md:py-16 lg:py-[12%] xl:py-[14%] bg-[#EDF1F9] overflow-hidden"
    >
      <motion.img
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1 }}
        src="/art2.png"
        className="absolute bottom-[10%] left-0 object-cover w-1/2 md:w-auto opacity-10 sm:opacity-20"
        alt="Decorative background element"
      />
      <motion.img
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1 }}
        src="/art1.png"
        className="absolute bottom-[10%] right-0 sm:right-[80px] object-cover w-1/2 md:w-auto opacity-10 sm:opacity-20"
        alt="Decorative right background element"
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-11/12 sm:max-w-[747px] mx-auto text-[#283E61] px-4 sm:px-0"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight sm:leading-[80px] text-center font-bold mb-4"
        >
          Scientific Results
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg sm:text-2xl md:text-[32px] text-center leading-snug sm:leading-[32.16px] text-[#7A7A7B] mb-6 px-4 sm:px-0"
        >
          Open Access. Peer Reviewed. Global Knowledge.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mx-auto flex flex-col sm:flex-row max-w-[420px] items-center gap-4 px-4 sm:px-0"
        >
          <Link href="#about" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-[195px] h-[50px] sm:h-[67px] rounded-[40px] bg-[#D9D9D9] border border-[#D9D9D9] text-[#272727] text-base sm:text-xl md:text-[24px] font-[500] flex justify-center items-center transition-colors hover:bg-[#C5C5C5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D9D9D9]"
            >
              Learn more
            </motion.button>
          </Link>
          <Link href="#journals" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-[195px] h-[50px] sm:h-[67px] rounded-[40px] bg-[#283E61] border border-[#D9D9D9] text-[#FFFFFF] text-base sm:text-xl md:text-[24px] font-[500] flex justify-center items-center transition-colors hover:bg-[#1F304A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#283E61]"
            >
              View Journals
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
