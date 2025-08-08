"use client";
import React, { useState } from 'react';

import { motion } from 'framer-motion';
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const faqs = [
  {
    question: "What is the scope of Scientific Results journals?",
    answer: "Scientific Results covers all major research disciplines including natural sciences, social sciences, engineering, medical sciences, and humanities. Each journal maintains rigorous peer-review standards while promoting open access to scientific knowledge."
  },
  {
    question: "Are there publication fees or article processing charges?",
    answer: "We believe in accessible publishing. While some services may have fees, we offer waivers and discounts for authors from developing countries and early-career researchers. Contact us to discuss your specific situation."
  },
  {
    question: "What is the typical review timeline?",
    answer: "Our standard peer review process takes 4-8 weeks from submission to initial decision. Fast-track options are available for time-sensitive research. Authors receive regular updates throughout the process."
  },
  {
    question: "What are your copyright and licensing policies?",
    answer: "We use Creative Commons licenses to ensure maximum accessibility while protecting author rights. Authors retain copyright of their work, and we provide clear guidelines on usage and attribution."
  },
  
];

interface FAQItemProps {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white  p-6  border border-gray-200 hover:shadow-md transition-all duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full text-left  "
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#283E61] pr-4">
            {faq.question}
          </h3>
          <div className="flex-shrink-0 ml-4">
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>
        </div>
      </button>
      
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pt-4">
          <p className="text-gray-600 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-[#EDF1F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-start">
          
          {/* Left Side - Content */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, x: -50 }}
            animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl lg:text-4xl font-bold text-[#283E61] mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-[#283E61] max-w-4xl text-[16px] opacity-[80%] mt-[-2%] mx-auto leading-relaxed">
                Find answers to common questions about publishing with <strong className="font-bold text-[#283E61]">SR Publishing House</strong> journals.
                We're here to support you through every step of the publishing process.
              </p>
            </div>

            
          </motion.div>

          {/* Right Side - FAQ Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className=""
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openItems.includes(index)}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}