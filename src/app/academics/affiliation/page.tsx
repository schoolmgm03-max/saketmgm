// src/app/academics/affiliation/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import PdfViewer from "@/app/component/PdfViewer";

const AffiliationCard = () => {
  const [affiliationFile, setAffiliationFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAffiliationDoc = async () => {
      try {
        const res = await fetch("/api/admin/mandatoryDisclosure");
        const data = await res.json();
        if (res.ok && data?.documents) {
          const affDoc = data.documents.find(
            (doc: { id: number; title: string; file: string }) =>
              doc.title.toUpperCase().includes("AFFILIATION/UPGRADATION") ||
              doc.title.toUpperCase().includes("AFFILIATION")
          );
          if (affDoc && affDoc.file && !affDoc.file.startsWith("#")) {
            setAffiliationFile(affDoc.file);
          }
        }
      } catch (err) {
        console.error("Failed to fetch affiliation document:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAffiliationDoc();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* CBSE Affiliation Card */}
      <div className="bg-green-50 border rounded-lg shadow p-6 text-center">
        <p className="text-red-600 font-semibold uppercase text-sm mb-4">
          AN ISO 9001:2020 CERTIFIED SCHOOL
        </p>

        <p className="text-green-800 italic font-medium mb-6">
          The school is affiliated to <br />
          <span className="text-orange-600 font-semibold">
            Central Board of Secondary Education,
          </span>
          <br />
          New Delhi Class Nursery to 12th
        </p>

        <div className="flex justify-center items-center border border-orange-400 rounded mb-6 max-w-md mx-auto">
          <div className="px-4 py-2 border-r border-orange-400 font-medium text-gray-700">
            Affiliation No.
          </div>
          <div className="px-6 py-2 text-gray-800 font-semibold">1030477</div>
        </div>

        <div className="flex justify-center mb-6">
          <Image
            src="https://res.cloudinary.com/drlidswcd/image/upload/v1756448764/cbse-logo_wnbmjw.png"
            alt="CBSE Logo"
            width={200}
            height={200}
            style={{ width: "150px", height: "auto" }}
            className="mx-auto"
          />
        </div>

        <hr className="my-6 border-green-300" />

        <div className="text-green-900 font-semibold text-lg">
          केंद्रीय माध्यमिक शिक्षा बोर्ड
        </div>
        <div className="text-green-900 font-semibold text-lg mb-2">
          Central Board of Secondary Education
        </div>

        <p className="text-xs text-gray-600">
          COMMITTED TO EQUITY AND EXCELLENCE IN EDUCATION <br />
          Visit Central Board of Secondary Education Web Site
        </p>
      </div>

      {/* Affiliation Document PDF Viewer */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#f82f53]"></div>
        </div>
      ) : affiliationFile ? (
        <div className="bg-white border rounded-lg shadow p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Affiliation / Upgradation Letter
          </h2>
          <p className="text-sm text-gray-500 mb-4 text-center">
            This document is sourced from the CBSE Mandatory Disclosure section.
          </p>
          <PdfViewer fileUrl={affiliationFile} title="Affiliation Letter" />
        </div>
      ) : (
        <div className="bg-white border rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">
            Affiliation document is currently unavailable. Please visit the{" "}
            <a href="/mandatoryEnclosures" className="text-[#f82f53] hover:underline font-medium">
              Mandatory Enclosures
            </a>{" "}
            page for more information.
          </p>
        </div>
      )}
    </div>
  );
};

export default AffiliationCard;
