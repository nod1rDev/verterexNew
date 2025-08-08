"use client";
import React from 'react';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  PenTool,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

export default function CallToAction() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-[#283E61] to-[#1e2f4a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl lg:text-4xl font-bold mb-6">
                Join our global research community
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed mb-8">
                Whether you're ready to publish groundbreaking research or contribute your expertise
                as a reviewer, we welcome you to advance scientific knowledge together with <strong className="font-bold text-white">SR Publishing House</strong>.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <PenTool className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">For Authors</h3>
                  <p className="text-blue-100">Streamlined submission process with expert editorial support</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">For Reviewers</h3>
                  <p className="text-blue-100">Join our network of distinguished experts shaping research excellence</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white text-[#283E61] font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#283E61]"
              >
                <span className="mr-2">Submit Manuscript</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-[#283E61] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#283E61]"
              >
                <span className="mr-2">Join Reviewer Network</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:pl-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 border border-white/20">
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">500+</div>
                  <div className="text-sm text-blue-200">Published Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">150+</div>
                  <div className="text-sm text-blue-200">Expert Reviewers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">25+</div>
                  <div className="text-sm text-blue-200">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">98%</div>
                  <div className="text-sm text-blue-200">Author Satisfaction</div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4">Why Choose Us?</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-300 mr-3" />
                    <span className="text-blue-100">Open access publishing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-300 mr-3" />
                    <span className="text-blue-100">Rigorous peer review</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-300 mr-3" />
                    <span className="text-blue-100">Global visibility</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-300 mr-3" />
                    <span className="text-blue-100">Professional development</span>
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