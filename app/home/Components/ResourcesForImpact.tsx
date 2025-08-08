"use client";
import React from 'react';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Languages,
  Send,
  Shield,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const resources = [
  {
    title: "Author Guidelines",
    description: "Comprehensive formatting and submission requirements",
    icon: BookOpen,
    href: "/for-authours",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Submission Process", 
    description: "Step-by-step guide to manuscript submission",
    icon: Send,
    href: "/for-authours",
    color: "bg-green-50 text-green-600"
  },
  {
    title: "Peer Review Policy",
    description: "Transparent and rigorous review standards",
    icon: Users,
    href: "/for-authours", 
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Publishing Ethics",
    description: "Integrity and ethical standards in publishing",
    icon: Shield,
    href: "/for-authours",
    color: "bg-red-50 text-red-600"
  },
  {
    title: "Language Support",
    description: "Professional editing and translation services",
    icon: Languages,
    href: "/for-authours",
    color: "bg-orange-50 text-orange-600"
  },
  {
    title: "Quality Assurance",
    description: "Copyediting and proofreading services",
    icon: CheckCircle,
    href: "/for-authours",
    color: "bg-teal-50 text-teal-600"
  }
];

export default function ResourcesForImpact() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#283E61] mb-6">
            Resources for impact makers
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Empowering researchers, authors, and institutions with the tools and support
            needed to advance scientific knowledge and drive meaningful progress.
          </p>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          ref={cardsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={resource.href}
                className="block group h-full"
              >
                <div className="bg-white rounded-xl p-8 h-full shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-400 hover:shadow-blue-100/50">
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-6 ${resource.color}`}>
                    <resource.icon className="w-6 h-6" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-[#283E61]">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {resource.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="mt-6 flex items-center text-blue-600 font-medium">
                    <span className="mr-2">Learn more</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}