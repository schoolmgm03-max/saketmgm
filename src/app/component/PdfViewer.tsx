"use client";

import dynamic from "next/dynamic";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { ExternalLink, AlertTriangle } from "lucide-react";

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

/**
 * Check if a URL is a direct PDF that react-pdf-viewer can handle.
 * Google Drive sharing links are NOT direct PDFs.
 */
function isDirectPdfUrl(url: string): boolean {
  // Google Drive sharing links (view or file/d/ links)
  if (url.includes("drive.google.com")) return false;
  // Other known non-direct PDF platforms
  if (url.includes("docs.google.com")) return false;
  if (url.includes("dropbox.com") && !url.includes("?dl=1")) return false;
  // Direct PDF extensions
  if (url.endsWith(".pdf")) return true;
  // URLs from Cloudinary or similar CDNs with no extension but could be PDF
  // We'll try to render them, but they might fail
  return true;
}

/**
 * Convert a Google Drive sharing link to a direct embed link for iframe.
 */
function getGoogleDriveEmbedUrl(url: string): string | null {
  // Match patterns like:
  // https://drive.google.com/file/d/FILE_ID/view?usp=drive_link
  // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return null;
}

export default function PdfViewer({ fileUrl, title }: PdfViewerProps) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Handle Google Drive links
  if (fileUrl.includes("drive.google.com")) {
    const embedUrl = getGoogleDriveEmbedUrl(fileUrl);
    return (
      <div className="flex flex-col items-center py-12 px-4 md:px-0 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-semibold mb-6 text-center">{title}</h1>
        <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-lg shadow-md p-6">
          {/* Google Drive iframe embed */}
          {embedUrl ? (
            <iframe
              src={embedUrl}
              width="100%"
              height="600px"
              className="border-0 rounded"
              allow="autoplay"
              title={title}
            />
          ) : null}
          {/* Fallback button to open in new tab */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f82f53] text-white rounded-full hover:bg-[#e12244] transition font-medium text-sm"
            >
              <ExternalLink size={16} />
              Open Document in New Tab
            </a>
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">
            This document is hosted on Google Drive. Use the button above if the embedded preview does not load.
          </p>
        </div>
      </div>
    );
  }

  // Handle non-direct PDF URLs (other platforms)
  if (!isDirectPdfUrl(fileUrl)) {
    return (
      <div className="flex flex-col items-center py-12 px-4 md:px-0 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-semibold mb-6 text-center">{title}</h1>
        <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow-md p-8 text-center">
          <AlertTriangle size={48} className="text-amber-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            External Document
          </h2>
          <p className="text-gray-600 mb-6">
            This document is hosted on an external platform and cannot be previewed here directly.
          </p>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#f82f53] text-white rounded-full hover:bg-[#e12244] transition font-medium"
          >
            <ExternalLink size={18} />
            Open Document
          </a>
        </div>
      </div>
    );
  }

  // Direct PDF - use react-pdf-viewer
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
