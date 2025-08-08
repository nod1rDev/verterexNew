"use client";

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Define news categories
const categories = [
  "All News",
  "Research Updates",
  "Scientific Discoveries",
  "Academic Events",
  "Publishing News",
  "Awards & Recognition",
];

const newsData = [
  {
    id: 1,
    title: "Advanced Research Methods",
    subtitle: "Breakthrough Discovery in Quantum Physics Research",
    category: "Publishing News",
    date: "12-Jan, 2025",
    description: "Ensure inclusive and open access to cutting-edge quantum physics research methodologies and findings...",
    image: "/s1.png",
  },
  {
    id: 2,
    title: "International Conference",
    subtitle: "Global Scientific Collaboration Summit 2025",
    category: "Academic Events", 
    date: "15-Jan, 2025",
    description: "Ensure inclusive and open participation in the largest international scientific collaboration event...",
    image: "/s2.png",
  },
  {
    id: 3,
    title: "New Publication Standards",
    subtitle: "Enhanced Peer Review Guidelines Released",
    category: "Publishing News",
    date: "18-Jan, 2025", 
    description: "Ensure inclusive and open peer review processes with new comprehensive guidelines for academic publishing...",
    image: "/s3.png",
  },
  {
    id: 4,
    title: "Research Excellence Awards",
    subtitle: "Outstanding Scientific Achievements Recognized",
    category: "Awards & Recognition",
    date: "22-Jan, 2025",
    description: "Ensure inclusive and open recognition of exceptional research contributions across multiple disciplines...",
    image: "/s4.png",
  },
  {
    id: 5,
    title: "Digital Innovation Lab", 
    subtitle: "AI-Powered Research Tools Launch",
    category: "Scientific Discoveries",
    date: "25-Jan, 2025",
    description: "Ensure inclusive and open access to revolutionary AI tools transforming scientific research methodologies...",
    image: "/s5.png",
  },
];

export default function NewsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All News");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredNews =
    selectedCategory === "All News"
      ? newsData
      : newsData.filter((news) => news.category === selectedCategory);

  // Auto-rotation functionality - only start after component is mounted
  useEffect(() => {
    if (!mounted || filteredNews.length <= 3) return;

    const startAutoRotation = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          return (prevIndex + 1) % filteredNews.length;
        });
      }, 2000); // Change every 2 seconds
    };

    // Start auto-rotation after a small delay to ensure stability
    const timeoutId = setTimeout(startAutoRotation, 100);

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [filteredNews.length, mounted]);

  // Get 3 visible cards starting from currentIndex
  const getVisibleNews = () => {
    if (filteredNews.length <= 3) return filteredNews;
    
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % filteredNews.length;
      visible.push(filteredNews[index]);
    }
    return visible;
  };

  const handlePrevious = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? filteredNews.length - 1 : prevIndex - 1;
    });
  };

  const handleNext = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentIndex((prevIndex) => {
      return (prevIndex + 1) % filteredNews.length;
    });
  };

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    setCurrentIndex(0); // Reset to first item when category changes
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Always show the same initial content for hydration safety
  const visibleNews = getVisibleNews();

  return (
    <section className="w-full py-12 bg-[#EDF1F9]" id="news">
      <div className="max-w-[90%] mx-auto px-4">
        {/* Header with Navigation and Filter */}
        <div className="flex justify-between items-start mb-8">
          {/* Left side - Title and Navigation */}
          <div className="flex items-center gap-6">
            <h2 className="text-[50px] font-bold text-[#283E61] leading-tight">
              Latest News & Updates
            </h2>
            
            {/* Navigation Arrows - only show after mounting to prevent hydration issues */}
            {mounted && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  className="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-[#283E61] hover:bg-[#1e2f4a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#283E61]"
                  aria-label="Previous news"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-[#283E61] hover:bg-[#1e2f4a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#283E61]"
                  aria-label="Next news"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            )}
          </div>

          {/* Right side - Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-[280px] px-4 py-3 text-[#283E61] bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#283E61] shadow-sm font-medium"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#283E61] pointer-events-none w-5 h-5" />
          </div>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleNews.map((news, index) => (
            <article
              key={`news-${news.id}-${index}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              {/* Date Header */}
              <div className="px-6 pt-6 pb-2">
                <p className="text-sm text-[#7A7A7B] font-medium">
                  {news.date}
                </p>
              </div>

              {/* Main Title */}
              <div className="px-6 pb-4">
                <h3 className="text-2xl font-bold text-[#283E61] mb-2">
                  {news.title}
                </h3>
              </div>

              {/* Content Section */}
              <div className="px-6 pb-6 space-y-4">
                {/* Category Badge */}
                <div className="inline-block">
                  <span className="px-3 py-1 text-sm font-medium text-[#283E61] bg-[#E0F2FE] rounded-md">
                    {news.category}
                  </span>
                </div>

                {/* Subtitle */}
                <h4 className="text-lg font-semibold text-[#283E61] leading-tight">
                  {news.subtitle}
                </h4>

                {/* Description */}
                <p className="text-[#7A7A7B] text-sm leading-relaxed line-clamp-3">
                  {news.description}
                </p>

                {/* Learn More Button */}
                <button className="inline-flex items-center text-[#283E61] font-medium text-sm hover:text-[#1e2f4a] transition-colors group-hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#283E61] rounded px-1 py-1">
                  Learn more
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#7A7A7B] text-lg">
              No news found in this category.
            </p>
          </div>
        )}

        {/* Progress Indicator - only show after mounting */}
        {mounted && filteredNews.length > 3 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: filteredNews.length }).map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-[#283E61]"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to news ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
