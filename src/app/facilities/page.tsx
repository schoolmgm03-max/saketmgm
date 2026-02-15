import CampusGallery from "../component/Facilities/campusGallery";
import FacilitiesHero from "../component/Facilities/facilitiesHero";
import LabsSection from "../component/Facilities/labSections";
import LibrarySection from "../component/Facilities/librarySection";
import SafetyAndConvenience from "../component/Facilities/safetyAndConvenience";
import SportsFacilities from "../component/Facilities/sportsFacilities";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facilities - Saket MGM School",
  description:
    "Explore the world-class facilities at Saket MGM School, including modern laboratories, library, sports facilities, safety measures, and campus amenities.",
  keywords: [
    "Saket MGM School Facilities",
    "School Labs",
    "School Library",
    "Sports Facilities",
    "Campus Amenities",
    "School Safety Measures",
    "Education",
    "CBSE School Facilities",
    "Student Resources",
    "Modern School Campus",
  ],
  authors: [{ name: "Saket MGM School", url: "https://www.saketmgm.com" }],
  creator: "Saket MGM School",
  publisher: "Saket MGM School",
  metadataBase: new URL("https://www.saketmgm.com"),
  openGraph: {
    type: "website",
    title: "Facilities - Saket MGM School",
    description:
      "Explore the world-class facilities at Saket MGM School, including modern laboratories, library, sports facilities, safety measures, and campus amenities.",
    url: "https://www.saketmgm.com/facilities",
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
    title: "Facilities - Saket MGM School",
    description:
      "Explore the world-class facilities at Saket MGM School, including modern laboratories, library, sports facilities, safety measures, and campus amenities.",
    creator: "@saketmgmschool",
    images: ["/logo.png"],
  },
  themeColor: "#f82f53",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function FacilitiesPage() {
  return (
    <>
      <FacilitiesHero />
      <LabsSection />
      <LibrarySection />
      <SportsFacilities />
      <SafetyAndConvenience />
      <CampusGallery />
    </>
  );
}
