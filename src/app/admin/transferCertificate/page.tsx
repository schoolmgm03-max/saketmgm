"use client";

import { useState } from "react";
import AdminTCUpload from "../component/transferCertificate/addTransferCertificate";
import ManageTC from "../component/transferCertificate/manageTc";
// import ManageTC from "../component/transferCertificate/manageTransferCertificate";

export default function TCManagerPage() {
  const [activeTab, setActiveTab] = useState<"manageTC" | "addTC">("manageTC");

  return (
    <main className="bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Transfer Certificate Management
        </h1>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <button
            className={`px-5 py-2 rounded-lg font-medium transition ${
              activeTab === "manageTC"
                ? "bg-[#f82f53] text-white shadow-md"
                : "bg-[#f82f53]/10 text-[#f82f53] hover:bg-[#f82f53]/20"
            }`}
            onClick={() => setActiveTab("manageTC")}
          >
            Manage TC
          </button>

          <button
            className={`px-5 py-2 rounded-lg font-medium transition ${
              activeTab === "addTC"
                ? "bg-[#f82f53] text-white shadow-md"
                : "bg-[#f82f53]/10 text-[#f82f53] hover:bg-[#f82f53]/20"
            }`}
            onClick={() => setActiveTab("addTC")}
          >
            Add TC
          </button>
        </div>

        {/* Conditional Rendering */}
        <div className="bg-white shadow rounded-xl p-6">
          {activeTab === "manageTC" && <ManageTC/>}
          {activeTab === "addTC" && <AdminTCUpload />}
        </div>
      </div>
    </main>
  );
}
