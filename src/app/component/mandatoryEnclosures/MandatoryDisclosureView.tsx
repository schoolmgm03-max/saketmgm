"use client";

import React, { useState, useEffect } from "react";
import {
  Printer,
  Download,
  ExternalLink,
  FileText,
  School,
  Users,
  Building2,
  Calendar,
  AlertTriangle
} from "lucide-react";

type Result = {
  _id?: string;
  sno: number;
  year: string;
  registered: number;
  passed: number;
  percentage: string;
  remarks?: string;
  examClass: string;
};

export default function MandatoryDisclosureView() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const [disclosure, setDisclosure] = useState({
    schoolInfo: [
      { id: 1, label: "NAME OF THE SCHOOL", value: "SAKET MGM SENIOR SECONDARY SCHOOL" },
      { id: 2, label: "AFFILIATION NO. (IF APPLICABLE)", value: "1030477" },
      { id: 3, label: "SCHOOL CODE (IF APPLICABLE)", value: "50498" },
      { id: 4, label: "COMPLETE ADDRESS WITH PIN CODE", value: "LALDHAU, PURANPURA, VIDISHA, MADHYA PRADESH - 464001" },
      { id: 5, label: "PRINCIPAL NAME & QUALIFICATION", value: "DR. GANESH DIGAMBER PATIL" },
      { id: 6, label: "SCHOOL EMAIL ID", value: "saketmgm@gmail.com" },
      { id: 7, label: "CONTACT DETAILS (LANDLINE/MOBILE)", value: "07592-297036 / 8349929343" },
    ],
    documents: [
      { id: 1, title: "COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION, IF ANY", file: "https://drive.google.com/file/d/1FRquZmJLGK3nkm-KJPgwALEqqOUB2lnA/view?usp=drive_link" },
      { id: 2, title: "COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE, AS APPLICABLE", file: "https://drive.google.com/file/d/1knRVTzrIiYrtO9FvSGyLkFPnf8vl2tQc/view?usp=drive_link" },
      { id: 3, title: "COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED, IF APPLICABLE, BY THE STATE GOVT./UT", file: "https://drive.google.com/file/d/1DPW_Bpsf502NtozUpdedvcUltNtaOcdy/view?usp=sharing" },
      { id: 4, title: "COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT, 2009, AND IT'S RENEWAL IF APPLICABLE", file: "https://drive.google.com/file/d/1c9sSSds7Z2_eBpCJLtJJDMQ6nMKkHmWn/view?usp=sharing" },
      { id: 5, title: "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE", file: "https://drive.google.com/file/d/1JXQnTjqjxd58-U1aKxzwyBwdIyCfcehN/view?usp=sharing" },
      { id: 6, title: "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY", file: "https://drive.google.com/file/d/1ifnjbXZPCVAdg43dLYbKEjU5ZGGLIq73/view?usp=drive_link" },
      { id: 7, title: "COPY OF THE DEO CERTIFICATE SUBMITTED BY THE SCHOOL FOR AFFILIATION/UPGRADATION/EXTENSION OF AFFILIATION OR SELF CERTIFICATION BY SCHOOL", file: "https://drive.google.com/file/d/1Uab9-vAEcD9iImKQmcQTLzl26EPb09FU/view?usp=drive_link" },
      { id: 8, title: "COPIES OF VALID DRINKING WATER, HEALTH AND SANITATION CERTIFICATES AND WATER TESTING REPORT", file: "https://drive.google.com/file/d/1badXuJYJTIjBeCK_Dm_6fyCyjmrTGJLj/view?usp=drive_link" },
      { id: 9, title: "LAND CERTIFICATE (ADDITIONAL COMPLIANCE)", file: "https://drive.google.com/file/d/19UQbnDIMgVGmGbLrB4NIlI51Jzoaha3Z/view?usp=sharing" }
    ],
    academicDocs: [
      { id: 1, title: "FEE STRUCTURE OF THE SCHOOL", file: "/pdfs/fees.pdf" },
      { id: 2, title: "ANNUAL ACADEMIC CALENDAR", file: "/pdfs/anual.pdf" },
      { id: 3, title: "LIST OF SCHOOL MANAGEMENT COMMITTEE (SMC)", file: "/pdfs/SCHOOL-MANAGEMENT-COMMITTEE-(SMC)-1736592835.pdf" },
      { id: 4, title: "LIST OF PARENTS TEACHERS ASSOCIATION (PTA) MEMBERS", file: "/pdfs/LIST-OF-PARENTS--TEACHERS-ASSOCIATION-(PTA)-MEMBERS--1721800189.pdf" },
      { id: 5, title: "LAST THREE-YEAR RESULT OF THE BOARD EXAMINATION (AS PER APPLICABILITY)", file: "/pdfs/consolidated-Result-of-AISSE-AISSCE-Examination--1686540272.pdf" },
      { id: 6, title: "BOOK LIST", file: "#" }
    ],
    staffDetails: [
      { id: 1, label: "PRINCIPAL", value: "DR. GANESH DIGAMBER PATIL" },
      { id: 2, label: "VICE PRINCIPAL", value: "0" },
      { id: 3, label: "HEADMISTRESS/HEADMASTER", value: "0" },
      { id: 4, label: "TOTAL NO. OF TEACHERS", value: "114", isList: true },
      { id: 5, label: "TEACHERS SECTION RATIO", value: "1.5" },
      { id: 6, label: "DETAILS OF SPECIAL EDUCATOR", value: "MRS. MANJUSHREE SHARMA" },
      { id: 7, label: "DETAILS OF COUNSELLOR & WELLNESS TEACHER", value: "MRS. RATNA SHARMA" }
    ],
    infrastructureDetails: [
      { id: 1, label: "TOTAL CAMPUS AREA OF THE SCHOOL (IN SQR MTR)", value: "16720 SQ. METERS" },
      { id: 2, label: "NO. AND SIZE OF THE CLASSROOMS (IN SQR MTR)", value: "95 Classrooms (Size: 48 Sq. Meters each)" },
      { id: 3, label: "NO. AND SIZE OF LABORATORIES INCLUDING COMPUTER LABS (IN SQR MTR)", value: "6 Laboratories", isLabs: true },
      { id: 4, label: "NO. AND SIZE OF LIBRARY (IN SQR MTR)", value: "1 Library (Size: 120 Sq. Meters)" },
      { id: 5, label: "INTERNET FACILITY (YES/NO)", value: "YES" },
      { id: 6, label: "NO. OF GIRLS TOILETS", value: "28" },
      { id: 7, label: "NO. OF BOYS TOILETS", value: "28" },
      { id: 8, label: "NO. OF CWSN TOILETS (TOILETS FOR DIFFERENTLY ABLED)", value: "4 (2 for Girls, 2 for Boys)" },
      { id: 9, label: "LINK OF YOUTUBE VIDEO OF THE INSPECTION OF SCHOOL COVERING THE INFRASTRUCTURE OF THE SCHOOL", value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", isYoutube: true }
    ],
    staffPgtCount: "17",
    staffTgtCount: "24",
    staffPrtCount: "39",
    staffNttCount: "34",
    staffListFile: "#",
    labs: [
      { name: "Physics Lab", size: "56 Sq. Meters" },
      { name: "Biology Lab", size: "63.05 Sq. Meters" },
      { name: "Chemistry Lab", size: "72.76 Sq. Meters" },
      { name: "Composite Science Lab", size: "56 Sq. Meters" },
      { name: "Computer Lab", size: "56 Sq. Meters" },
      { name: "Maths Lab", size: "46 Sq. Meters" },
    ]
  });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch("/api/admin/results");
        const data = await res.json();
        if (res.ok) setResults(data);
      } catch (err) {
        console.error("Failed to fetch results:", err);
      }
    };

    const fetchDisclosure = async () => {
      try {
        const res = await fetch("/api/admin/mandatoryDisclosure");
        const data = await res.json();
        if (res.ok) {
          setDisclosure(prev => ({
            ...prev,
            schoolInfo: data.schoolInfo || prev.schoolInfo,
            documents: data.documents || prev.documents,
            academicDocs: data.academicDocs || prev.academicDocs,
            staffDetails: data.staffDetails || prev.staffDetails,
            infrastructureDetails: data.infrastructureDetails || prev.infrastructureDetails,
            staffPgtCount: data.staffPgtCount || prev.staffPgtCount,
            staffTgtCount: data.staffTgtCount || prev.staffTgtCount,
            staffPrtCount: data.staffPrtCount || prev.staffPrtCount,
            staffNttCount: data.staffNttCount || prev.staffNttCount,
            staffListFile: data.staffListFile || prev.staffListFile,
            labs: (data.labs && data.labs.length > 0) ? data.labs : prev.labs,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch disclosure details:", err);
      }
    };

    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchResults(), fetchDisclosure()]);
      setLoading(false);
    };

    loadAll();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // labs and staff counts now come from disclosure state (fetched from DB)

  const classXResults = results.filter(r => r.examClass === "X");
  const classXIIResults = results.filter(r => r.examClass === "XII");

  const sections = [
    { id: "general", label: "A: General Info", icon: <School size={16} /> },
    { id: "documents", label: "B: Documents", icon: <FileText size={16} /> },
    { id: "results", label: "C: Results & Academics", icon: <Calendar size={16} /> },
    { id: "staff", label: "D: Staff Info", icon: <Users size={16} /> },
    { id: "infrastructure", label: "E: Infrastructure", icon: <Building2 size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-4 sm:py-8 px-2 sm:px-4 md:px-8 print:bg-white print:p-0 print:min-h-0">

      {/* Dynamic Style Sheet for Printing */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            font-size: 11px !important;
          }
          nav, footer, header, .no-print {
            display: none !important;
          }
          .print-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
          }
          table {
            border-collapse: collapse !important;
            width: 100% !important;
            margin-bottom: 12px !important;
            page-break-inside: auto;
          }
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          td, th {
            border: 1px solid #000000 !important;
            padding: 4px 6px !important;
            font-size: 10px !important;
          }
          th {
            background-color: #f1f5f9 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color: black !important;
          }
          h2, h3, h4 {
            color: black !important;
            page-break-after: avoid;
            margin-top: 15px !important;
            margin-bottom: 8px !important;
          }
          .page-break {
            page-break-before: always;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto print-container bg-white shadow-xl rounded-xl sm:rounded-2xl border border-slate-200 overflow-hidden print:border-none print:shadow-none print:rounded-none">

        {/* Top Actions Panel */}
        <div className="no-print bg-slate-900 text-white px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center border-b border-slate-800 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-[#f82f53] p-1.5 sm:p-2 rounded-lg text-white flex-shrink-0">
              <Building2 size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-wide">MANDATORY PUBLIC DISCLOSURE</h1>
              <p className="text-[10px] sm:text-xs text-slate-400">Appendix - IX (CBSE Compliance Document)</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-[#f82f53] hover:bg-[#d82444] text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 whitespace-nowrap"
            >
              <Printer size={14} className="sm:w-4 sm:h-4" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs (Web View Only) */}
        <div className="no-print bg-white border-b border-slate-200 px-3 sm:px-6 py-2 sm:py-3 flex flex-nowrap gap-1.5 sm:gap-2 sticky top-0 z-40 shadow-sm overflow-x-auto scrollbar-hide whitespace-nowrap">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold tracking-wide transition-all flex-shrink-0 ${activeTab === "all"
              ? "bg-[#f82f53] text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
          >
            All Sections
          </button>
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveTab(sec.id);
                const el = document.getElementById(sec.id);
                if (el && activeTab === "all") {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold tracking-wide transition-all flex-shrink-0 ${activeTab === sec.id
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              {sec.icon}
              <span className="hidden sm:inline">{sec.label}</span>
              <span className="sm:hidden">{sec.label.split(":")[0]}</span>
            </button>
          ))}
        </div>

        {/* Main CBSE Public Disclosure Form */}
        <div className="p-4 sm:p-6 md:p-10 space-y-8 sm:space-y-12 print:p-0 print:space-y-6">

          {/* Header Banner */}
          <div className="text-center border-b-2 border-double border-slate-300 pb-6 sm:pb-8 print:pb-4">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight print:text-lg">
              {disclosure.schoolInfo.find(info => info.id === 1)?.value || "SAKET MGM SENIOR SECONDARY SCHOOL"}
            </h2>
            <p className="text-[#f82f53] font-bold text-xs sm:text-sm tracking-widest mt-1 print:text-black print:text-xs">
              CBSE MANDATORY PUBLIC DISCLOSURE
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-1 print:text-black">
              APPENDIX - IX (REVISED FORMAT)
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-6 mt-3 text-[10px] sm:text-xs text-slate-600 font-semibold print:text-black print:mt-1">
              <span>Affiliation No.: {disclosure.schoolInfo.find(info => info.id === 2)?.value || "1030477"}</span>
              <span className="hidden sm:inline">•</span>
              <span>School Code: {disclosure.schoolInfo.find(info => info.id === 3)?.value || "50498"}</span>
            </div>
            {activeTab !== "all" && (
              <div className="hidden print:block mt-3">
                <span className="text-[10px] font-extrabold text-[#f82f53] uppercase tracking-widest border border-[#f82f53]/30 bg-red-50/30 px-3 py-1 rounded">
                  Printed Section: {sections.find((s) => s.id === activeTab)?.label}
                </span>
              </div>
            )}
          </div>

          {/* A: GENERAL INFORMATION */}
          {(activeTab === "all" || activeTab === "general") && (
            <section id="general" className="scroll-mt-20">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 border-l-4 border-[#f82f53] pl-2 sm:pl-3 mb-4 sm:mb-6 print:border-none print:pl-0 print:text-xs print:font-extrabold print:mb-2 flex items-center gap-2">
                <span className="bg-[#f82f53] text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs flex-shrink-0 print:hidden">A</span>
                A: GENERAL INFORMATION
              </h3>

              <div className="overflow-x-auto border border-slate-200 rounded-xl print:rounded-none print:border-black">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 print:bg-slate-100 print:border-black">
                      <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-slate-700 text-xs sm:text-sm w-16 sm:w-20 print:px-2 print:py-1">SL NO.</th>
                      <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-slate-700 text-xs sm:text-sm print:px-2 print:py-1">INFORMATION</th>
                      <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-slate-700 text-xs sm:text-sm print:px-2 print:py-1">DETAILS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 print:divide-black">
                    {disclosure.schoolInfo.map((info) => (
                      <tr key={info.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-slate-600 font-semibold text-xs sm:text-sm print:px-2 print:py-1">{info.id}</td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-slate-800 font-bold text-[10px] sm:text-xs uppercase tracking-wider print:px-2 print:py-1">{info.label}</td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-slate-900 font-semibold text-xs sm:text-sm print:px-2 print:py-1">{info.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* B: DOCUMENTS AND INFORMATION */}
          {(activeTab === "all" || activeTab === "documents") && (
            <section id="documents" className={`scroll-mt-20 ${activeTab === "all" ? "page-break" : ""}`}>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 border-l-4 border-[#f82f53] pl-2 sm:pl-3 mb-3 sm:mb-4 print:border-none print:pl-0 print:text-xs print:font-extrabold print:mb-2 flex items-center gap-2">
                <span className="bg-[#f82f53] text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs flex-shrink-0 print:hidden">B</span>
                B: DOCUMENTS AND INFORMATION
              </h3>

              <div className="overflow-x-auto border border-slate-200 rounded-xl print:rounded-none print:border-black mb-4">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 print:bg-slate-100 print:border-black">
                      <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-slate-700 text-xs sm:text-sm w-16 sm:w-20 print:px-2 print:py-1">SL NO.</th>
                      <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-slate-700 text-xs sm:text-sm print:px-2 print:py-1">DOCUMENTS / INFORMATION</th>
                      <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-slate-700 text-xs sm:text-sm w-36 sm:w-44 text-center print:px-2 print:py-1">UPLOAD DOCUMENTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 print:divide-black">
                    {disclosure.documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-slate-600 font-semibold text-xs sm:text-sm print:px-2 print:py-1">{doc.id}</td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-slate-800 font-semibold text-[10px] sm:text-xs leading-relaxed print:px-2 print:py-1">{doc.title}</td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-center print:px-2 print:py-1">
                          <a
                            href={doc.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 sm:gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition no-print active:scale-95 whitespace-nowrap"
                          >
                            <Download size={10} className="sm:w-3 sm:h-3" />
                            View Document
                          </a>
                          <a
                            href={doc.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden print:inline text-[10px] text-blue-600 underline font-semibold hover:text-blue-800 break-all"
                          >
                            Click to view document
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CBSE WARNING NOTE */}
              <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-3 sm:p-4 text-amber-800 print:bg-white print:border-black print:text-black print:p-2 print:border">
                <div className="flex gap-2 sm:gap-3">
                  <div className="text-amber-500 print:hidden flex-shrink-0 mt-0.5">
                    <AlertTriangle size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <div className="text-[10px] sm:text-xs leading-relaxed font-semibold">
                    <span className="font-extrabold uppercase">NOTE:</span> THE SCHOOLS NEED TO UPLOAD THE SELF ATTESTED COPIES OF ABOVE LISTED DOCUMENTS BY CHAIRMAN/MANAGER/SECRETARY AND PRINCIPAL. IN CASE, IT IS NOTICED AT A LATER STAGE THAT UPLOADED DOCUMENTS ARE NOT GENUINE THEN THE SCHOOL SHALL BE LIABLE FOR ACTION AS PER NORMS.
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* C: RESULT AND ACADEMICS */}
          {(activeTab === "all" || activeTab === "results") && (
            <section id="results" className={`scroll-mt-20 ${activeTab === "all" ? "page-break" : ""}`}>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 border-l-4 border-[#f82f53] pl-2 sm:pl-3 mb-6 print:border-none print:pl-0 print:text-xs print:font-extrabold print:mb-2 flex items-center gap-2">
                <span className="bg-[#f82f53] text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs print:hidden">C</span>
                C: RESULT AND ACADEMICS
              </h3>

              <div className="overflow-x-auto border border-slate-200 rounded-xl print:rounded-none print:border-black mb-8">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 print:bg-slate-100 print:border-black">
                      <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-slate-700 text-xs sm:text-sm w-20 print:px-2 print:py-1">SL NO.</th>
                      <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-slate-700 text-xs sm:text-sm print:px-2 print:py-1">DOCUMENTS / INFORMATION</th>
                      <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-slate-700 text-xs sm:text-sm w-44 text-center print:px-2 print:py-1">UPLOAD DOCUMENTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 print:divide-black">
                    {disclosure.academicDocs.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-slate-600 font-semibold text-xs sm:text-sm print:px-2 print:py-1">{doc.id}</td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-slate-800 font-semibold text-[10px] sm:text-xs uppercase tracking-wider print:px-2 print:py-1">{doc.title}</td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-center print:px-2 print:py-1">
                          <a
                            href={doc.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 px-2 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition no-print active:scale-95 whitespace-nowrap"
                          >
                            <Download size={12} />
                            View Document
                          </a>
                          <a
                            href={doc.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden print:inline text-[10px] text-blue-600 underline font-semibold hover:text-blue-800"
                          >
                            Click to view document
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Dynamic board examination results */}
              <div className="space-y-6">
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-700 tracking-wide border-b pb-2 print:text-[10px] print:border-black">
                  LAST THREE-YEAR RESULT OF THE BOARD EXAMINATION (AS PER APPLICABILITY)
                </h4>

                {loading ? (
                  <div className="text-center py-6 text-slate-500 font-semibold text-sm print:hidden">
                    Loading exam results...
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 print:grid-cols-1 print:gap-4">

                    {/* Class X Results */}
                    <div className="border border-slate-200 rounded-xl overflow-x-auto print:rounded-none print:border-black">
                      <div className="bg-slate-100 px-4 py-2.5 font-bold text-xs text-slate-800 border-b border-slate-200 print:bg-slate-200 print:border-black">
                        RESULT CLASS: X
                      </div>
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 print:bg-slate-100 print:border-black">
                            <th className="px-3 py-2 text-[10px] font-bold text-slate-700 text-center">YEAR</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-slate-700 text-center">REGISTERED</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-slate-700 text-center">PASSED</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-slate-700 text-center">PERCENTAGE</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-slate-700">REMARKS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 print:divide-black">
                          {classXResults.length > 0 ? (
                            classXResults.map((r) => (
                              <tr key={r.sno} className="hover:bg-slate-50/50">
                                <td className="px-3 py-2 text-center text-xs font-semibold text-slate-800">{r.year}</td>
                                <td className="px-3 py-2 text-center text-xs font-semibold text-slate-800">{r.registered}</td>
                                <td className="px-3 py-2 text-center text-xs font-semibold text-slate-800">{r.passed}</td>
                                <td className="px-3 py-2 text-center text-xs font-bold text-[#f82f53] print:text-black">
                                  {r.percentage.toString().endsWith("%") ? r.percentage : `${r.percentage}%`}
                                </td>
                                <td className="px-3 py-2 text-xs text-slate-600 font-medium">{r.remarks || "PASS"}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="px-3 py-4 text-center text-slate-400 text-xs italic">
                                No Class X records found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Class XII Results */}
                    <div className="border border-slate-200 rounded-xl overflow-x-auto print:rounded-none print:border-black">
                      <div className="bg-slate-100 px-4 py-2.5 font-bold text-xs text-slate-800 border-b border-slate-200 print:bg-slate-200 print:border-black">
                        RESULT CLASS: XII
                      </div>
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 print:bg-slate-100 print:border-black">
                            <th className="px-3 py-2 text-[10px] font-bold text-slate-700 text-center">YEAR</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-slate-700 text-center">REGISTERED</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-slate-700 text-center">PASSED</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-slate-700 text-center">PERCENTAGE</th>
                            <th className="px-3 py-2 text-[10px] font-bold text-slate-700">REMARKS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 print:divide-black">
                          {classXIIResults.length > 0 ? (
                            classXIIResults.map((r) => (
                              <tr key={r.sno} className="hover:bg-slate-50/50">
                                <td className="px-3 py-2 text-center text-xs font-semibold text-slate-800">{r.year}</td>
                                <td className="px-3 py-2 text-center text-xs font-semibold text-slate-800">{r.registered}</td>
                                <td className="px-3 py-2 text-center text-xs font-semibold text-slate-800">{r.passed}</td>
                                <td className="px-3 py-2 text-center text-xs font-bold text-[#f82f53] print:text-black">
                                  {r.percentage.toString().endsWith("%") ? r.percentage : `${r.percentage}%`}
                                </td>
                                <td className="px-3 py-2 text-xs text-slate-600 font-medium">{r.remarks || "PASS"}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="px-3 py-4 text-center text-slate-400 text-xs italic">
                                No Class XII records found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                  </div>
                )}
              </div>
            </section>
          )}

          {/* D: STAFF (TEACHING) */}
          {(activeTab === "all" || activeTab === "staff") && (
            <section id="staff" className={`scroll-mt-20 ${activeTab === "all" ? "page-break" : ""}`}>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 border-l-4 border-[#f82f53] pl-2 sm:pl-3 mb-6 print:border-none print:pl-0 print:text-xs print:font-extrabold print:mb-2 flex items-center gap-2">
                <span className="bg-[#f82f53] text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs print:hidden">D</span>
                D: STAFF (TEACHING)
              </h3>

              <div className="overflow-x-auto border border-slate-200 rounded-xl print:rounded-none print:border-black">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 print:bg-slate-100 print:border-black">
                      <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-slate-700 text-xs sm:text-sm w-20 print:px-2 print:py-1">SL NO.</th>
                      <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-slate-700 text-xs sm:text-sm print:px-2 print:py-1">INFORMATION</th>
                      <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-slate-700 text-xs sm:text-sm print:px-2 print:py-1">DETAILS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 print:divide-black">
                    {disclosure.staffDetails.map((staff) => (
                      <tr key={staff.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-slate-600 font-semibold text-xs sm:text-sm print:px-2 print:py-1">{staff.id}</td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-slate-800 font-bold text-[10px] sm:text-xs uppercase tracking-wider print:px-2 print:py-1">{staff.label}</td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-slate-900 font-semibold text-xs sm:text-sm print:px-2 print:py-1">
                          {staff.isList ? (
                            <div className="space-y-3">
                              <span className="font-extrabold text-slate-900 block">{staff.value}</span>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 no-print">
                                <div className="bg-slate-100 hover:bg-slate-200 px-2 sm:px-3 py-2 rounded-lg flex flex-col items-center border border-slate-200 transition">
                                  <span className="text-[10px] text-slate-500 font-bold">PGT</span>
                                  <span className="text-xs sm:text-sm font-bold text-slate-800">{disclosure.staffPgtCount}</span>
                                </div>
                                <div className="bg-slate-100 hover:bg-slate-200 px-2 sm:px-3 py-2 rounded-lg flex flex-col items-center border border-slate-200 transition">
                                  <span className="text-[10px] text-slate-500 font-bold">TGT</span>
                                  <span className="text-xs sm:text-sm font-bold text-slate-800">{disclosure.staffTgtCount}</span>
                                </div>
                                <div className="bg-slate-100 hover:bg-slate-200 px-2 sm:px-3 py-2 rounded-lg flex flex-col items-center border border-slate-200 transition">
                                  <span className="text-[10px] text-slate-500 font-bold">PRT</span>
                                  <span className="text-xs sm:text-sm font-bold text-slate-800">{disclosure.staffPrtCount}</span>
                                </div>
                                <div className="bg-slate-100 hover:bg-slate-200 px-2 sm:px-3 py-2 rounded-lg flex flex-col items-center border border-slate-200 transition">
                                  <span className="text-[10px] text-slate-500 font-bold">NTT / OTHERS</span>
                                  <span className="text-xs sm:text-sm font-bold text-slate-800">{disclosure.staffNttCount}</span>
                                </div>
                              </div>
                              <div className="hidden print:block text-[10px] font-bold text-slate-800">
                                Category-wise: PGT: {disclosure.staffPgtCount}, TGT: {disclosure.staffTgtCount}, PRT: {disclosure.staffPrtCount}, NTT/Others: {disclosure.staffNttCount}
                              </div>
                              <div className="no-print pt-2">
                                <a
                                  href={disclosure.staffListFile || "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 bg-[#f82f53] hover:bg-[#d82444] text-white text-[11px] font-bold px-3 py-1 rounded-lg transition active:scale-95 shadow-sm whitespace-nowrap"
                                >
                                  <Download size={10} />
                                  Download Complete Staff List (PDF)
                                </a>
                              </div>
                            </div>
                          ) : (
                            staff.value
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* E: SCHOOL INFRASTRUCTURE */}
          {(activeTab === "all" || activeTab === "infrastructure") && (
            <section id="infrastructure" className={`scroll-mt-20 ${activeTab === "all" ? "page-break" : ""}`}>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 border-l-4 border-[#f82f53] pl-2 sm:pl-3 mb-6 print:border-none print:pl-0 print:text-xs print:font-extrabold print:mb-2 flex items-center gap-2">
                <span className="bg-[#f82f53] text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs print:hidden">E</span>
                E: SCHOOL INFRASTRUCTURE
              </h3>

              <div className="overflow-x-auto border border-slate-200 rounded-xl print:rounded-none print:border-black">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 print:bg-slate-100 print:border-black">
                      <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-slate-700 text-xs sm:text-sm w-20 print:px-2 print:py-1">SL NO.</th>
                      <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-slate-700 text-xs sm:text-sm print:px-2 print:py-1">INFORMATION</th>
                      <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-bold text-slate-700 text-xs sm:text-sm print:px-2 print:py-1">DETAILS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 print:divide-black">
                    {disclosure.infrastructureDetails.map((infra) => (
                      <tr key={infra.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-slate-600 font-semibold text-xs sm:text-sm print:px-2 print:py-1">{infra.id}</td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-slate-800 font-bold text-[10px] sm:text-xs uppercase tracking-wider print:px-2 print:py-1">{infra.label}</td>
                        <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-slate-900 font-semibold text-xs sm:text-sm print:px-2 print:py-1">
                          {infra.isLabs ? (
                            <div className="space-y-3">
                              <span className="font-extrabold text-slate-900 block">{infra.value}</span>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 border border-slate-200 rounded-xl p-2 sm:p-3 bg-slate-50/60 no-print">
                                {disclosure.labs.map((lab, i) => (
                                  <div key={i} className="flex flex-col bg-white border border-slate-100 p-2 sm:p-2.5 rounded-lg shadow-sm">
                                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lab.name}</span>
                                    <span className="text-[10px] sm:text-xs font-bold text-slate-800 mt-0.5">{lab.size}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="hidden print:block text-[10px] text-slate-800 font-semibold">
                                {disclosure.labs.map((lab, i) => (
                                  <span key={i}>{lab.name}: {lab.size}{i < disclosure.labs.length - 1 ? ", " : "."}</span>
                                ))}
                              </div>
                            </div>
                          ) : infra.isYoutube ? (
                            <div>
                              <a
                                href={infra.value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-2 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition no-print active:scale-95 whitespace-nowrap"
                              >
                                <ExternalLink size={12} />
                                Watch School Tour / Inspection Video
                              </a>
                              <a
                                href={infra.value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden print:inline text-[10px] text-blue-600 underline font-semibold hover:text-blue-800"
                              >
                                Click to watch YouTube Inspection Video
                              </a>
                            </div>
                          ) : (
                            infra.value
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

        </div>

        {/* Official Signature Footer for PDF */}
        <div className="hidden print:flex justify-between items-center px-12 py-10 mt-16 text-xs font-bold text-slate-800 border-t border-slate-300">
          <div className="text-center flex flex-col">
            <div className="w-40 border-b border-black mb-1"></div>
            <span>Signature of Principal</span>
            <span className="text-[9px] font-normal text-slate-500">
              ({disclosure.schoolInfo.find(info => info.id === 5)?.value.split(",")[0] || "Dr. Ganesh Digamber Patil"})
            </span>
          </div>
          <div className="text-center flex flex-col">
            <div className="w-40 border-b border-black mb-1"></div>
            <span>Signature of Chairman/Manager</span>
            <span className="text-[9px] font-normal text-slate-500">(Saket MGM School Admin)</span>
          </div>
        </div>

      </div>
    </div>
  );
}
