import Gallery from "../component/gallery/Gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery - Saket MGM School",
  description:
    "Explore the photo gallery of Saket MGM School. View images of campus life, events, classrooms, laboratories, sports activities, student achievements, and school celebrations.",
  keywords: [
    "Saket MGM School Gallery",
    "School Photos",
    "Campus Life",
    "School Events",
    "Student Activities",
    "Classroom Photos",
    "Laboratories",
    "Sports Activities",
    "School Achievements",
    "Education",
    "CBSE School",
    "Photography",
    "School Celebrations",
    "Student Life",
    "Facilities",
    "Campus Tour",
    "Teachers and Staff",
    "Extracurricular Activities",
    "School Competitions",
    "Awards and Achievements",
    "Annual Day",
    "Cultural Events",
    "Sports Day",
    "Science Exhibitions",
    "School Library",
    "Laboratory Sessions",
    "School Trips",
    "Student Projects",
    "School Functions",
    "Art and Music",
    "Education in India",
    "Modern School Campus",
    "Learning Environment",
    "CBSE School India",
    "School Programs",
    "Student Engagement",
    "School Community",
    "Class Activities",
    "Teacher Interaction",
    "School Campus Images",
    "Photo Gallery",
    "School Memories",
    "Education Highlights",
    "Campus Infrastructure",
    "School Tours",
    "Parent Interaction",
    "Student Portfolios",
    "School Culture",
    "Learning Experience",
    "Student Events",
    "School Activities",
    "Campus Highlights",
  ],
  authors: [{ name: "Saket MGM School", url: "https://www.saketmgm.com" }],
  creator: "Saket MGM School",
  publisher: "Saket MGM School",
  metadataBase: new URL("https://www.saketmgm.com"),
  openGraph: {
    type: "website",
    title: "Gallery - Saket MGM School",
    description:
      "Explore the photo gallery of Saket MGM School. View images of campus life, events, classrooms, laboratories, sports activities, student achievements, and school celebrations.",
    url: "https://www.saketmgm.com/gallery",
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
    title: "Gallery - Saket MGM School",
    description:
      "Explore the photo gallery of Saket MGM School. View images of campus life, events, classrooms, laboratories, sports activities, student achievements, and school celebrations.",
    creator: "@saketmgmschool",
    images: ["/logo.png"],
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
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function GalleryPage() {
  return (
    <>
      <Gallery />
    </>
  );
}
