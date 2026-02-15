// src/app/academics/feestructure/page.tsx
"use client";
import PdfViewer from "@/app/component/PdfViewer";

// page client-only bana do


export default function FeeStructurePage() {
  return (
    <div className="p-4">
      <PdfViewer fileUrl="/pdfs/fees.pdf" title="Fees Structure" />
    </div>
  );
}