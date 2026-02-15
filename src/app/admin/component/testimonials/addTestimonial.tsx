"use client";

import { useState } from "react";
import { PlusCircle, Upload } from "lucide-react";

export default function AddTestimonials() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select an image");

    setUploading(true);
    setSuccessMessage("");

    try {
      // Step 1: Upload image to Cloudinary
      const cloudinaryForm = new FormData();
      cloudinaryForm.append("file", imageFile);
      cloudinaryForm.append("upload_preset", "ml_default"); // 👈 apna preset use karein

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

      // Step 2: Save metadata to backend
      const payload = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        message: formData.message.trim(),
        image: data.secure_url,
        public_id: data.public_id,
        date: new Date().toISOString(),
      };

      const backendRes = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const backendData = await backendRes.json();
      if (!backendRes.ok) {
        console.error("Backend error:", backendData);
        alert("Failed to save testimonial.");
        return;
      }

      setSuccessMessage("✅ Testimonial added successfully!");
      setFormData({ name: "", role: "", message: "" });
      setImageFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong.");
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
          Add Testimonial
        </h2>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Student name"
            title="Enter student name"
            aria-label="Enter student name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#f82f53] outline-none transition"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="block mb-1 text-sm font-medium text-gray-600"
          >
            Role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            placeholder="Student / Parent"
            title="Enter role (Student or Parent)"
            aria-label="Enter role (Student or Parent)"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#f82f53] outline-none transition"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block mb-1 text-sm font-medium text-gray-600"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Write testimonial message"
            title="Write testimonial message"
            aria-label="Write testimonial message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#f82f53] outline-none transition"
            rows={3}
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label
            htmlFor="imageUpload"
            className="block mb-1 text-sm font-medium text-gray-600"
          >
            Image
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            title="Upload testimonial image"
            aria-label="Upload testimonial image"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#f82f53] outline-none transition"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="flex items-center justify-center gap-2 w-full bg-[#f82f53] hover:bg-[#d82846] text-white font-medium px-4 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Upload size={20} className="animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <PlusCircle size={20} />
              Add Testimonial
            </>
          )}
        </button>

        {successMessage && (
          <p className="text-green-600 text-sm text-center mt-4">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
}
