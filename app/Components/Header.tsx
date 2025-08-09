"use client";

import Link from "next/link";
import type React from "react";

import { Search, ChevronDown, HelpCircle, User, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./custom-button";

interface UserData {
  email: string;
  username: string; // Add username to UserData interface
  // Add other user properties here if needed
}

import MobileMenu from './MobileMenu';

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  // States and refs for custom hover dropdowns
  const [isJournalsOpen, setIsJournalsOpen] = useState(false);
  const journalsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isAuthorsOpen, setIsAuthorsOpen] = useState(false);
  const authorsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(localStorage.getItem("email"));
      setUsername(localStorage.getItem("username") || "");
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleAuthChange = () => {
      const token = localStorage.getItem("token");

      if (token) {
        fetch("http://217.199.253.46:3001/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              setUser(data.data);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };

    window.addEventListener("auth-change", handleAuthChange);
    handleAuthChange(); // Initial check

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, [isClient, email]);

  // New useEffect for scroll-based active link
  useEffect(() => {
    // Define the IDs of the sections that correspond to the scrollable navigation links
    const scrollableSectionIds = [
      "home",
      "about",
      "journals",
      "for-authours",
      "news",
      "contact",
    ];
    const headerHeight = 0; // Approximate height of your fixed header, adjust as needed

    const handleScroll = () => {
      let currentActive: string | null = null;
      // Iterate through sections to find which one is currently in view
      for (const id of scrollableSectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // A section is considered active if its top is within the header height
          // and its bottom is below the header height (meaning it's still visible).
          if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
            currentActive = id;
            break; // Found the first section from the top that is in view
          }
        }
      }

      // Special handling for the very top of the page (home section)
      // If no specific section is active and the scroll position is near the top,
      // consider 'home' as active.
      if (!currentActive && window.scrollY < headerHeight) {
        currentActive = "home";
      }

      setActiveSectionId(currentActive);
    };

    // Debounce the scroll event for performance
    let scrollTimeout: NodeJS.Timeout | null = null;
    const debouncedHandleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(handleScroll, 50); // Adjust debounce time as needed
    };

    window.addEventListener("scroll", debouncedHandleScroll);
    // Call once on mount to set the initial active section
    debouncedHandleScroll();

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setUser(null);
    window.location.href = "/login";
  };

  // Modified Function to check if link is active
  const isActiveLink = (href: string) => {
    // Handle the root path link (e.g., "/")
    if (href === "/") {
      // It's active if the current pathname is "/" AND
      // either no specific section is active (initial load, or scrolled to top)
      // or the 'home' section is explicitly identified as active by scroll.
      return (
        pathname === "/" &&
        (activeSectionId === null || activeSectionId === "home")
      );
    }

    // Handle links with hashes (e.g., "/#about", "#journals", "#for-authours")
    if (href.includes("#")) {
      const hashId = href.split("#")[1];
      return activeSectionId === hashId;
    }

    // Handle regular path links (e.g., "/news", "/contact")
    // These are assumed to be separate pages, not sections on the current landing page.
    return pathname.startsWith(href);
  };

  // Generic hover handlers for custom dropdowns
  const handleMouseEnter = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setter(true);
  };

  const scientificResults = [
    "Scientific results in Natural Sciences",
    "Scientific results in Exact and Applied Sciences",
    "Scientific results in Social Sciences",
    "Scientific results in Medical and Health Sciences",
    "Scientific results in Agricultural and Environmental Sciences",
    "Scientific results in Technical and Engineering Sciences",
    "Scientific results in Economical Science",
    "Scientific results in Political Science",
  ];

  const authorTitles = [
    "Author Guidelines",
    "Submission Process",
    "Peer Review Policy",
    "Publishing Ethics",
    "FAQs for Authors",
    "Copyediting Service",
    "Language Editing Service",
    "Proofreading Service",
  ];

  const handleMouseLeave = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    timeoutRef.current = setTimeout(() => {
      setter(false);
    }, 150); // Small delay to allow moving mouse to dropdown content
  };

  return (
    <header className="w-full bg-[#EDF1F9] sticky top-0 z-50">
      {/* Top Row - Logo and Right Actions */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <img
                className="w-[34px] h-[34px] mt-[-5px]"
                src="/vertex.png"
                alt="SR Publishing House Logo"
              />
              <Link
                href="/"
                className="text-[#283E61] font-bold text-[20px] leading-[24px]"
              >
                SR Publishing House
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-[#272727] hover:text-gray-800 transition-colors text-sm">
                <HelpCircle className="h-4 w-4 mr-1" />
                Help
              </button>
              <button className="flex items-center text-[#272727] hover:text-gray-800 transition-colors text-sm">
                <Search className="h-4 w-4 mr-1" />
                Search
              </button>

              {/* Language Changer (still using shadcn/ui for better styling) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-[#272727] hover:bg-gray-200 transition-colors text-sm px-3 py-1 h-auto"
                  >
                    {selectedLanguage} <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-24 font-medium">
                  <DropdownMenuItem onClick={() => setSelectedLanguage("UZ")}>
                    UZ
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedLanguage("RU")}>
                    RU
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedLanguage("EN")}>
                    EN
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {!loading &&
                (user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center text-[#283E61] text-[14px] leading-[19px] font-[500] p-2 rounded-md hover:bg-gray-200 transition-colors">
                        <User className="h-5 w-5 mr-2" />
                        My Account
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.username}
                        </p>
                      </div>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-500 cursor-pointer"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link href="/login">
                      <button className="flex justify-center items-center w-[70px] h-[38px] rounded-[100px] border border-[#D2D2D2] text-[#283E61] text-[14px] leading-[19px] font-[500] hover:bg-gray-100 transition-colors">
                        Login
                      </button>
                    </Link>
                    <Link href="/register">
                      <button className="bg-[#283E61] hover:bg-slate-800 flex justify-center items-center w-[109px] h-[38px] rounded-[100px] text-white text-[14px] leading-[19px] font-[500] transition-colors">
                        Register
                      </button>
                    </Link>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Navigation Menu */}
      <div className="bg-[#283E61] text-white shadow-md">
        <div className="max-w-[54%] mx-auto">
          <nav className="flex items-center justify-between h-12 text-[0.85rem]">
            <Link
              href="/"
              className={`text-white hover:bg-[#0561AC] transition-colors h-full flex items-center px-4
                  ${isActiveLink("#home") ? "bg-[#0561AC]" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/#about"
              className={`text-white hover:bg-[#0561AC] transition-colors h-full flex items-center px-4
                  ${isActiveLink("/#about") ? "bg-[#0561AC]" : ""}`}
            >
              About Us
            </Link>

            {/* Journals Custom Dropdown (Hover) */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() =>
                handleMouseEnter(setIsJournalsOpen, journalsTimeoutRef)
              }
              onMouseLeave={() =>
                handleMouseLeave(setIsJournalsOpen, journalsTimeoutRef)
              }
            >
              <button
                className={`flex items-center text-white hover:bg-[#0561AC] transition-colors h-full px-4
                    ${
                      isActiveLink("#journals") || isJournalsOpen
                        ? "bg-[#0561AC]"
                        : ""
                    }`}
                aria-expanded={isJournalsOpen}
                aria-haspopup="true"
              >
                Journals
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    isJournalsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isJournalsOpen && (
                <div
                  className="absolute top-full left-0 mt-0 w-[700px] bg-white rounded-md shadow-lg py-4 z-20 text-gray-800"
                  onMouseEnter={() =>
                    handleMouseEnter(setIsJournalsOpen, journalsTimeoutRef)
                  }
                  onMouseLeave={() =>
                    handleMouseLeave(setIsJournalsOpen, journalsTimeoutRef)
                  }
                >
                  <div className="flex justify-between px-4">
                    {/* Left side */}
                    <div className="flex-1 flex flex-col gap-2 pr-4">
                      {scientificResults.slice(0, 4).map((result) => (
                        <Link
                          href="#journals"
                          key={result}
                          className="block text-sm hover:bg-gray-100 px-3 py-2 rounded"
                        >
                          {result}
                        </Link>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-gray-300 mx-2"></div>

                    {/* Right side */}
                    <div className="flex-1 flex flex-col gap-2 pl-4">
                      {scientificResults.slice(4).map((result) => (
                        <Link
                          href="#journals"
                          key={result}
                          className="block text-sm hover:bg-gray-100 px-3 py-2 rounded"
                        >
                          {result}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* For Authors Custom Dropdown (Hover) */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() =>
                handleMouseEnter(setIsAuthorsOpen, authorsTimeoutRef)
              }
              onMouseLeave={() =>
                handleMouseLeave(setIsAuthorsOpen, authorsTimeoutRef)
              }
            >
              <button
                className={`flex items-center text-white hover:bg-[#0561AC] transition-colors h-full px-4
                    ${
                      isActiveLink("#for-authours") || isAuthorsOpen
                        ? "bg-[#0561AC]"
                        : ""
                    }`}
                aria-expanded={isAuthorsOpen}
                aria-haspopup="true"
              >
                For Authors
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    isAuthorsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isAuthorsOpen && (
                <div
                  className="absolute top-full left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-20 text-gray-800"
                  onMouseEnter={() =>
                    handleMouseEnter(setIsAuthorsOpen, authorsTimeoutRef)
                  }
                  onMouseLeave={() =>
                    handleMouseLeave(setIsAuthorsOpen, authorsTimeoutRef)
                  }
                >
                  {authorTitles.map((title) => (
                    <Link
                      href={`#for-authours`}
                      key={title}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="#news"
              className={`text-white hover:bg-[#0561AC] transition-colors h-full flex items-center px-4
                  ${isActiveLink("#news") ? "bg-[#0561AC]" : ""}`}
            >
              News
            </Link>
            <Link
              href="#contact"
              className={`text-white hover:bg-[#0561AC] transition-colors h-full flex items-center px-4
                  ${isActiveLink("#contact") ? "bg-[#0561AC]" : ""}`}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
