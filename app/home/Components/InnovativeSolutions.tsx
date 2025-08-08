"use client";
import React from 'react';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Globe,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const solutions = [
  {
    title: "Submission & Peer Review",
    description: "Streamlined manuscript submission with rigorous double-blind peer review processes. Our platform ensures efficient handling from initial submission to final decision, maintaining the highest academic standards.",
    icon: Search,
    features: ["Fast-track review options", "Expert reviewer network", "Transparent process"],
    href: "/for-authours"
  },
  {
    title: "Publishing Ethics & Integrity", 
    description: "Comprehensive ethics framework ensuring research integrity, plagiarism detection, and adherence to international publishing standards. We maintain transparency and accountability throughout the publication process.",
    icon: Award,
    features: ["Plagiarism screening", "Ethics compliance", "Transparent policies"],
    href: "/for-authours"
  },
  {
    title: "Indexing & Global Visibility",
    description: "Strategic partnerships with major indexing databases to maximize research discoverability and impact. We ensure your work reaches the global research community through established academic networks.",
    icon: Globe,
    features: ["Database indexing", "Global reach", "Impact tracking"],
    href: "/journals"
  }
];

export default function InnovativeSolutions() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 lg:py-24 bg-[#EDF1F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
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
                Innovative Solutions
              </h2>
              <p className="text-[#283E61] text-lg leading-relaxed mb-8 opacity-80">
                Cutting-edge publishing technologies and processes that accelerate the
                dissemination of scientific knowledge and foster global collaboration.
              </p>
            </div>

            {/* Solutions Features */}
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                      <solution.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#283E61] mb-2">{solution.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{solution.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Button */}
            <div>
              <Link
                href="/for-authours"
                className="inline-flex items-center px-8 py-4 rounded-full bg-[#283E61] text-white font-semibold hover:bg-[#1e2f4a] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="mr-2">Explore All Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Showcase Card */}
          <motion.div
            ref={cardsRef}
            initial={{ opacity: 0, x: 50 }}
            animate={cardsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:pl-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              
              {/* Card Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#283E61] mb-4">Publishing Excellence</h3>
                <p className="text-gray-600">Advanced solutions powering modern scientific publishing</p>
              </div>

              {/* Process Steps */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#283E61]">Submit & Review</h4>
                    <p className="text-sm text-gray-600">Fast-track peer review process</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#283E61]">Ethics Check</h4>
                    <p className="text-sm text-gray-600">Comprehensive integrity screening</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#283E61]">Global Indexing</h4>
                    <p className="text-sm text-gray-600">Maximum research visibility</p>
                  </div>
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#283E61]">15+</div>
                    <div className="text-xs text-gray-600">Databases</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#283E61]">24/7</div>
                    <div className="text-xs text-gray-600">Support</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#283E61]">100%</div>
                    <div className="text-xs text-gray-600">Open Access</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}