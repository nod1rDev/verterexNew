"use client";
import React from "react";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const certifications = [
  {
    name: "Unmatched Quality Standards",
    logo: "/scopus1.png",
    description:
      "ISO 9001:2015 certification guarantees world-class quality management system",
  },
  {
    name: "Cloud Solutions",
    logo: "/clarivate.jpg",
    description:
      "AWS Advanced Consulting Partner for secure, scalable solutions",
  },
  {
    name: "Microsoft Gold Partner",
    logo: "/crossref.png",
    description: "Expert integration with Microsoft technologies and platforms",
  },
  {
    name: "CMMI Level 5",
    logo: "/scholars.png",
    description: "Highest level of process maturity and development excellence",
  },
  {
    name: "Google Cloud Partner",
    logo: "/doaj.svg",
    description: "Premier Partner status for cutting-edge cloud solutions",
  },
  {
    name: "Global Presence",
    logo: "/international.png",
    description: "Offices in Phnom Penh and Tashkent serving clients worldwide",
  },
];

const Certifications = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 bg-[#EDF1F9]">
      <div className="max-w-[85%] mx-auto px-4 ">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-4xl font-bold text-[#283E61] mb-6">
            Indexing Status & Partnerships
          </h2>
          <p className="text-[#283E61] text-lg leading-relaxed mb-8 opacity-80">
            <strong className="font-bold text-[#283E61]">
              SR Publishing House
            </strong>{" "}
            is actively pursuing indexing in leading academic databases
            including Scopus, Web of Science, PubMed, DOAJ, and Google Scholar
            to maximize the visibility and impact of our research. Updates will
            be provided as evaluations progress.
          </p>
        </motion.div>

        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={
                cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="group flex justify-center items-center cursor-pointer bg-white p-3 rounded-lg  
                hover:shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] transition-all duration-300
                transform hover:-translate-y-1"
            >
              <div className="relative w-[362px] h-[153px] p-2">
                <Image
                  src={cert.logo}
                  alt={`Provider logo: ${cert.name}`}
                  fill
                  className="object-contain"
                />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={cardsInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-center p-4"
              ></motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
