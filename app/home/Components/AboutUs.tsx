"use client";
import type React from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function AboutUs() {
  const headerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true });
  const textInView = useInView(textRef, { once: true });
  const imageInView = useInView(imageRef, { once: true });

  // Professional research areas with special first card
  const researchAreas = [
    {
      title: "Strengthening confidence through trusted quality",
      image: null,
      isSpecial: true,
    },
    {
      title: "Delivering mission-critical insights",
      image:
        "https://images.ctfassets.net/o78em1y1w4i4/6eYNxGzrntyVJKsdgahKNn/cd08ce12bc803e6dee30159d4c2caedb/Deliver_mission_critical_insights_-_Pillar.jpg?fm=webp&w=640&q=75",
      isSpecial: false,
    },
    {
      title: "Providing solutions for better outcomes",
      image:
        "https://images.ctfassets.net/o78em1y1w4i4/7JFoxNJxSBhSQa52NqCXJO/b2811a9d71322e7bb37e1713913263a3/Providing_solutions_for_better_outcomes_-_Pillar.jpg?fm=webp&w=640&q=75",
      isSpecial: false,
    },
    {
      title: "Helping impact makers succeed",
      image:
        "https://images.ctfassets.net/o78em1y1w4i4/27WP4sMl7Zz5LSjTjzHzVU/71f4349877c49f1e27c57f4030fd09bc/Help_impact_makers_succeed_-_Pillar.jpg?fm=webp&w=640&q=75",
      isSpecial: false,
    },
    {
      title: "Enhancing through technology and innovation",
      image:
        "https://images.ctfassets.net/o78em1y1w4i4/53RNM6QeD7roX5MJblRPGc/ecdcfccd73a0fa1ec2c8bb017051fceb/Enhance_through_technology_and_innovation_-_Pillar.jpg?fm=webp&w=640&q=75",
      isSpecial: false,
    },
    {
      title: "Championing inclusion and sustainability",
      image:
        "https://images.ctfassets.net/o78em1y1w4i4/2JSH05QP3CX0tvBq85bhi9/d65b54f04cb5f3f0751e6b68b8a11f55/Strengthening_confidence_through_trusted_quality_-_Pillar.jpg?fm=webp&w=1080&q=75",
      isSpecial: false,
    },
  ];

  // Card component for research areas with special handling
  function SimpleCard({
    area,
    index,
  }: {
    area: (typeof researchAreas)[0];
    index: number;
  }) {
    if (area.isSpecial) {
      // Special first card with text and brand color background
      return (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={imageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="relative w-full max-w-[280px] mx-auto"
        >
          <motion.div
            className="relative h-[240px] overflow-hidden rounded-lg shadow-md bg-gradient-to-br from-[#283E61] to-[#49648E] flex items-center justify-center p-6"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(40,62,97,0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white  text-lg font-semibold leading-relaxed">
              {area.title}
            </h3>
          </motion.div>
        </motion.div>
      );
    }

    // Regular cards with images and titles with gradient overlay
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={imageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative w-full max-w-[280px] mx-auto"
      >
        <motion.div
          className="relative h-[240px] overflow-hidden rounded-lg shadow-md"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
          transition={{ duration: 0.3 }}
        >
          {/* Image Section with Full Height */}
          <div className="relative h-full overflow-hidden">
            <Image
              src={area.image!}
              alt={area.title}
              fill
              className="object-cover transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />

            {/* Gradient Blur Overlay from Bottom to Top */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>

          {/* Title Section Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white  text-sm font-semibold leading-tight drop-shadow-lg">
              {area.title}
            </h3>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <section
      id="about"
      className="relative py-16 lg:py-24 bg-[#EDF1F9] w-full"
      role="main"
      aria-labelledby="about-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Section Layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Who We Are Section */}
          <div className="">
            <motion.div
              ref={textRef}
              initial={{ opacity: 0, x: -50 }}
              animate={
                textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl md:text-4xl font-bold text-[#283E61] mb-6">
                Who We Are
              </h3>
              <div className="space-y-4 text-[#283E61] opacity-[90%]  text-[0.9rem] leading-relaxed">
                <p>
                  <span className="font-semibold text-[#283E61]">
                    SR Publishing House
                  </span>{" "}
                  is an independent academic publisher dedicated to advancing
                  knowledge across science, technology, medicine, social
                  sciences, and humanities.
                </p>
                <p>
                  Through our Scientific Results journals, we offer a trusted
                  platform for high-quality, peer-reviewed research and
                  encourage global, interdisciplinary collaboration.
                </p>
                <p>
                  We connect researchers, educators, and policy makers in the
                  worldwide exchange of academic insights.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Research Areas Grid with Motion */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 50 }}
            animate={imageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center">
              {researchAreas.map((area, index) => (
                <SimpleCard key={index} area={area} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
