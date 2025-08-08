import type { Metadata } from "next";
import RootLayoutClient from "./RootLayoutClient";

export const metadata: Metadata = {
  metadataBase: new URL('https://srpublish.com'),
  title: {
    template: "%s | SR Publishing House - Scientific Results",
    default: "SR Publishing House - Open Access Scientific Publishing | Peer Review Journals",
  },
  description:
    "SR Publishing House advances scientific knowledge through high-quality open-access publishing. Submit to our peer-reviewed journals in natural sciences, medical sciences, engineering, and social sciences. Fast review times, global indexing pursuit.",
  keywords: [
    "scientific publishing",
    "open access journals",
    "peer review",
    "academic publishing",
    "research journals",
    "scientific results",
    "medical journals",
    "engineering journals",
    "natural sciences",
    "social sciences",
    "DOAJ",
    "Scopus",
    "Web of Science"
  ],
  authors: [{ name: "SR Publishing House Editorial Team" }],
  creator: "SR Publishing House",
  publisher: "SR Publishing House",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://srpublish.com',
    siteName: 'SR Publishing House',
    title: 'SR Publishing House - Open Access Scientific Publishing',
    description: 'Advancing scientific knowledge through high-quality open-access publishing. Submit to our peer-reviewed journals across multiple disciplines.',
    images: [
      {
        url: '/vertex.png',
        width: 1200,
        height: 630,
        alt: 'SR Publishing House - Scientific Results',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: '@srpublish',
    creator: '@srpublish',
    title: 'SR Publishing House - Open Access Scientific Publishing',
    description: 'Advancing scientific knowledge through high-quality open-access publishing.',
    images: ["/vertex.png"],
  },
  alternates: {
    canonical: 'https://srpublish.com',
  },
  category: 'science',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
