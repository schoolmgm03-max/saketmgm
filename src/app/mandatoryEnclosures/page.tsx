import DocumentsTable from "../component/mandatoryEnclosures/DocumentsTable";
import ResultsTable from "../component/mandatoryEnclosures/ResultsTable";
import SchoolInfoCard from "../component/mandatoryEnclosures/SchoolInfoCard";
import SchoolInfrastructure from "../component/mandatoryEnclosures/SchoolInfrastructure";
import StaffInfo from "../component/mandatoryEnclosures/StaffTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mandatory Enclosures - Saket MGM School",
  description:
    "View the mandatory enclosures of Saket MGM School including school details, results, staff information, required documents, and infrastructure. Complete transparency for students and parents.",
  keywords: [
    "Saket MGM School Mandatory Enclosures",
    "School Documents",
    "School Staff Info",
    "Results Table",
    "School Infrastructure",
    "School Information",
    "Student Guidelines",
    "Admission Documents",
    "CBSE School Enclosures",
    "Parent Information",
    "School Transparency",
    "Mandatory Guidelines",
    "Educational Institution",
    "School Reports",
    "Academic Performance",
    "School Facilities",
    "Faculty Information",
    "Staff Details",
    "School Policies",
    "Student Records",
    "Required Documents",
    "School Achievements",
    "School Overview",
    "Institution Details",
    "Academic Enclosures",
    "School Records",
    "Teacher Information",
    "Parent Resources",
    "Student Information",
    "Education Transparency",
    "School Administration",
    "School Compliance",
    "CBSE Compliance",
    "School Performance Metrics",
    "School Infrastructure Details",
    "School Facilities Overview",
    "School Transparency Report",
    "Educational Documentation",
    "School Governance",
    "School Data",
    "Academic Transparency",
    "Parent Awareness",
    "Student Records Overview",
    "School Policies and Enclosures",
  ],
  authors: [{ name: "Saket MGM School", url: "https://www.saketmgm.com" }],
  creator: "Saket MGM School",
  publisher: "Saket MGM School",
  metadataBase: new URL("https://www.saketmgm.com"),
  openGraph: {
    type: "website",
    title: "Mandatory Enclosures - Saket MGM School",
    description:
      "View the mandatory enclosures of Saket MGM School including school details, results, staff information, required documents, and infrastructure. Complete transparency for students and parents.",
    url: "https://www.saketmgm.com/mandatory-enclosures",
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
    title: "Mandatory Enclosures - Saket MGM School",
    description:
      "View the mandatory enclosures of Saket MGM School including school details, results, staff information, required documents, and infrastructure. Complete transparency for students and parents.",
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

export default function MandatoryEnclosuresPage() {
  return (
    <>
      <SchoolInfoCard />
      <ResultsTable />
      <StaffInfo />
      <DocumentsTable />
      <SchoolInfrastructure />
    </>
  );
}
