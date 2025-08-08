// API Response Types
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

// Author Information API Types
export interface AuthorAPIData {
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
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  contactType?: 'general' | 'author-inquiry' | 'submission-support' | 'editorial' | 'technical' | 'partnership';
  affiliation?: string;
  phone?: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  timestamp: string;
  status: 'received' | 'processing' | 'completed';
  priority: 'high' | 'medium' | 'low';
  autoResponse: string;
}

// Chat API Types
export interface ChatMessage {
  id: string;
  sessionId: string;
  timestamp: string;
  userMessage: string;
  botResponse: string;
  userType: 'visitor' | 'author' | 'reviewer';
  status: 'success' | 'error';
}

// User Types
export interface UserData {
  email: string;
  username: string;
  id?: string;
  role?: 'author' | 'reviewer' | 'admin';
  affiliation?: string;
  verified?: boolean;
}

// Form Validation Types
export interface FormErrors {
  [key: string]: string;
}

export interface FormState<T = Record<string, any>> {
  data: T;
  errors: FormErrors;
  isSubmitting: boolean;
  isValid: boolean;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'aria-label'?: string;
  role?: string;
}

export interface AnimatedComponentProps extends BaseComponentProps {
  delay?: number;
  duration?: number;
  index?: number;
}

// Statistics Types
export interface StatisticItem {
  number: string | number;
  label: string;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
}

// Service Types
export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  features?: string[];
}

// Journal Types
export interface Journal {
  id: string;
  title: string;
  description: string;
  issn?: string;
  scope: string[];
  submissionGuidelines?: string;
  reviewProcess?: string;
  publishingFee?: number;
  averageReviewTime?: string;
}

// Navigation Types
export interface NavItem {
  href: string;
  label: string;
  children?: NavItem[];
  external?: boolean;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
  path?: string;
}

// Loading States
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: string;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type HttpStatusCode = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];