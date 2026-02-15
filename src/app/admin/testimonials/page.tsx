"use client";

import React, { useState } from "react";
import AddTestimonials from "../component/testimonials/addTestimonial";
import ManageTestimonials from "../component/testimonials/manageTestimonial";

export default function AdminTestimonials() {
  const [activeTab, setActiveTab] = useState<"add" | "manage">("add");

  return (
    <div className=" bg-gradient-to-br from-pink-50 to-white p-6">
      <div className=" bg-white shadow-lg rounded-2xl p-6">
        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab("add")}
            className={`px-5 py-2 rounded-lg font-medium transition ${
              activeTab === "add"
                ? "bg-[#f82f53] text-white shadow"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
             Add Testimonials
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`px-5 py-2 rounded-lg font-medium transition ${
              activeTab === "manage"
                ? "bg-[#f82f53] text-white shadow"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
             Manage Testimonials
          </button>
        </div>

        {/* Render Component Based on Tab */}
        <div>
          {activeTab === "add" && <AddTestimonials />}
          {activeTab === "manage" && <ManageTestimonials />}
        </div>
      </div>
    </div>
  );
}
