"use client";

import { useState } from "react";
import AdminGallery from "../component/gallery/addGallery";
import ManageGallery from "../component/gallery/manageGallery";
import AdminGalleryVideo from "../component/gallery/addVideos";
import ManageVideoGallery from "../component/gallery/manageVideos"; // 👈 New component

export default function GalleryManager() {
  const [activeTab, setActiveTab] = useState<
    "manageImage" | "addImage" | "manageVideo" | "addVideo"
  >("manageImage");

  return (
    <div className="mx-auto p-1">
      {/* Buttons to switch */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {/* Manage Images */}
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "manageImage"
              ? "bg-pink-600 text-white"
              : "bg-pink-100 text-pink-700"
          }`}
          onClick={() => setActiveTab("manageImage")}
        >
          Manage Images
        </button>

        {/* Add Images */}
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "addImage"
              ? "bg-pink-600 text-white"
              : "bg-pink-100 text-pink-700"
          }`}
          onClick={() => setActiveTab("addImage")}
        >
          Add Images
        </button>

        {/* Manage Videos */}
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "manageVideo"
              ? "bg-pink-600 text-white"
              : "bg-pink-100 text-pink-700"
          }`}
          onClick={() => setActiveTab("manageVideo")}
        >
          Manage Videos
        </button>

        {/* Add Videos */}
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "addVideo"
              ? "bg-pink-600 text-white"
              : "bg-pink-100 text-pink-700"
          }`}
          onClick={() => setActiveTab("addVideo")}
        >
          Add Videos
        </button>
      </div>

      {/* Conditional render based on activeTab */}
      {activeTab === "manageImage" && <ManageGallery />}
      {activeTab === "addImage" && <AdminGallery />}
      {activeTab === "manageVideo" && <ManageVideoGallery />} {/* 👈 New */}
      {activeTab === "addVideo" && <AdminGalleryVideo />}
    </div>
  );
}
