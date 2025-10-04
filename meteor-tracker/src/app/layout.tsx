import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meteor Tracker - Near-Earth Objects & Impact Assessment",
  description: "Track near-Earth objects, meteors, and asteroids with real-time impact assessment and threat analysis. Stay informed about potential space threats to Earth.",
  keywords: ["meteor", "asteroid", "near-earth objects", "space", "NASA", "impact", "threat assessment"],
  authors: [{ name: "Meteor Tracker Team" }],
  creator: "Meteor Tracker",
  publisher: "Meteor Tracker",
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
  metadataBase: new URL('https://meteor-tracker.vercel.app'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://meteor-tracker.vercel.app",
    title: "Meteor Tracker - Near-Earth Objects & Impact Assessment",
    description: "Track near-Earth objects, meteors, and asteroids with real-time impact assessment and threat analysis.",
    siteName: "Meteor Tracker",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Meteor Tracker - Near-Earth Objects Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meteor Tracker - Near-Earth Objects & Impact Assessment",
    description: "Track near-Earth objects, meteors, and asteroids with real-time impact assessment and threat analysis.",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://api.nasa.gov" />
        <link rel="preconnect" href="https://data-nasa-bucket-production.s3.us-east-1.amazonaws.com" />
        <link rel="dns-prefetch" href="https://api.nasa.gov" />
        <link rel="dns-prefetch" href="https://data-nasa-bucket-production.s3.us-east-1.amazonaws.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
          {children}
        </div>
      </body>
    </html>
  );
}