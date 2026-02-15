"use client";

import { useState } from "react";
import AdminNewsPage from "../component/news/newsData";
import AddNewsForm from "../component/news/addNews";
import { Newspaper, PlusCircle } from "lucide-react";

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "add">("all");

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium shadow-md transition-all duration-300 
            ${
              activeTab === "all"
                ? "bg-[#f82f53] text-white shadow-lg scale-105"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
        >
          <Newspaper size={18} />
          All News
        </button>

        <button
          onClick={() => setActiveTab("add")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium shadow-md transition-all duration-300 
            ${
              activeTab === "add"
                ? "bg-[#f82f53] text-white shadow-lg scale-105"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
        >
          <PlusCircle size={18} />
          Add News
        </button>
      </div>

      {/* Content Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        {activeTab === "all" && <AdminNewsPage />}
        {activeTab === "add" && <AddNewsForm />}
      </div>
    </div>
  );
}
