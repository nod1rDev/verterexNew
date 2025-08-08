"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { FaTools, FaClock, FaEnvelope } from "react-icons/fa";

export default function MaintenanceBanner() {
  return (
    <div className="fixed inset-0 z-[100] bg-yale_blue-500/95 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-4 sm:p-6 md:p-8 w-[90%] sm:w-auto max-w-2xl mx-auto"
      >
        {/* Logo */}
        <div className="mb-6 md:mb-8">
          <Image
            src="/logo.png"
            alt="ApexBart Solutions Logo"
            width={60}
            height={60}
            className="mx-auto w-[60px] h-[60px] md:w-[80px] md:h-[80px]"
          />
        </div>

        {/* Icon and Title */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <FaTools className="text-3xl sm:text-4xl text-yellow-400 animate-bounce" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Under Maintenance
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-3 sm:space-y-4 text-white/90">
          <p className="text-base sm:text-lg md:text-xl px-4 sm:px-6">
            We're currently performing scheduled maintenance to improve our services.
          </p>
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <FaClock className="animate-pulse text-lg sm:text-xl" />
            <p className="text-sm sm:text-base">We'll be back shortly!</p>
          </div>
        </div>

        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 sm:mt-8 text-white/80 px-4"
        >
          <p className="text-sm sm:text-base mb-2">For urgent inquiries:</p>
          <a 
            href="mailto:hello@apexbart.com" 
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 
              transition-colors text-sm sm:text-base bg-white/10 px-4 py-2 rounded-full"
          >
            <FaEnvelope className="text-sm sm:text-base" />
            hello@apexbart.com
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
