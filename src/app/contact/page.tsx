import ContactForm from "../component/contact/contactForm";
import ContactHeader from "../component/contact/contactHeader";
import ContactInfo from "../component/contact/contactInfo";
import QuickConnect from "../component/contact/quickContact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Saket MGM School",
  description:
    "Get in touch with Saket MGM School. Find contact details, email, phone numbers, and a convenient form to reach us for inquiries, admissions, and more.",
  keywords: [
    "Saket MGM School Contact",
    "School Contact Details",
    "Contact Form",
    "Saket MGM School Email",
    "Saket MGM School Phone",
    "Admissions Inquiry",
    "School Address",
    "Quick Contact Saket MGM",
    "Education",
    "CBSE School",
  ],
  authors: [{ name: "Saket MGM School", url: "https://www.saketmgm.com" }],
  creator: "Saket MGM School",
  publisher: "Saket MGM School",
  metadataBase: new URL("https://www.saketmgm.com"),
  openGraph: {
    type: "website",
    title: "Contact Us - Saket MGM School",
    description:
      "Get in touch with Saket MGM School. Find contact details, email, phone numbers, and a convenient form to reach us for inquiries, admissions, and more.",
    url: "https://www.saketmgm.com/contact",
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
    title: "Contact Us - Saket MGM School",
    description:
      "Get in touch with Saket MGM School. Find contact details, email, phone numbers, and a convenient form to reach us for inquiries, admissions, and more.",
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
  // RootLayout ke icons automatically use honge
};

export default function ContactPage() {
  return (
    <>
      <ContactHeader />
      <ContactInfo />
      <QuickConnect />
      <ContactForm />
    </>
  );
}
