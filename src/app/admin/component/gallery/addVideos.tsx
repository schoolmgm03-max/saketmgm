"use client";

import { useState } from "react";
import { PlusCircle, Youtube } from "lucide-react";

export default function AdminGalleryVideo() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    youtubeUrl: "",
  });

  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setSuccessMessage("");

    if (!formData.youtubeUrl.trim()) {
      alert("Please enter a YouTube video URL.");
      setUploading(false);
      return;
    }

    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        url: formData.youtubeUrl.trim(),
        date: new Date().toISOString(),
      };

      // Send metadata to backend
      const backendRes = await fetch("/api/admin/gallery/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const backendData = await backendRes.json();

      if (!backendRes.ok) {
        console.error("Backend error:", backendData);
        alert("Failed to save video metadata.");
        setUploading(false);
        return;
      }

      setSuccessMessage("✅ Video added successfully!");
      setFormData({ title: "", description: "", category: "", youtubeUrl: "" });
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong while saving video.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-lg space-y-5 border border-pink-100"
      >
        <h2 className="text-2xl font-bold text-center text-[#f82f53]">
          Add New Gallery Video
        </h2>

        {/* Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Title</label>
          <input
            name="title"
            type="text"
            placeholder="Enter video title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#f82f53] outline-none transition"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Description</label>
          <textarea
            name="description"
            placeholder="Write a short description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#f82f53] outline-none transition"
            rows={3}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Category</label>
          <input
            name="category"
            type="text"
            placeholder="e.g. Annual Day, Events"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#f82f53] outline-none transition"
            required
          />
        </div>

        {/* YouTube URL */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">YouTube URL</label>
          <input
            name="youtubeUrl"
            type="url"
            placeholder="https://www.youtube.com/watch?v=example"
            value={formData.youtubeUrl}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#f82f53] outline-none transition"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="flex items-center justify-center gap-2 w-full bg-[#f82f53] hover:bg-[#d72747] text-white font-medium px-4 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Youtube size={20} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <PlusCircle size={20} />
              Add Video
            </>
          )}
        </button>

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-600 text-sm text-center mt-4">{successMessage}</p>
        )}
      </form>
    </div>
  );
}
