"use client";
import React from 'react';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const cards = [
  {
    icon: "globe",
    text: "Promote the visibility and impact of research worldwide",
    highlight: "research",
  },
  {
    icon: "audit",
    text: "Ensure inclusive, open access to scholarly content",
    highlight: "open access",
  },
  {
    icon: "job-search",
    text: "Uphold rigorous peer review and publication ethics",
    highlight: "peer review",
  },
];

export default function MissionSection() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="w-full bg-[#EDF1F9]" role="region" aria-labelledby="mission-title">
      <div className="max-w-[85%] mx-auto py-8 sm:py-12 md:py-16 lg:py-20">
        <motion.h2
          id="mission-title"
          ref={headerRef}
          initial={{ opacity: 0, y: -50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[53px] leading-tight lg:leading-[57px] font-bold text-[#283E61] mb-8 text-center"
        >
          Our core mission is to:
        </motion.h2>

        <motion.div
          ref={cardsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="shadow-[0px_4px_14px_0px_rgba(0,0,0,0.25)] rounded-[20px] hover:bg-[#E4ECFD] min-h-[242px] bg-white p-6 duration-300 hover:transform hover:-translate-y-2 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={
                cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ delay: index * 0.1 }}
              role="article"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.currentTarget.click();
                }
              }}
              aria-label={`Mission: ${card.text}`}
            >
              <div className="flex flex-col h-full">
                <div className="flex-shrink-0 mb-6">
                  <motion.img
                    src={`/${card.icon}.svg`}
                    className="w-[60px] h-[60px] group-hover:scale-110 transition-transform duration-300"
                    alt=""
                    aria-hidden="true"
                    initial={{ scale: 0 }}
                    animate={cardsInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  />
                </div>
                <motion.p
                  className="text-[#283E61] font-inter font-medium text-lg sm:text-xl lg:text-[20.5px] leading-relaxed lg:leading-[26.45px] tracking-[-0.23px] flex-grow"
                  initial={{ opacity: 0 }}
                  animate={cardsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {card.text.split(card.highlight).map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="text-blue-600 font-medium group-hover:underline">
                          {card.highlight}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
