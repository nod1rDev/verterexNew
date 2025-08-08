"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "react-feather";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yale_blue-50 to-mint_cream-100 flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className=""
          >
            <Image 
              src="/not-found.jpg" 
              alt="Not Found" 
              width={500}
              height={300}
              className="mx-auto "
            />
            <p className="text-2xl font-semibold text-yale_blue-400 mb-2">
              Page Not Found
            </p>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </p>
            
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yale_blue-400 
                text-white rounded-full hover:bg-yale_blue-500 transition-colors duration-300"
            >
              <ArrowLeft size={20} />
              Return Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}