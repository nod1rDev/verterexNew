import { Metadata } from "next";
import HomePage from "./home/Home";

// export const metadata: Metadata = {
//   title: "ApexBart Solutions - Professional IT Solutions & Services | ServiceNow, Salesforce",
//   description: "Leading provider of ServiceNow, Salesforce, and Open Source solutions. Expert IT consulting, custom development, and digital transformation services.",
//   keywords: "ServiceNow, Salesforce, IT Solutions, Digital Transformation, Custom Development, ITSM, CRM, Enterprise Solutions, Cloud Computing, Business Automation",
//   openGraph: {
//     title: "ApexBart - Professional IT Solutions & Services",
//     description: "Transform your business with expert IT solutions in ServiceNow, Salesforce & Open Source technologies",
//     type: "website",
//     locale: "en_US",
//     url: "https://apexbart.com",
//     siteName: "ApexBart",
//     images: [{
//       url: "/og-image.jpg",
//       width: 1200,
//       height: 630,
//       alt: "ApexBart IT Solutions"
//     }]
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "ApexBart - IT Solutions & Services",
//     description: "Expert IT solutions in ServiceNow, Salesforce & Open Source",
//     images: ["/og-image.jpg"]
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
//   verification: {
//     google: "your-google-verification-code",
//   },
//   viewport: "width=device-width, initial-scale=1",
//   icons: {
//     icon: "/logo.png",
//   },
//   metadataBase: new URL('https://apexbart.com'),
//   alternates: {
//     canonical: '/',
//   },
// };

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
