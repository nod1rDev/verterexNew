import React from "react";
import { motion } from 'framer-motion';

interface TitleSectionProps {
  title: string;
  subtitle?: string;
}

function TitleSection({ title, subtitle }: TitleSectionProps) {
  return (
    <div 
      
      className="relative w-full py-16 md:py-24 bg-yale_blue-500 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h1 
         
          className="text-3xl md:text-4xl font-bold text-white text-center 
            relative z-10"
        >
          {title}
        </h1>
        {subtitle && (
          <p
           
            className="mt-4 text-lg text-powder_blue-200 text-center max-w-2xl 
              mx-auto relative z-10"
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] bg-repeat" />
      </div>

      {/* Background Cloud SVG */}
      <svg
        width="500"
        height="500"
        viewBox="0 0 500 500"
        fill="none"
        className="absolute -right-32 top-1/2 -translate-y-1/2 opacity-10"
      >
        <path
          d="M355.5 250C355.5 308.5 308.5 356 250 356C191.5 356 144 308.5 144 
            250C144 191.5 191.5 144 250 144C308.5 144 355.5 191.5 355.5 250Z"
          fill="currentColor"
          className="text-white"
        />
      </svg>

      {/* Left Background Shape */}
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-10 rotate-45"
      >
        <rect
          x="50"
          y="50"
          width="300"
          height="300"
          rx="40"
          fill="currentColor"
          className="text-white"
        />
      </svg>
    </div>
  );
}

export default TitleSection;
