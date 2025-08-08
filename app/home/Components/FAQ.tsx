"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "What is the scope of Scientific Results journals?",
    answer:
      "Scientific Results covers all major research disciplines including natural sciences, social sciences, engineering, medical sciences, and humanities. Each journal maintains rigorous peer-review standards while promoting open access to scientific knowledge.",
  },
  {
    question: "Are there publication fees or article processing charges?",
    answer:
      "We believe in accessible publishing. While some services may have fees, we offer waivers and discounts for authors from developing countries and early-career researchers. Contact us to discuss your specific situation.",
  },
  {
    question: "What is the typical review timeline?",
    answer:
      "Our standard peer review process takes 4-8 weeks from submission to initial decision. Fast-track options are available for time-sensitive research. Authors receive regular updates throughout the process.",
  },
  {
    question: "What are your copyright and licensing policies?",
    answer:
      "We use Creative Commons licenses to ensure maximum accessibility while protecting author rights. Authors retain copyright of their work, and we provide clear guidelines on usage and attribution.",
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const headingId = `faq-heading-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-md ${
        isOpen ? "ring-1 ring-[rgb(40,62,97)/0.15]" : ""
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(40,62,97)] focus-visible:ring-offset-white rounded-lg"
        aria-expanded={isOpen}
        aria-controls={panelId}
        id={headingId}
      >
        <h3 className="pr-4 text-base sm:text-lg font-semibold text-[#283E61]">
          {faq.question}
        </h3>
        <span
          aria-hidden="true"
          className="flex-shrink-0 rounded-full border border-gray-200 p-1"
        >
          <ChevronDown
            className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="content"
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <p className="leading-relaxed text-gray-600">{faq.answer}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    );
  }, [query]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const expandAll = () => {
    setOpenItems(filteredFaqs.map((_, i) => i));
  };

  const collapseAll = () => {
    setOpenItems([]);
  };

  return (
    <section className="bg-[#EDF1F9] py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left: Header and helpers */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, x: -40 }}
            animate={
              headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 lg:sticky lg:top-24"
          >
            <div>
              <h2 className="mb-3 text-3xl sm:text-4xl font-bold text-[#283E61]">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-[#283E61] opacity-80">
                Find answers to common questions about publishing with{" "}
                <strong className="font-bold text-[#283E61]">
                  SR Publishing House
                </strong>{" "}
                journals. We&apos;re here to support you through every step of
                the publishing process.
              </p>
            </div>
          </motion.div>

          {/* Right: FAQ list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={
              headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }
            }
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <ul className="space-y-3">
              {filteredFaqs.length === 0 ? (
                <li className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-gray-600">
                  No results found for "{query}". Try another search.
                </li>
              ) : (
                filteredFaqs.map((faq, i) => (
                  <FAQItem
                    key={`${faq.question}-${i}`}
                    faq={faq}
                    index={i}
                    isOpen={openItems.includes(i)}
                    onToggle={() => toggleItem(i)}
                  />
                ))
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
