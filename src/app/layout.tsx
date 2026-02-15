import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarFooterWrapper from "./layout/navbarfooterwrapper";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saket MGM School",
  description: "Official website of Saket MGM School - Education, Admissions, News & Updates",
  keywords: [
    "Saket MGM School",
    "School in India",
    "CBSE School",
    "Education",
    "Admissions",
    "School Events",
    "Student Portal",
    "Teachers",
    "Parents",
  ],
  authors: [{ name: "Saket MGM School", url: "https://www.saketmgm.com" }],
  creator: "Saket MGM School",
  publisher: "Saket MGM School",
  metadataBase: new URL("https://www.saketmgm.com"),
  themeColor: "#f82f53",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    title: "Saket MGM School",
    description: "Official website of Saket MGM School - Education, Admissions, News & Updates",
    url: "https://www.saketmgm.com",
    siteName: "Saket MGM School",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Saket MGM School Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saket MGM School",
    description: "Official website of Saket MGM School - Education, Admissions, News & Updates",
    creator: "@saketmgmschool",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavbarFooterWrapper>{children}</NavbarFooterWrapper>
      </body>
    </html>
  );
}
