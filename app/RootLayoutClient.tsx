"use client";

import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';

import Header from './Components/Header';
import ChatBot from './home/Components/ChatBot';
import Upword from './home/Components/Upword';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Vertex Science Publishing House",
    default: "Vertex Science Publishing House ",
  },
  description:
    "Expert IT solutions in ServiceNow, Salesforce, and Open Source technologies",
  icons: {
    icon: [
      { url: "/vertex.png", type: "image/x-icon" },
      { url: "/vertex.png", sizes: "16x16", type: "image/png" },
      { url: "/vertex.png", sizes: "32x32", type: "image/png" },
      { url: "/vertex.png", sizes: "192x192", type: "image/png" },
      { url: "/vertex.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/vertex.png",
    apple: [{ url: "/vertex.png", sizes: "180x180", type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {!isAdminRoute && <Header />}
        {children}
        {!isAdminRoute && <ChatBot />}
        {!isAdminRoute && <Upword />}
      </body>
    </html>
  );
}
