"use client";
import React from "react";

import { motion } from "framer-motion";
import { Award, CheckCircle, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    <section className="py-16 lg:py-20 bg-gradient-to-br from-[#283E61] to-[#1e2f4a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12 lg:gap-16 items-start">
          {/* Left Side - Content */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, x: -50 }}
            animate={
              headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.8 }}
            className="space-y-8 max-w-[500px]"
          >
            <div>
              <h2 className="text-4xl lg:text-4xl font-bold  ">
                Indexing Status & Partnerships
              </h2>
              <p className=" max-w-4xl text-[16px] opacity-[80%] mt-[-2%] mx-auto leading-relaxed">
                <strong className="font-bold ">
                  SR Publishing House
                </strong>{" "}
                is actively pursuing indexing in leading academic databases
                including Scopus, Web of Science, PubMed, DOAJ, and Google
                Scholar to maximize the visibility and impact of our research.
              </p>
            </div>
          </motion.div>

          {/* Right Side - Certifications Grid */}
          <motion.div
            ref={cardsRef}
            initial={{ opacity: 0, x: 50 }}
            animate={cardsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6 flex-1"
          >
            <div className="grid grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-20 mb-3">
                    <Image
                      src={cert.logo}
                      alt={`${cert.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-sm font-medium text-[#283E61] text-center leading-tight">
                    {cert.name}
                  </h4>
                </motion.div>
              ))}
            </div>

          
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
