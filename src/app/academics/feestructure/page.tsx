// src/app/academics/feestructure/page.tsx
"use client";
import { useEffect, useState } from "react";
import PdfViewer from "@/app/component/PdfViewer";

export default function FeeStructurePage() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeeStructure = async () => {
      try {
        const res = await fetch("/api/admin/mandatoryDisclosure");
        const data = await res.json();
        if (res.ok && data?.academicDocs) {
          const feeDoc = data.academicDocs.find(
            (doc: { id: number; title: string; file: string }) =>
              doc.title.toUpperCase().includes("FEE STRUCTURE")
          );
          if (feeDoc && feeDoc.file && feeDoc.file !== "#") {
            setFileUrl(feeDoc.file);
          } else {
            setFileUrl("/pdfs/fees.pdf"); // fallback
          }
        } else {
          setFileUrl("/pdfs/fees.pdf"); // fallback
        }
      } catch (err) {
        console.error("Failed to fetch fee structure:", err);
        setFileUrl("/pdfs/fees.pdf"); // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchFeeStructure();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f82f53]"></div>
      </div>
    );
  }

  if (!fileUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Fee Structure</h1>
        <p className="text-gray-500">The fee structure is currently unavailable. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <PdfViewer fileUrl={fileUrl} title="Fees Structure" />
    </div>
  );
}