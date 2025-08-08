"use client";
import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

// --- Custom Button Component ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "default" | "icon";
  asChild?: boolean;
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variantClasses = {
    default: "bg-[#334155] text-white hover:bg-[#334155]/90",
    outline:
      "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
  };
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    icon: "h-10 w-10",
  };
  // If asChild is true, return a div with appropriate type
  if (asChild) {
    return (
      <div
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      />
    );
  }
  // Otherwise return a button with button props
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}

// --- Custom Card Components ---
function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-4 space-y-3 ${className}`} {...props} />;
}

function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center p-4 pt-0 ${className}`} {...props} />
  );
}

// --- Custom Badge Component ---
function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`inline-flex items-center rounded-md border border-transparent px-3 py-1 text-sm font-medium bg-[#E0F2FE] text-[#334155] ${className}`}
      {...props}
    />
  );
}

// --- Custom DropdownMenu Components ---
interface DropdownMenuContextType {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownMenuContext = React.createContext<
  DropdownMenuContextType | undefined
>(undefined);

interface DropdownMenuProps {
  children: React.ReactNode;
}

function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <DropdownMenuContext.Provider value={{ setIsOpen }}>
      <div className="relative" ref={dropdownRef}>
        {React.Children.map(children, (child) => {
          if (
            React.isValidElement(child) &&
            (child.type as any).displayName === "DropdownMenuTrigger"
          ) {
            return React.cloneElement(child as React.ReactElement<any>, {
              onClick: toggleOpen,
            });
          }
          if (
            React.isValidElement(child) &&
            (child.type as any).displayName === "DropdownMenuContent"
          ) {
            return isOpen ? child : null;
          }
          return child;
        })}
      </div>
    </DropdownMenuContext.Provider>
  );
}
(DropdownMenu as any).displayName = "DropdownMenu";

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function DropdownMenuTrigger({
  children,
  onClick,
  className,
}: DropdownMenuTriggerProps) {
  return (
    <Button
      variant="outline"
      className={`flex items-center gap-2 rounded-md ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
(DropdownMenuTrigger as any).displayName = "DropdownMenuTrigger";

interface DropdownMenuContentProps {
  children: React.ReactNode;
  align?: "start" | "end" | "center";
  className?: string;
}

function DropdownMenuContent({
  children,
  align = "end",
  className,
}: DropdownMenuContentProps) {
  const alignClasses = {
    start: "left-0",
    end: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };
  return (
    <div
      className={`absolute z-50 mt-2 w-[200px] rounded-md border border-gray-200 bg-white p-1 text-gray-900 shadow-md ${alignClasses[align]} ${className}`}
    >
      {children}
    </div>
  );
}
(DropdownMenuContent as any).displayName = "DropdownMenuContent";

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function DropdownMenuItem({
  children,
  onClick,
  className,
}: DropdownMenuItemProps) {
  const context = React.useContext(DropdownMenuContext);
  const handleClick = useCallback(() => {
    onClick?.();
    context?.setIsOpen(false); // Close dropdown on item click
  }, [onClick, context]);
  return (
    <div
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none transition-colors hover:bg-gray-100 ${className}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
(DropdownMenuItem as any).displayName = "DropdownMenuItem";

// --- Custom NewsCard Component ---
interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category_name: string;
  pub_date: string; // "YYYY-MM-DD" format from API
  href: string;
  show_image: boolean;
  show_desc: boolean;
}

interface NewsCardProps {
  news: NewsItem;
}

function NewsCard({ news }: NewsCardProps) {
  const year = news.pub_date.split(".")[2];
  const formattedDate = `${news.pub_date}`;

  return (
    <Card className=" bg-[#FFFFFF] shadow-xl rounded-[20px] overflow-hidden">
      <div className="relative h-[231px] rounded-[8px]">
        {news.show_image && news.image ? (
          <img
            src={news.image || "/placeholder.svg"}
            alt={news.title}
            className="w-full h-full object-cover "
          />
        ) : (
          <div className="w-full h-full bg-[#E0F2FE] flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-800">
              No Image
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4  [@media(min-width:1540px)]:p-6 space-y-3 [@media(min-width:1540px)]:space-y-6">
        <div className="flex items-center justify-between">
          <Badge className="bg-[#9ED1FF5C] [@media(min-width:1540px)]:text-[1.2rem] text-[#49648E] opacity-[80%] font-[500] rounded-md px-3 py-1">
            {news.category_name}
          </Badge>
          <span className="text-[#49648E] text-[16px] [@media(min-width:1540px)]:text-[1.2rem] leading-[28px] font-[500]">
            {formattedDate}
          </span>
        </div>
        <h3 className="text-[18px] [@media(min-width:1540px)]:text-[1.4rem] font-[600] text-[#283E61] leading-[28px] line-clamp-2">
          {news.title}
        </h3>
        {news.show_desc && (
          <p className="font-normal text-[18px] [@media(min-width:1540px)]:text-[1.4rem] text-[#49648E] leading-[26.45px] tracking-[-0.23px] align-middle font-inter truncate">
            {news.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 flex-1 pt-0">
        <Link href={news.href} className="w-full">
          <button className="w-[157px] h-[38px] [@media(min-width:1540px)]:w-[200px] [@media(min-width:1540px)]:h-[48px] [@media(min-width:1540px)]:text-[1.4rem] text-[#283E61]  font-[500] leading-[28px] rounded-[40px] border border-[#D9D9D9] hover:bg-[#283E61] hover:text-white  bg-[#283E61]  transition-all duration-300">
            Learn more
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
}

// --- Demo News Data ---
const demoNewsData: NewsItem[] = [
  {
    id: 1,
    title: "New Journal Launch: Scientific Results in Environmental Sciences",
    description: "We are excited to announce the launch of our latest journal focused on environmental research and sustainability studies.",
    image: "/s1.png",
    category_name: "Publishing",
    pub_date: "15.01.2024",
    href: "/journals",
    show_image: true,
    show_desc: true,
  },
  {
    id: 2,
    title: "SR Publishing House Partners with International Research Network",
    description: "Strategic partnership to expand global reach and enhance research collaboration opportunities for authors worldwide.",
    image: "/s2.png",
    category_name: "Partnership",
    pub_date: "12.01.2024",
    href: "/news",
    show_image: true,
    show_desc: true,
  },
  {
    id: 3,
    title: "Enhanced Peer Review Process Implementation",
    description: "Introduction of AI-assisted peer review tools to streamline manuscript evaluation while maintaining academic integrity.",
    image: "/s3.png",
    category_name: "Technology",
    pub_date: "10.01.2024",
    href: "/for-authours",
    show_image: true,
    show_desc: true,
  },
  {
    id: 1,
    title: "New Journal Launch: Scientific Results in Environmental Sciences",
    description: "We are excited to announce the launch of our latest journal focused on environmental research and sustainability studies.",
    image: "/s1.png",
    category_name: "Publishing",
    pub_date: "15.01.2024",
    href: "/journals",
    show_image: true,
    show_desc: true,
  },
  {
    id: 2,
    title: "SR Publishing House Partners with International Research Network",
    description: "Strategic partnership to expand global reach and enhance research collaboration opportunities for authors worldwide.",
    image: "/s2.png",
    category_name: "Partnership",
    pub_date: "12.01.2024",
    href: "/news",
    show_image: true,
    show_desc: true,
  },
  {
    id: 3,
    title: "Enhanced Peer Review Process Implementation",
    description: "Introduction of AI-assisted peer review tools to streamline manuscript evaluation while maintaining academic integrity.",
    image: "/s3.png",
    category_name: "Technology",
    pub_date: "10.01.2024",
    href: "/for-authours",
    show_image: true,
    show_desc: true,
  },
  
];

// --- Main NewsSection Component ---
export default function NewsSection() {
  const [newsData, setNewsData] = useState<NewsItem[]>(demoNewsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All News");
  const [currentPage, setCurrentPage] = useState(0);
  const [usingDemoData, setUsingDemoData] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://217.199.253.46:3001/news");
        const result = await response.json();

        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          const transformedData: NewsItem[] = result.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.image,
            category_name: item.category_name,
            pub_date: item.pub_date,
            href: "#",
            show_image: item.image !== "",
            show_desc: true,
          }));
          setNewsData(transformedData);
          setUsingDemoData(false);
        } else {
          // Use demo data as fallback
          setNewsData(demoNewsData);
          setUsingDemoData(true);
        }
      } catch (err) {
        // Use demo data as fallback when API fails
        setNewsData(demoNewsData);
        setUsingDemoData(true);
        setError(null); // Don't show error when using demo data
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const uniqueCategories = Array.from(
    new Set(newsData.map((item) => item.category_name))
  );
  const categories = ["All News", ...uniqueCategories];

  const filteredNews =
    selectedCategory === "All News"
      ? newsData
      : newsData.filter((news) => news.category_name === selectedCategory);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const displayedNews = filteredNews.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (loading) {
    return (
      <div className="w-full py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#283E61]"></div>
      </div>
    );
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py- bg-[#EDF1F9]">
      <div className="container px-2">
        {/* Header - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-4 ">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#283E61] ">
              News
            </h2>
           
          </div>
          <p className="text-[#283E61] max-w-4xl text-[16px] opacity-[80%] mt-[-2%] mx-auto leading-relaxed">
            Stay updated with the latest developments, announcements, and achievements from SR Publishing House.
            Discover our new journal launches, partnership news, and innovations in scientific publishing.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className={`w-[38px] h-[38px] flex justify-center items-center rounded-[100px] transition-colors ${
                currentPage === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#283E61] hover:bg-[#1e2f4a] cursor-pointer"
              }`}
            >
              <img
                src="/left-arrow.svg"
                alt="Previous"
                className={currentPage === 0 ? "opacity-50" : "opacity-100"}
              />
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className={`w-[38px] h-[38px] flex justify-center items-center rounded-[100px] transition-colors ${
                currentPage === totalPages - 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#283E61] hover:bg-[#1e2f4a] cursor-pointer"
              }`}
            >
              <img
                src="/right-arrow.svg"
                alt="Next"
                className={
                  currentPage === totalPages - 1
                    ? "opacity-50"
                    : "opacity-100"
                }
              />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-[280px] justify-between">
                <span className="text-[16px] font-medium">
                  {selectedCategory}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[280px]">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    className="text-[14px] py-2.5"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedNews.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))}
        </div>
      </div>
    </section>
  );
}
