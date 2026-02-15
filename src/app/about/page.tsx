// app/about/page.tsx
import type { Metadata } from "next";
import LegacySection from "../component/about/legacySection";
import AboutSection from "../component/about/aboutSection";
import WhyChoose from "../component/about/whyChoose";
import VisionMissionValues from "../component/about/visionMissionValues";

export const metadata: Metadata = {
  title: "About Us - Saket MGM School | Vision, Legacy & Values",
  description:
    "Discover Saket MGM School — our history, mission, vision and core values. Learn how we combine academic excellence with character-building, modern infrastructure, experienced faculty, and a caring environment that prepares students for future challenges. Read about our legacy, achievements, educational approach, community engagement, and why families choose Saket MGM School.",
  keywords: [
    "Saket MGM School",
    "About Saket MGM",
    "School history",
    "School vision",
    "school mission",
    "school values",
    "why choose Saket MGM",
    "school legacy",
    "education philosophy",
    "holistic education",
    "character education",
    "student development",
    "school community",
    "faculty excellence",
    "school achievements",
    "academic programs",
    "co-curricular activities",
    "school infrastructure",
    "safety and well being",
    "parent engagement",
    "alumni",
    "school awards",
    "school leadership",
    "principal message",
    "school ethos",
    "values-driven education",
    "inclusive education",
    "student-centred learning",
    "digital learning",
    "modern classrooms",
    "laboratories",
    "library resources",
    "sports and athletics",
    "arts and culture",
    "life skills programs",
    "career counselling",
    "community outreach",
    "sustainability programs",
    "school governance",
    "admissions information",
    "school tours",
    "open day",
    "teacher training",
    "professional development",
    "parent-teacher association",
    "school calendar",
    "school policies",
    "school code of conduct",
    "student welfare",
    "safety protocols",
    "inclusive classrooms",
    "special needs support",
    "values and ethics",
    "critical thinking",
    "creative learning",
    "extracurricular activities",
    "leadership development",
    "service learning",
    "global exposure",
    "exchange programs",
    "innovation labs",
    "coding and robotics",
    "science and math enrichment",
    "language programs",
    "reading programs",
    "scholarships and merit awards",
    "assessment policy",
    "holistic assessment",
    "parent resources",
    "student testimonials",
    "campus life",
    "school culture",
    "long-form school profile",
    "education in india",
    "cbse school profile"
  ],
  authors: [{ name: "Saket MGM School", url: "https://www.saketmgm.com" }],
  creator: "Saket MGM School",
  publisher: "Saket MGM School",
  metadataBase: new URL("https://www.saketmgm.com"),
  openGraph: {
    type: "website",
    title: "About Us - Saket MGM School | Vision, Legacy & Values",
    description:
      "Discover Saket MGM School’s legacy, mission and values. Read about our academic approach, campus facilities, teaching staff, community involvement and why families trust Saket MGM for holistic student development.",
    url: "https://www.saketmgm.com/about",
    siteName: "Saket MGM School",
    images: [
      {
        url: "/school-img-1.jpg",
        width: 1200,
        height: 630,
        alt: "Saket MGM School Campus",
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
    title: "About Us - Saket MGM School",
    description:
      "Learn about Saket MGM School’s mission, values and legacy — committed to academic excellence and character development through a safe, modern and nurturing environment.",
    creator: "@saketmgmschool",
    images: ["/school-img-1.jpg", "/logo.png"],
  },
  icons: {
    // RootLayout icons will be used site-wide; included here for completeness
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  themeColor: "#f82f53",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.saketmgm.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <LegacySection />
      <AboutSection />
      <WhyChoose />
      <VisionMissionValues />
    </>
  );
}
