'use client';

import { useState } from 'react';

export default function AddNewsForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    public_id: '',
    date: '',
    category: 'General',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setSuccess('');

    console.log("Form submission started", formData, imageFile);

    let imageUrl = '';
    let publicId = '';

    // Upload image to Cloudinary
    if (imageFile) {
      console.log("Uploading image to Cloudinary...");
      const uploadData = new FormData();
      uploadData.append('file', imageFile);
      uploadData.append('upload_preset', 'ml_default'); // Change to your preset

      try {
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/dbgdrmqy6/image/upload',
          {
            method: 'POST',
            body: uploadData,
          }
        );

        console.log("Cloudinary response status:", res.status);
        const data = await res.json();
        console.log("Cloudinary response data:", data);

        if (!res.ok || !data.secure_url) {
          console.error("Image upload failed", data);
          alert('Image upload failed');
          setUploading(false);
          return;
        }

        imageUrl = data.secure_url;
        publicId = data.public_id;
      } catch (error) {
        console.error('Image upload error:', error);
        alert('Image upload error');
        setUploading(false);
        return;
      }
    } else {
      console.log("No image file selected — skipping upload.");
    }

    // Send data to API
    try {
      console.log("Sending news data to API:", {
        ...formData,
        image: imageUrl,
        public_id: publicId,
      });

      const res = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
          public_id: publicId,
        }),
      });

      console.log("API response status:", res.status);

      if (res.ok) {
        const responseData = await res.json();
        console.log("News saved successfully:", responseData);

        setSuccess('✅ News added successfully!');
        setFormData({
          title: '',
          content: '',
          image: '',
          public_id: '',
          date: '',
          category: 'General',
        });
        setImageFile(null);
      } else {
        const errorData = await res.json();
        console.error("Error from server:", errorData);
        alert('Error while submitting');
      }
    } catch (error) {
      console.error("Submit failed:", error);
      alert('Submit failed');
    }

    setUploading(false);
    console.log("Form submission ended");
  };

  const inputClass =
    'w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f82f53] transition';

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-[#f82f53]">📰 Add News</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            autoComplete="off"
            value={formData.title}
            onChange={handleChange}
            className={inputClass}
            placeholder="Enter news title"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            autoComplete="off"
            value={formData.content}
            onChange={handleChange}
            className={`${inputClass} min-h-[140px] resize-y`}
            placeholder="Write the content here..."
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            autoComplete="off"
            value={formData.date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            autoComplete="off"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="General">General</option>
            <option value="Events">Events</option>
            <option value="Academics">Academics</option>
            <option value="Announcements">Announcements</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            autoComplete="off"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#f82f53] file:text-white hover:file:bg-[#e12244] transition"
          />
          {imageFile && (
            <p className="mt-2 text-sm text-gray-500">
              Selected: {imageFile.name}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-[#f82f53] text-white py-3 rounded-md text-base font-semibold hover:bg-[#e12244] transition disabled:opacity-60"
        >
          {uploading ? 'Submitting...' : 'Submit'}
        </button>

        {success && (
          <p className="text-green-600 font-semibold text-center mt-4">{success}</p>
        )}
      </form>
    </div>
  );
}
