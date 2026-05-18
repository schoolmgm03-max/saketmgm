"use client";

import React, { useState, useEffect } from "react";
import { 
  Save, 
  RefreshCw, 
  FileText, 
  School, 
  Users, 
  Building2, 
  Calendar,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2
} from "lucide-react";

type Item = {
  id: number;
  label?: string;
  title?: string;
  value?: string;
  file?: string;
  isList?: boolean;
  isLabs?: boolean;
  isYoutube?: boolean;
};

type LabItem = {
  name: string;
  size: string;
};

type DisclosureData = {
  schoolInfo: Item[];
  documents: Item[];
  academicDocs: Item[];
  staffDetails: Item[];
  infrastructureDetails: Item[];
  staffPgtCount: string;
  staffTgtCount: string;
  staffPrtCount: string;
  staffNttCount: string;
  staffListFile: string;
  labs: LabItem[];
};

export default function AdminMandatoryEnclosures() {
  const [data, setData] = useState<DisclosureData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "documents" | "academics" | "staff" | "infrastructure">("general");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DEFAULT_LABS: LabItem[] = [
    { name: "Physics Lab", size: "56 Sq. Meters" },
    { name: "Biology Lab", size: "63.05 Sq. Meters" },
    { name: "Chemistry Lab", size: "72.76 Sq. Meters" },
    { name: "Composite Science Lab", size: "56 Sq. Meters" },
    { name: "Computer Lab", size: "56 Sq. Meters" },
    { name: "Maths Lab", size: "46 Sq. Meters" },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/mandatoryDisclosure");
      const result = await res.json();
      if (res.ok) {
        // Apply client-side fallbacks for fields that may be missing in older DB documents
        const normalized: DisclosureData = {
          ...result,
          staffPgtCount: result.staffPgtCount || "17",
          staffTgtCount: result.staffTgtCount || "24",
          staffPrtCount: result.staffPrtCount || "39",
          staffNttCount: result.staffNttCount || "34",
          staffListFile: result.staffListFile || "#",
          labs: (result.labs && result.labs.length > 0) ? result.labs : DEFAULT_LABS,
        };
        setData(normalized);
      } else {
        showToast("Failed to fetch disclosure data", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("An error occurred while fetching data", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleInputChange = (
    section: keyof DisclosureData,
    id: number,
    field: "value" | "file" | "title" | "label",
    newValue: string
  ) => {
    if (!data) return;
    const sectionItems = data[section];
    if (!Array.isArray(sectionItems)) return;

    const updatedSection = (sectionItems as Item[]).map((item) => {
      if (item.id === id) {
        return { ...item, [field]: newValue };
      }
      return item;
    });
    setData({ ...data, [section]: updatedSection });
  };

  const handleAddDocument = (section: "documents" | "academicDocs") => {
    if (!data) return;
    const currentItems = data[section];
    const nextId = Math.max(...currentItems.map((item) => item.id), 0) + 1;
    const newItem: Item = {
      id: nextId,
      title: `New Document ${nextId}`,
      file: "",
    };
    setData({
      ...data,
      [section]: [...currentItems, newItem],
    });
  };

  const handleDeleteDocument = (section: "documents" | "academicDocs", id: number) => {
    if (!data) return;
    const updatedItems = data[section].filter((item) => item.id !== id);
    const reindexedItems = updatedItems.map((item, idx) => ({
      ...item,
      id: idx + 1,
    }));
    setData({
      ...data,
      [section]: reindexedItems,
    });
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/mandatoryDisclosure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        showToast("CBSE Mandatory Enclosures updated successfully!", "success");
      } else {
        showToast("Failed to save changes", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("An error occurred while saving changes", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <RefreshCw className="animate-spin text-[#f82f53]" size={36} />
        <p className="text-slate-600 font-semibold text-sm">Loading disclosure details...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <AlertCircle className="text-red-500" size={36} />
        <p className="text-slate-600 font-semibold text-sm">Could not load dashboard data.</p>
        <button onClick={fetchData} className="bg-[#f82f53] text-white px-4 py-2 rounded-xl font-bold">
          Retry
        </button>
      </div>
    );
  }

  const tabs = [
    { id: "general", label: "A: General Info", icon: <School size={18} /> },
    { id: "documents", label: "B: Documents", icon: <FileText size={18} /> },
    { id: "academics", label: "C: Academics", icon: <Calendar size={18} /> },
    { id: "staff", label: "D: Staff Info", icon: <Users size={18} /> },
    { id: "infrastructure", label: "E: Infrastructure", icon: <Building2 size={18} /> },
  ] as const;

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 md:px-8">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl transition-all border ${
          toast.type === "success" 
            ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {toast.type === "success" ? <CheckCircle size={20} className="text-emerald-500" /> : <AlertCircle size={20} className="text-red-500" />}
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        
        {/* Header Action Panel */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl mb-8">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-wide flex items-center gap-2">
              <span className="bg-[#f82f53] p-1.5 rounded-lg text-white">
                <School size={22} />
              </span>
              Mandatory Public Disclosure (CBSE Compliance)
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Update Google Drive certificate URLs, contact details, academics, staff counts, and infrastructure parameters instantly.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={fetchData}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-5 py-3 rounded-xl text-sm font-bold transition active:scale-95"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#f82f53] hover:bg-[#d82444] disabled:bg-slate-700 text-white px-6 py-3 rounded-xl text-sm font-extrabold transition active:scale-95 shadow-lg shadow-[#f82f53]/20"
            >
              {saving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
              Save All Changes
            </button>
          </div>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="bg-white border border-slate-200 rounded-2xl p-2 flex flex-wrap gap-2 shadow-sm mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[150px] flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-xs font-extrabold tracking-wide transition-all ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab-wise Content Render */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
          
          {/* SECTION A: GENERAL INFORMATION */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800 border-l-4 border-[#f82f53] pl-3 mb-6">
                A: GENERAL INFORMATION
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {data.schoolInfo.map((info) => (
                  <div key={info.id} className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                      {info.label}
                    </label>
                    <input
                      type="text"
                      value={info.value || ""}
                      onChange={(e) => handleInputChange("schoolInfo", info.id, "value", e.target.value)}
                      className="border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 transition focus:outline-none focus:ring-2 focus:ring-[#f82f53]/20 focus:border-[#f82f53]"
                      placeholder={`Enter ${info.label}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION B: DOCUMENTS AND INFORMATION */}
          {activeTab === "documents" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800 border-l-4 border-[#f82f53] pl-3 mb-6">
                B: DOCUMENTS AND INFORMATION (UPLOAD LINKS)
              </h2>
              <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 p-3 rounded-xl font-semibold leading-relaxed">
                🔔 <span className="font-extrabold uppercase">Important:</span> Copy and paste the shareable Google Drive links (e.g. <code>https://drive.google.com/...</code>) directly in the Document Link inputs. Make sure to set Google Drive file sharing permissions to &quot;Anyone with the link can view&quot;.
              </p>
              
              <div className="space-y-6 divide-y divide-slate-100 mb-8">
                {data.documents.map((doc, index) => (
                  <div key={doc.id} className={`flex flex-col gap-3 ${index > 0 ? "pt-6" : ""}`}>
                    <div className="flex justify-between items-center">
                      <span className="bg-slate-100 text-slate-700 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">
                        {doc.id}
                      </span>
                      <div className="flex gap-4 items-center">
                        {doc.file && (
                          <a
                            href={doc.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#f82f53] hover:underline font-bold text-xs flex items-center gap-1.5"
                          >
                            <ExternalLink size={12} />
                            Test Drive Link
                          </a>
                        )}
                        <button
                          onClick={() => handleDeleteDocument("documents", doc.id)}
                          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-lg transition active:scale-90"
                          title="Delete Row"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="md:col-span-1 flex flex-col gap-1.5">
                        <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                          Document Title
                        </label>
                        <textarea
                          rows={2}
                          value={doc.title || ""}
                          onChange={(e) => handleInputChange("documents", doc.id, "title", e.target.value)}
                          className="border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 transition focus:outline-none focus:ring-2 focus:ring-[#f82f53]/20 focus:border-[#f82f53] resize-none"
                        />
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-1.5">
                        <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                          Google Drive / Document Link
                        </label>
                        <input
                          type="text"
                          value={doc.file || ""}
                          onChange={(e) => handleInputChange("documents", doc.id, "file", e.target.value)}
                          className="border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white px-4 py-3.5 rounded-xl text-xs font-mono text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-[#f82f53]/20 focus:border-[#f82f53]"
                          placeholder="Paste Google Drive link here"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleAddDocument("documents")}
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-[#f82f53] hover:text-[#f82f53] py-4 rounded-xl text-sm font-bold text-slate-500 transition-all hover:bg-[#f82f53]/5 active:scale-[0.98]"
              >
                <Plus size={16} />
                Add New Document Row
              </button>
            </div>
          )}

          {/* SECTION C: RESULT AND ACADEMICS */}
          {activeTab === "academics" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800 border-l-4 border-[#f82f53] pl-3 mb-6">
                C: RESULT AND ACADEMICS (ACADEMIC LINKS)
              </h2>
              
              <div className="space-y-6 divide-y divide-slate-100 mb-8">
                {data.academicDocs.map((doc, index) => (
                  <div key={doc.id} className={`flex flex-col gap-3 ${index > 0 ? "pt-6" : ""}`}>
                    <div className="flex justify-between items-center">
                      <span className="bg-slate-100 text-slate-700 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">
                        {doc.id}
                      </span>
                      <div className="flex gap-4 items-center">
                        {doc.file && (
                          <a
                            href={doc.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#f82f53] hover:underline font-bold text-xs flex items-center gap-1.5"
                          >
                            <ExternalLink size={12} />
                            Test File Link
                          </a>
                        )}
                        <button
                          onClick={() => handleDeleteDocument("academicDocs", doc.id)}
                          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-lg transition active:scale-90"
                          title="Delete Row"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="md:col-span-1 flex flex-col gap-1.5">
                        <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                          Academic Document Title
                        </label>
                        <textarea
                          rows={2}
                          value={doc.title || ""}
                          onChange={(e) => handleInputChange("academicDocs", doc.id, "title", e.target.value)}
                          className="border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 transition focus:outline-none focus:ring-2 focus:ring-[#f82f53]/20 focus:border-[#f82f53] resize-none"
                        />
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-1.5">
                        <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                          Document link (e.g. PDF link or external Drive URL)
                        </label>
                        <input
                          type="text"
                          value={doc.file || ""}
                          onChange={(e) => handleInputChange("academicDocs", doc.id, "file", e.target.value)}
                          className="border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white px-4 py-3.5 rounded-xl text-xs font-mono text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-[#f82f53]/20 focus:border-[#f82f53]"
                          placeholder="Paste PDF link or Drive URL here"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleAddDocument("academicDocs")}
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-[#f82f53] hover:text-[#f82f53] py-4 rounded-xl text-sm font-bold text-slate-500 transition-all hover:bg-[#f82f53]/5 active:scale-[0.98]"
              >
                <Plus size={16} />
                Add New Academic Document Row
              </button>
            </div>
          )}

          {/* SECTION D: STAFF (TEACHING) */}
          {activeTab === "staff" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800 border-l-4 border-[#f82f53] pl-3 mb-6">
                D: STAFF (TEACHING) DETAILS
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {data.staffDetails.map((staff) => (
                  <div key={staff.id} className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                      {staff.label}
                    </label>
                    <input
                      type="text"
                      value={staff.value || ""}
                      onChange={(e) => handleInputChange("staffDetails", staff.id, "value", e.target.value)}
                      className="border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 transition focus:outline-none focus:ring-2 focus:ring-[#f82f53]/20 focus:border-[#f82f53]"
                      placeholder={`Enter details for ${staff.label}`}
                    />
                  </div>
                ))}
              </div>

              {/* Dynamic Categorywise teaching count sub-dashboard card */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 mt-6 space-y-6">
                <h3 className="text-sm font-bold text-slate-800">
                  Category-wise Teacher Counts & Staff List PDF
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      PGT Teachers
                    </label>
                    <input
                      type="text"
                      value={data.staffPgtCount || ""}
                      onChange={(e) => setData({ ...data, staffPgtCount: e.target.value })}
                      className="border border-slate-200 bg-white px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 transition focus:outline-none focus:ring-2 focus:ring-[#f82f53]/20 focus:border-[#f82f53]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      TGT Teachers
                    </label>
                    <input
                      type="text"
                      value={data.staffTgtCount || ""}
                      onChange={(e) => setData({ ...data, staffTgtCount: e.target.value })}
                      className="border border-slate-200 bg-white px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 transition focus:outline-none focus:ring-2 focus:ring-[#f82f53]/20 focus:border-[#f82f53]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      PRT Teachers
                    </label>
                    <input
                      type="text"
                      value={data.staffPrtCount || ""}
                      onChange={(e) => setData({ ...data, staffPrtCount: e.target.value })}
                      className="border border-slate-200 bg-white px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 transition focus:outline-none focus:ring-2 focus:ring-[#f82f53]/20 focus:border-[#f82f53]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      NTT / Others
                    </label>
                    <input
                      type="text"
                      value={data.staffNttCount || ""}
                      onChange={(e) => setData({ ...data, staffNttCount: e.target.value })}
                      className="border border-slate-200 bg-white px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 transition focus:outline-none focus:ring-2 focus:ring-[#f82f53]/20 focus:border-[#f82f53]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 pt-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Staff List PDF / Document Link
                    </label>
                    {data.staffListFile && data.staffListFile !== "#" && (
                      <a
                        href={data.staffListFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#f82f53] hover:underline font-bold text-xs flex items-center gap-1.5"
                      >
                        <ExternalLink size={12} />
                        Test File Link
                      </a>
                    )}
                  </div>
                  <input
                    type="text"
                    value={data.staffListFile || ""}
                    onChange={(e) => setData({ ...data, staffListFile: e.target.value })}
                    className="border border-slate-200 bg-white px-4 py-3 rounded-xl text-xs font-mono text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-[#f82f53]/20 focus:border-[#f82f53]"
                    placeholder="Paste PDF link or Google Drive URL here"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION E: SCHOOL INFRASTRUCTURE */}
          {activeTab === "infrastructure" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800 border-l-4 border-[#f82f53] pl-3 mb-6">
                E: SCHOOL INFRASTRUCTURE DETAILS
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {data.infrastructureDetails.map((infra) => (
                  <div key={infra.id} className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                      {infra.label}
                    </label>
                    <input
                      type="text"
                      value={infra.value || ""}
                      onChange={(e) => handleInputChange("infrastructureDetails", infra.id, "value", e.target.value)}
                      className="border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 transition focus:outline-none focus:ring-2 focus:ring-[#f82f53]/20 focus:border-[#f82f53]"
                      placeholder={`Enter ${infra.label}`}
                    />
                  </div>
                ))}
              </div>

              {/* Dynamic Laboratory size inputs card */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">
                    Laboratory Sizes (SQR MTRS)
                  </h3>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    Edit size of each lab individually
                  </span>
                </div>
                {data.labs && data.labs.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {data.labs.map((lab, index) => (
                      <div key={index} className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                          {lab.name}
                        </label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={lab.size || ""}
                            onChange={(e) => {
                              const updatedLabs = [...data.labs];
                              updatedLabs[index] = { ...lab, size: e.target.value };
                              setData({ ...data, labs: updatedLabs });
                            }}
                            className="flex-1 border border-slate-200 bg-white px-4 py-3 rounded-xl text-xs font-bold text-slate-800 transition focus:outline-none focus:ring-2 focus:ring-[#f82f53]/20 focus:border-[#f82f53]"
                            placeholder="e.g. 56 Sq. Meters"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                    <p className="text-sm text-slate-500 font-semibold">
                      Lab data not loaded yet. Click <strong>Refresh</strong> to initialize.
                    </p>
                    <button
                      onClick={fetchData}
                      className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition active:scale-95"
                    >
                      <RefreshCw size={13} />
                      Refresh Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
