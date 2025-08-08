import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Additional utility functions for the journals section
export function formatISSN(issn: string): string {
  // Format ISSN with proper hyphen placement
  if (issn.length === 8) {
    return `${issn.slice(0, 4)}-${issn.slice(4)}`
  }
  return issn
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}

export function generateJournalSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Color utilities for journal categories
export const categoryColors = {
  "Life Sciences, Agriculture & Food": {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    accent: "bg-green-600",
  },
  Chemistry: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    accent: "bg-purple-600",
  },
  "Medicine & Health": {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    accent: "bg-red-600",
  },
  "Materials Science": {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    accent: "bg-blue-600",
  },
  "Mathematics & Physics": {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    accent: "bg-indigo-600",
  },
  "Electrical & Computer Science": {
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    border: "border-cyan-200",
    accent: "bg-cyan-600",
  },
  "Earth, Energy & Environment": {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    accent: "bg-emerald-600",
  },
  "Architecture & Civil Engineering": {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    accent: "bg-orange-600",
  },
  Education: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
    accent: "bg-yellow-600",
  },
  "Economics & Management": {
    bg: "bg-pink-50",
    text: "text-pink-700",
    border: "border-pink-200",
    accent: "bg-pink-600",
  },
  "Humanities & Social Sciences": {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
    accent: "bg-violet-600",
  },
  Multidisciplinary: {
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-gray-200",
    accent: "bg-gray-600",
  },
} as const

export function getCategoryColor(category: string) {
  return categoryColors[category as keyof typeof categoryColors] || categoryColors.Multidisciplinary
}

// Animation utilities
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Validation utilities
export function isValidISSN(issn: string): boolean {
  const issnRegex = /^\d{4}-?\d{3}[\dX]$/
  return issnRegex.test(issn.replace(/\s/g, ""))
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Local storage utilities
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue

  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error)
    return defaultValue
  }
}

export function setToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error)
  }
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window === "undefined") return

  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error)
  }
}
