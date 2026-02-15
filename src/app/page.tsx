import Achievements from "./component/landing/achievements";
import FacilitiesSection from "./component/landing/FacilitiesSection";
import GlanceSection from "./component/landing/glanceSection";
import HeroSection from "./component/landing/herosection";
import PrincipalMessage from "./component/landing/PrincipalMessage";
import ApproachSection from "./component/landing/approachsection";
import TestimonialsSection from "./component/landing/testimonialssection";
import GallerySection from "./component/landing/GallerySection";
import NewsSection from "./component/landing/news";
import type { Metadata } from "next";

/**
 * Home page with very comprehensive SEO metadata.
 * UI components are left unchanged — only metadata is added.
 */

export const metadata: Metadata = {
  title: "Saket MGM School — Excellence in Holistic Education | Admissions, Campus, Activities",
  description: `Saket MGM School combines academic excellence with holistic development to prepare students for a rapidly changing world.
  We offer a rich, balanced curriculum with strong emphasis on critical thinking, creativity, character-building and digital literacy.
  Our campus provides modern laboratories, extensive library resources, athletics and arts programs, safe and supportive student services,
  experienced faculty, and a vibrant co-curricular calendar including science fairs, cultural festivals and community outreach.
  Learn about admissions, fees, scholarships, academic calendar, transport, parent engagement, alumni achievements and the school's vision for future-ready learners.`,
  keywords: [
    "Saket MGM School",
    "Saket MGM",
    "school in india",
    "best school near me",
    "cbse school",
    "school admissions",
    "school fees",
    "school campus",
    "school facilities",
    "school gallery",
    "school achievements",
    "school news",
    "school events",
    "school results",
    "school principal message",
    "holistic education",
    "student development",
    "co-curricular activities",
    "sports facilities",
    "science labs",
    "computer labs",
    "school library",
    "parent teacher association",
    "school transport",
    "school safety",
    "school infrastructure",
    "teacher profiles",
    "faculty development",
    "early childhood education",
    "primary education",
    "secondary education",
    "senior secondary",
    "extracurricular programs",
    "arts and culture",
    "music and dance",
    "drama and theatre",
    "debate and elocution",
    "public speaking",
    "career counseling",
    "career guidance",
    "scholarships",
    "merit awards",
    "student leadership",
    "student council",
    "community service",
    "social responsibility",
    "environmental education",
    "sustainability programs",
    "digital learning",
    "e-learning",
    "smart classrooms",
    "learning resources",
    "teacher training",
    "academic calendar",
    "admission procedure",
    "application form",
    "open day",
    "school tours",
    "parent engagement",
    "communication with parents",
    "alumni network",
    "placement statistics",
    "competitive exam guidance",
    "olympiads",
    "science exhibitions",
    "annual day",
    "sports day",
    "inter-school competitions",
    "laboratory safety",
    "inclusive education",
    "special education support",
    "counseling services",
    "mental health support",
    "first aid",
    "school policies",
    "attendance policy",
    "code of conduct",
    "school uniform",
    "meal program",
    "school cafeteria",
    "health and hygiene",
    "transport routes",
    "bus facility",
    "school maps",
    "virtual tour",
    "photo gallery",
    "video gallery",
    "school blog",
    "press releases",
    "news and notices",
    "admission dates",
    "cutoff criteria",
    "eligibility criteria",
    "online application",
    "contact school",
    "school phone",
    "school email",
    "student achievements",
    "teacher awards",
    "national level achievements",
    "international exposure",
    "exchange programs",
    "workshops",
    "training programs",
    "innovation lab",
    "maker space",
    "coding classes",
    "robotics club",
    "entrepreneurship",
    "life skills",
    "character education",
    "value education"
  ],
  authors: [{ name: "Saket MGM School", url: "https://www.saketmgm.com" }],
  creator: "Saket MGM School",
  publisher: "Saket MGM School",
  metadataBase: new URL("https://www.saketmgm.com"),
  openGraph: {
    type: "website",
    title:
      "Saket MGM School — Excellence in Holistic Education | Admissions, Campus, Activities",
    description:
      "Explore Saket MGM School: modern campus, labs, library, sports, arts, strong academics and character-building programs. Admissions open — learn about process, dates and scholarships.",
    url: "https://www.saketmgm.com",
    siteName: "Saket MGM School",
    images: [
      {
        url: "/school-img-1.jpg",
        width: 1200,
        height: 630,
        alt: "Saket MGM School Campus",
      },
      {
        url: "/school-img-2.jpg",
        width: 1200,
        height: 630,
        alt: "Saket MGM School Activities",
      },
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
    title:
      "Saket MGM School — Excellence in Holistic Education | Admissions, Campus, Activities",
    description:
      "Modern campus, strong academics, vibrant student life and comprehensive admissions information — Saket MGM School.",
    creator: "@saketmgmschool",
    images: ["/school-img-1.jpg", "/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  themeColor: "#f82f53",
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Optional alternates (language versions or canonical) can be added if needed:
  alternates: {
    canonical: "https://www.saketmgm.com",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <PrincipalMessage />
      <GlanceSection />
      <NewsSection />
      <Achievements />
      <FacilitiesSection />
      <ApproachSection />
      <TestimonialsSection />
      <GallerySection />
    </>
  );
}
