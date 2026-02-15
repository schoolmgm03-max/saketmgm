"use client";

import { useState } from "react";
import { PlusCircle, Upload } from "lucide-react";

export default function AdminGalleryMulti() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files)); // multiple files to array
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setSuccessMessage("");

    if (imageFiles.length === 0) {
      alert("Please select at least one image to upload.");
      setUploading(false);
      return;
    }

    try {
      // Upload all images one by one (or Promise.all for parallel)
      const uploadPromises = imageFiles.map(async (file) => {
        const cloudinaryForm = new FormData();
        cloudinaryForm.append("file", file);
        cloudinaryForm.append("upload_preset", "ml_default"); // your upload preset

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dbgdrmqy6/image/upload",
          {
            method: "POST",
            body: cloudinaryForm,
          }
        );

        const data = await res.json();

        if (!res.ok || !data.secure_url) {
          throw new Error("Cloudinary upload failed");
        }

        return {
          imageUrl: data.secure_url,
          public_id: data.public_id,
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);

      // Prepare payload for backend - one entry per image
      const payload = uploadedImages.map((img) => ({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        imageUrl: img.imageUrl,
        public_id: img.public_id,
        date: new Date().toISOString(),
      }));

      // Send all metadata to backend in one request
      const backendRes = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const backendData = await backendRes.json();

      if (!backendRes.ok) {
        console.error("Backend error:", backendData);
        alert("Failed to save images metadata.");
        setUploading(false);
        return;
      }

      setSuccessMessage("✅ All images added successfully!");
      setFormData({ title: "", description: "", category: "" });
      setImageFiles([]);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong while uploading.");
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
          Add New Gallery Images
        </h2>

        {/* Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Title</label>
          <input
            name="title"
            type="text"
            placeholder="Enter image title"
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
            placeholder="e.g. Sports, Events"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#f82f53] outline-none transition"
            required
          />
        </div>

        {/* File Upload - multiple */}
        <div>
          <label htmlFor="imageUpload" className="block mb-1 text-sm font-medium text-gray-600">
            Images
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#f82f53] outline-none transition"
            required
          />
          {imageFiles.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              Selected: {imageFiles.map((f) => f.name).join(", ")}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="flex items-center justify-center gap-2 w-full bg-[#f82f53] hover:bg-[#d72747] text-white font-medium px-4 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Upload size={20} className="animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <PlusCircle size={20} />
              Add Images
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
