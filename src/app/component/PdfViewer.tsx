"use client";

import dynamic from "next/dynamic";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Dynamically import Worker and Viewer to avoid SSR
const Worker = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Worker),
  { ssr: false }
);
const Viewer = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Viewer),
  { ssr: false }
);

interface PdfViewerProps {
  fileUrl: string;
  title: string;
}

export default function PdfViewer({ fileUrl, title }: PdfViewerProps) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="flex flex-col items-center py-12 px-4 md:px-0 min-h-screen bg-gray-50">
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-6 text-center">
        {title}
      </h1>

      {/* PDF Container */}
      <div className="w-full max-w-5xl h-[80vh] border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={fileUrl}
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </div>
    </div>
  );
}
