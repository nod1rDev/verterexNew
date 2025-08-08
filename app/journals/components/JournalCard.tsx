"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface JournalCardProps {
  title: string;
  issn?: string;
  description: string;
  imageUrl?: string;
  websiteUrl: string;
}

export function JournalCard({ title, issn, description, imageUrl, websiteUrl }: JournalCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative aspect-[16/9]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Cover of ${title}`}
            fill
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">Cover image pending</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        
        {issn && issn !== "00000000" && (
          <p className="text-sm text-gray-600 mb-4">
            ISSN: {issn}
          </p>
        )}
        
        {!issn && (
          <p className="text-sm text-gray-500 mb-4 italic">
            ISSN: pending
          </p>
        )}
        
        <p className="text-gray-700 mb-6 flex-grow">
          {description}
        </p>
        
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#283E61] hover:bg-[#1F304A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#283E61] transition-colors duration-200 mt-auto"
        >
          Visit journal website
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </motion.article>
  );
}
