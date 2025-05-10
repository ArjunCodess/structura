import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Structura.AI - Extract Structured Data from Any Text",
  description:
    "AI-powered API and graphical playground that transforms unstructured text into structured data in under 3 seconds. Perfect for developers and non-technical users alike.",
  applicationName: "Structura.AI",
  authors: [{ name: "Arjun Vijay Prakash" }],
  generator: "Next.js",
  keywords: [
    "API",
    "Structured Data",
    "Unstructured Text",
    "Data Extraction",
    "AI",
    "Developer Tools",
    "Interactive Playground",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Arjun Vijay Prakash",
  publisher: "Arjun Vijay Prakash",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  openGraph: {
    title: "Structura.AI - Extract Structured Data from Any Text",
    description:
      "AI-powered API and graphical playground that transforms unstructured text into structured data in under 3 seconds. Ideal for developers and non-technical users.",
    type: "website",
    siteName: "Structura.AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Structura.AI - Extract Structured Data from Any Text",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Structura.AI - Extract Structured Data from Any Text",
    description:
      "AI-powered API and graphical playground that transforms unstructured text into structured data in under 3 seconds.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} font-[family-name:var(--font-geist)] antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}