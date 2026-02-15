import AdmissionsHeader from "../component/admission/admissionsHeader";
import AdmissionProcess from "../component/admission/admissionProcess";
import AdmissionProcedure from "../component/admission/admissionProcedure";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions - Saket MGM School",
  description:
    "Complete admission process, procedures, and guidelines for enrolling at Saket MGM School. Learn about eligibility, important dates, fees, and more.",
  keywords: [
    "Saket MGM School Admissions",
    "School Admission Process",
    "CBSE School Admission",
    "Admission Procedure",
    "Student Enrollment",
    "School Fees",
    "Eligibility Criteria",
    "Apply Online Saket MGM School",
    "Education",
    "School Registration",
    "Saket MGM School Updates",
    "School Events",
  ],
  authors: [{ name: "Saket MGM School", url: "https://www.saketmgm.com" }],
  creator: "Saket MGM School",
  publisher: "Saket MGM School",
  metadataBase: new URL("https://www.saketmgm.com"),
  openGraph: {
    type: "website",
    title: "Admissions - Saket MGM School",
    description:
      "Complete admission process, procedures, and guidelines for enrolling at Saket MGM School. Learn about eligibility, important dates, fees, and more.",
    url: "https://www.saketmgm.com/admissions",
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
    title: "Admissions - Saket MGM School",
    description:
      "Complete admission process, procedures, and guidelines for enrolling at Saket MGM School. Learn about eligibility, important dates, fees, and more.",
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
  // Note: RootLayout icons will be inherited automatically
};

export default function AdmissionsPage() {
  return (
    <>
      <AdmissionsHeader />
      <AdmissionProcess />
      <AdmissionProcedure />
    </>
  );
}
