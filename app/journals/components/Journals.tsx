"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

// Custom Card Components
interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }: CardProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

// Custom Button Component
interface ButtonProps {
  children: ReactNode;
  variant?: "default" | "outline";
  size?: "default" | "sm";
  className?: string;
  onClick?: () => void;
}

function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  };

  const sizeClasses = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 text-sm",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function ScientificJournals() {
  // Add state for selected categories and search
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("");

  const sidebarItems = [
    {
      title: "Scientific Results in Natural Sciences",
      isExpanded: true,
      subcategories: [
        "Physics",
        "Chemistry",
        "Biology",
        "Geology",
        "Geography",
        "Oceanography",
        "Ecology",
        "Environmental biology",
      ],
    },
    {
      title: "Scientific Results in Exact and Applied Sciences",
      isExpanded: false,
      subcategories: [],
    },
    {
      title: "Scientific Results in Social Sciences",
      isExpanded: false,
      subcategories: [],
    },
    {
      title: "Scientific Results in Medical and Health Sciences",
      isExpanded: false,
      subcategories: [],
    },
    {
      title: "Scientific Results in Agricultural and Environmental Sciences",
      isExpanded: false,
      subcategories: [],
    },
    {
      title: "Scientific Results in Technical and Engineering Sciences",
      isExpanded: false,
      subcategories: [],
    },
    {
      title: "Scientific Results in Economic Sciences",
      isExpanded: false,
      subcategories: [],
    },
  ];

  const journals = [
    {
      title: "Scientific Results in Natural Sciences",
      issn: "ISSN:00000000",
      color: "bg-green-600",
      image: "journal1.png",
    },
    {
      title: "Scientific Results in Social Sciences",
      issn: "ISSN:00000000",
      color: "bg-orange-500",
      image: "journal2.png",
    },
    {
      title: "Scientific Results in Agricultural and Environmental Sciences",
      issn: "ISSN:00000000",
      color: "bg-green-700",
      image: "journal3.png",
    },
    {
      title: "Scientific Results in Economic Sciences",
      issn: "ISSN:00000000",
      color: "bg-green-600",
      image: "journal4.png",
    },
    {
      title: "Scientific Results in Exact and Applied Sciences",
      issn: "ISSN:00000000",
      color: "bg-blue-500",
      image: "journal5.png",
    },
    {
      title: "Scientific Results in Medical and Health Sciences",
      issn: "ISSN:00000000",
      color: "bg-teal-500",
      image: "journal6.png",
    },
    {
      title: "Scientific Results in Technical and Engineering Sciences",
      issn: "ISSN:00000000",
      color: "bg-blue-400",
      image: "journal7.png",
    },
    {
      title: "Scientific Results in Political Sciences",
      issn: "ISSN:00000000",
      color: "bg-red-500",
      image: "journal8.png",
    },
  ];

  // Handle category selection
  const handleCategoryChange = (title: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(title)) {
        return prev.filter((cat) => cat !== title);
      }
      return [...prev, title];
    });
    setActiveCategory(title);
  };

  // Filter journals based on selected categories and search term
  const filteredJournals = journals.filter((journal) => {
    const matchesSearch = journal.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(journal.title);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar with updated styling */}
      <div className="w-[19%] [@media(min-width:1540px)]:w-[17%] mt-24  bg-inherit bg-white  ml-2 rounded-xl  shadow-lg    pt-16 px-4 pb-4">
        <div className="space-y-2">
          {sidebarItems.map((item, index) => (
            <div key={index} className="space-y-1">
              {/* Journal Title with Checkbox */}
              <div
                className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                  activeCategory === item.title
                    ? "bg-[#E4ECFD]"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-2 w-full">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#283E61] border-gray-300 rounded focus:ring-[#283E61]"
                    checked={selectedCategories.includes(item.title)}
                    onChange={() => handleCategoryChange(item.title)}
                  />
                  <span className="text-sm text-[#283E61] leading-tight whitespace-normal pr-2">
                    {formatJournalTitle(item.title)}
                  </span>
                </div>
                {item.subcategories.length > 0 && (
                  <ChevronRight
                    className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${
                      item.isExpanded ? "rotate-90" : ""
                    }`}
                  />
                )}
              </div>

              {/* Subcategories with Dashes */}
              {item.isExpanded && item.subcategories.length > 0 && (
                <div className="ml-6 space-y-1">
                  {item.subcategories.map((sub, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded"
                    >
                      <span className="text-gray-400">-</span>
                      <span className="text-sm text-gray-500">{sub}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-20">
        <h1 className="text-4xl lg:text-4xl text-center font-bold text-[#283E61] ">
          Recommended Journals
        </h1>
        <p className="text-[#283E61] text-center text-lg leading-relaxed mb-8 opacity-80">
          Journals are regular publications sharing articles, research, and news
          on specific topics, available in print or online.
        </p>
        <div className="flex items-center justify-end my-8">
          {/* Category Filter Dropdown */}
          <div className="relative flex  items-end ">
            <select
              value={activeCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-[280px] h-[38px] px-4 appearance-none bg-[#edf1f9] border border-gray-400 rounded-lg text-[#283E61] text-sm focus:outline-none focus:ring-2 focus:ring-[#283E61] cursor-pointer"
            >
              <option value="">All Categories</option>
              {sidebarItems.map((item, index) => (
                <option className="text-[12px] " key={index} value={item.title}>
                  {item.title.split("Scientific Results in ")[1]}
                </option>
              ))}
            </select>
            <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 w-4 h-4 text-[#283E61] pointer-events-none" />
          </div>
        </div>

        {/* Journals Grid */}
        <div className="grid max-w-[90%]  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {journals.map((journal, index) => (
            <div
              key={index}
              className=" max-w-[160px] flex flex-col items-center  "
            >
              {/* Journal Cover */}
              <div className="relative min-w-full  h-58 mb-4 ">
                <img
                  src={`/${journal.image}`}
                  alt={`Cover of ${journal.title}`}
                  className="h-full min-w-full object-contain "
                />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#283E61] leading-tight line-clamp-2">
                  {formatJournalTitle(journal.title)}
                </h3>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                    {journal.issn}
                  </span>
                  <a
                    href="#"
                    className="inline-flex items-center text-xs font-medium text-[#283E61] hover:text-blue-600 transition-colors"
                  >
                    View
                    <svg
                      className="w-3 h-3 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Update the formatJournalTitle function
const formatJournalTitle = (title: string) => {
  const parts = title.split("Scientific Results in ");
  if (parts.length === 2) {
    return (
      <div className="flex flex-col">
        <span className="text-[14px]   text-[#283E61] whitespace-normal">
          Scientific Results in {parts[1]}
        </span>
      </div>
    );
  }
  return title;
};
