"use client";

import { useState, useEffect } from 'react';
import {
  BookOpen,
  Send,
  Users,
  Shield,
  HelpCircle,
  FileText,
  Languages,
  CheckCircle,
  Search,
} from "lucide-react";

const services = [
  {
    title: "Author Guidelines",
    description:
      "Learn about general manuscript formatting, referencing style, and structure requirements applicable to all SR Publishing House journals.",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Submission Process",
    description:
      "An overview of how to submit your manuscript using our centralized submission system, including key steps and expected timelines.",
    icon: Send,
    color: "bg-green-50 text-green-600"
  },
  {
    title: "Peer Review Policy",
    description:
      "Understand our double-blind peer review model, selection of reviewers, and evaluation criteria to ensure academic integrity and transparency.",
    icon: Users,
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Publishing Ethics",
    description:
      "Familiarize yourself with our ethical standards, including authorship responsibilities, conflicts of interest, and plagiarism policies.",
    icon: Shield,
    color: "bg-red-50 text-red-600"
  },
  {
    title: "FAQs for Authors",
    description:
      "Find answers to commonly asked questions regarding submission, publication timelines, copyright, and more.",
    icon: HelpCircle,
    color: "bg-yellow-50 text-yellow-600"
  },
  {
    title: "Copyediting Service",
    description:
      "We offer optional copyediting support to help authors improve grammar, clarity, and overall manuscript flow before peer review.",
    icon: FileText,
    color: "bg-indigo-50 text-indigo-600"
  },
  {
    title: "Language Editing Service",
    description:
      "Need help refining your English-language manuscript? Our language editors can assist non-native speakers in achieving professional academic tone.",
    icon: Languages,
    color: "bg-orange-50 text-orange-600"
  },
  {
    title: "Proofreading Service",
    description:
      "Before final publication, our team provides high-quality proofreading to ensure accuracy in content, formatting, and citations.",
    icon: CheckCircle,
    color: "bg-teal-50 text-teal-600"
  },
  // Yangi xizmat
  {
    title: "Plagiarism Check",
    description:
      "Ensure your manuscript is free from plagiarism with our comprehensive similarity check and detailed plagiarism report.",
    icon: Search,
    color: "bg-pink-50 text-pink-600"
  },
];

interface AuthorAPIData {
  status: string;
  data: {
    totalAuthors: number;
    activeJournals: number;
    averageReviewTime: string;
    acceptanceRate: string;
    guidelines: {
      manuscriptFormats: string[];
      maxFileSize: string;
      referenceStyle: string;
      wordLimit: {
        research: string;
        review: string;
        brief: string;
      };
    };
    supportServices: {
      languageEditing: boolean;
      copyEditing: boolean;
      proofreading: boolean;
      plagiarismCheck: boolean;
    };
    contactInfo: {
      email: string;
      phone: string;
      businessHours: string;
      responseTime: string;
    };
  };
  timestamp: string;
}

interface AuthorInfo {
  data: AuthorAPIData | null;
  loading: boolean;
  error: string | null;
}

export default function ForAuthours() {
  const [authorInfo, setAuthorInfo] = useState<AuthorInfo>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchAuthorInfo = async () => {
      try {
        const response = await fetch('/api/author-info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.status === 'success') {
          setAuthorInfo({ data, loading: false, error: null });
        } else {
          throw new Error(data.message || 'Failed to fetch author information');
        }
      } catch (error) {
        setAuthorInfo({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred while fetching data'
        });
        console.error('Error fetching author information:', error);
      }
    };

    fetchAuthorInfo();
  }, []);

  return (
    <section
      className="w-full py-10 px-4 bg-inherit"
      role="main"
      aria-labelledby="authors-title"
    >
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            id="authors-title"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl leading-tight lg:leading-[57px] font-bold text-[#283E61]  text-center"
          >
            For Authors
          </h2>
          <p className="text-[#283E61] max-w-4xl text-[16px] opacity-[80%] mt-[-2%] mx-auto leading-relaxed">
            Find clear guidelines, policies, and services to support you from submission to publication.
          </p>
        </div>

        {/* API Status Indicators */}
        {authorInfo.loading && (
          <div
            className="flex justify-center items-center py-8"
            role="status"
            aria-label="Loading author information"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#283E61]"></div>
            <span className="ml-3 text-[#283E61]">Loading author information...</span>
          </div>
        )}

        {authorInfo.error && (
          <div
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
            role="alert"
            aria-live="polite"
          >
            <p className="text-red-800 text-center">
              We're unable to load author information right now. Please check back soon.
            </p>
          </div>
        )}

       

        {/* Services Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="group"
          aria-label="Author services and guidelines"
        >
          {services.map((service, index) => (
            <div
              key={`service-${index}`}
              className="rounded-lg [@media(min-width:1540px)]:p-10 p-6 shadow-sm border-[2px] border-gray-200
                transition-all duration-500 hover:shadow-2xl hover:-translate-y-1
                bg-white hover:border-gray-400 hover:shadow-blue-100/50
                group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
              role="article"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.currentTarget.click();
                }
              }}
              aria-label={`${service.title}: ${service.description}`}
            >
              <div className="flex flex-col gap-2 mb-4">
                <div className={`inline-flex items-center justify-center w-10 h-10 [@media(min-width:1540px)]:w-12 [@media(min-width:1540px)]:h-12 rounded-lg mb-2 ${service.color}`}>
                  <service.icon
                    className="w-5 h-5 [@media(min-width:1540px)]:w-6 [@media(min-width:1540px)]:h-6"
                    aria-hidden="true"
                  />
                </div>
  
                <h3
                  className="text-[20px] [@media(min-width:1540px)]:text-[24px] font-semibold
                  text-[#272727]"
                >
                  {service.title}
                </h3>
              </div>
              <p
                className="leading-relaxed text-base md:text-lg
                text-[#49648E] [@media(min-width:1540px)]:text-[20px]"
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>

      

       
      </div>
    </section>
  );
}
