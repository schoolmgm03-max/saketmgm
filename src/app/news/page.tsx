import NewsNoticesHeader from "../component/newsNotice/newsNoticeSection";
import NoticeBoard from "../component/newsNotice/noticeBoard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Notices - Saket MGM School",
  description:
    "Stay updated with the latest news, announcements, and notices from Saket MGM School. Get information about school events, circulars, results, and important updates for students and parents.",
  keywords: [
    "Saket MGM School News",
    "Saket MGM School Notices",
    "School Announcements",
    "CBSE School Updates",
    "School Circulars",
    "Student Updates",
    "Parent Notifications",
    "Educational News",
    "School Events",
    "Academic Notices",
    "School Achievements",
    "Exam Results",
    "Holiday Notices",
    "Admission Updates",
    "School Activities",
    "Student Guidelines",
    "Teacher Announcements",
    "Parent Circulars",
    "School Communication",
    "Educational Announcements",
    "School Alerts",
    "Latest News Saket MGM",
    "School Information",
    "Student Announcements",
    "School Administration",
    "Important Notices",
    "School Calendar",
    "Academic Updates",
    "Parent Awareness",
    "Student Resources",
    "Educational Transparency",
  ],
  authors: [{ name: "Saket MGM School", url: "https://www.saketmgm.com" }],
  creator: "Saket MGM School",
  publisher: "Saket MGM School",
  metadataBase: new URL("https://www.saketmgm.com"),
  openGraph: {
    type: "website",
    title: "News & Notices - Saket MGM School",
    description:
      "Stay updated with the latest news, announcements, and notices from Saket MGM School. Get information about school events, circulars, results, and important updates for students and parents.",
    url: "https://www.saketmgm.com/news",
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
    title: "News & Notices - Saket MGM School",
    description:
      "Stay updated with the latest news, announcements, and notices from Saket MGM School. Get information about school events, circulars, results, and important updates for students and parents.",
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

export default function NewsPage() {
  return (
    <>
      <NewsNoticesHeader />
      <NoticeBoard />
    </>
  );
}
