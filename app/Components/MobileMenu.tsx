"use client";

import { X, Menu, ChevronDown, ChevronRight, User, LogOut, Search, HelpCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface UserData {
  email: string;
  username: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  user?: UserData | null;
  loading?: boolean;
  onLogout?: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  onToggle,
  user = null,
  loading = false,
  onLogout
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      setExpandedSection(null); // Reset expanded sections when menu closes
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleLinkClick = () => {
    onClose();
    setExpandedSection(null);
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

  return (
    <>
      <button
        className="md:hidden p-2 text-[#272727] hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-md transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-[#EDF1F9]">
            <div className="flex items-center gap-2">
              <img
                className="w-6 h-6"
                src="/vertex.png"
                alt="SR Publishing House"
              />
              <span className="text-[#283E61] font-semibold text-sm">SR Publishing House</span>
            </div>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-md transition-colors"
              onClick={onClose}
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* User Section */}
          {!loading && user && (
            <div className="px-4 py-3 border-b bg-gray-50">
              <div className="flex items-center">
                <User className="h-8 w-8 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {/* Simple Links */}
            <Link
              href="/#home"
              className="flex items-center py-3 px-3 text-base font-medium text-gray-700 hover:text-[#283E61] hover:bg-gray-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleLinkClick}
            >
              Home
            </Link>
            
            <Link
              href="/#about"
              className="flex items-center py-3 px-3 text-base font-medium text-gray-700 hover:text-[#283E61] hover:bg-gray-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleLinkClick}
            >
              About Us
            </Link>

            {/* Journals Expandable Section */}
            <div>
              <button
                className="flex items-center justify-between w-full py-3 px-3 text-base font-medium text-gray-700 hover:text-[#283E61] hover:bg-gray-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => toggleSection('journals')}
                aria-expanded={expandedSection === 'journals'}
              >
                <span>Journals</span>
                {expandedSection === 'journals' ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {expandedSection === 'journals' && (
                <div className="pl-6 space-y-1">
                  {scientificResults.map((result, index) => (
                    <Link
                      key={index}
                      href="/#journals"
                      className="block py-2 px-3 text-sm text-gray-600 hover:text-[#283E61] hover:bg-gray-50 rounded-md transition-colors"
                      onClick={handleLinkClick}
                    >
                      {result}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* For Authors Expandable Section */}
            <div>
              <button
                className="flex items-center justify-between w-full py-3 px-3 text-base font-medium text-gray-700 hover:text-[#283E61] hover:bg-gray-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => toggleSection('authors')}
                aria-expanded={expandedSection === 'authors'}
              >
                <span>For Authors</span>
                {expandedSection === 'authors' ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {expandedSection === 'authors' && (
                <div className="pl-6 space-y-1">
                  {authorTitles.map((title, index) => (
                    <Link
                      key={index}
                      href="/#for-authours"
                      className="block py-2 px-3 text-sm text-gray-600 hover:text-[#283E61] hover:bg-gray-50 rounded-md transition-colors"
                      onClick={handleLinkClick}
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#news"
              className="flex items-center py-3 px-3 text-base font-medium text-gray-700 hover:text-[#283E61] hover:bg-gray-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleLinkClick}
            >
              News
            </Link>
            
            <Link
              href="/#contact"
              className="flex items-center py-3 px-3 text-base font-medium text-gray-700 hover:text-[#283E61] hover:bg-gray-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleLinkClick}
            >
              Contact Us
            </Link>

            {/* Utility Links */}
            <div className="pt-4 mt-4 border-t">
              <button className="flex items-center w-full py-3 px-3 text-sm text-gray-600 hover:text-[#283E61] hover:bg-gray-50 rounded-md transition-colors">
                <Search className="h-4 w-4 mr-3" />
                Search
              </button>
              <button className="flex items-center w-full py-3 px-3 text-sm text-gray-600 hover:text-[#283E61] hover:bg-gray-50 rounded-md transition-colors">
                <HelpCircle className="h-4 w-4 mr-3" />
                Help
              </button>
            </div>
          </nav>

          {/* Auth Section */}
          <div className="p-4 border-t bg-gray-50">
            {!loading && (
              user ? (
                <button
                  onClick={() => {
                    if (onLogout) onLogout();
                    onClose();
                  }}
                  className="flex items-center justify-center w-full py-3 px-4 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/login"
                    className="w-full py-3 px-4 text-center text-sm font-medium text-white bg-[#283E61] rounded-md hover:bg-[#1F304A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    onClick={onClose}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="w-full py-3 px-4 text-center text-sm font-medium border border-[#283E61] text-[#283E61] rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    onClick={onClose}
                  >
                    Register
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
