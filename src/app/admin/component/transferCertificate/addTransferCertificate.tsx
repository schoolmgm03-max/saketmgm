"use client";

import { useState } from "react";
import { Upload, FileText } from "lucide-react";

export default function AdminTCUpload() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentClass: "",
    admissionNumber: "",
  });

  const [tcFile, setTcFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // class list array
  const classOptions = [
    "Nursery",
    "LKG",
    "UKG",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
  ];

  // input validation function
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!/^[A-Za-z ]+$/.test(formData.studentName.trim())) {
      newErrors.studentName = "Only letters and spaces allowed in name";
    }

    if (!/^[0-9]+$/.test(formData.admissionNumber.trim())) {
      newErrors.admissionNumber = "Only numbers allowed in admission number";
    }

    if (!formData.studentClass) {
      newErrors.studentClass = "Class is required";
    }

    if (!tcFile) {
      newErrors.tcFile = "TC image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle text/select input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error
  };

  // handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTcFile(e.target.files[0]);
      setErrors({ ...errors, tcFile: "" }); // clear error
    }
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) return;

    setUploading(true);

    try {
      // upload TC to Cloudinary
      const cloudinaryForm = new FormData();
      cloudinaryForm.append("file", tcFile!);
      cloudinaryForm.append("upload_preset", "ml_default"); // replace with your preset

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

      // payload for backend
      const payload = {
        studentName: formData.studentName.trim(),
        studentClass: formData.studentClass.trim(),
        admissionNumber: formData.admissionNumber.trim(),
        tcUrl: data.secure_url,
        public_id: data.public_id,
        date: new Date().toISOString(),
      };

      // send metadata to backend
      const backendRes = await fetch("/api/admin/tc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const backendData = await backendRes.json();

      if (!backendRes.ok) {
        console.error("Backend error:", backendData);
        alert("Failed to save TC metadata.");
        setUploading(false);
        return;
      }

      setSuccessMessage("✅ TC uploaded successfully!");
      setFormData({
        studentName: "",
        studentClass: "",
        admissionNumber: "",
      });
      setTcFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md rounded-2xl p-8 w-full max-w-lg space-y-5 border border-pink-100"
      >
        <h2 className="text-2xl font-bold text-center text-[#f82f53]">
          Upload Transfer Certificate
        </h2>

        {/* Student Name */}
        <div>
          <label
            htmlFor="studentName"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Student Name
          </label>
          <input
            id="studentName"
            name="studentName"
            type="text"
            placeholder="Enter student name"
            value={formData.studentName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#f82f53] outline-none transition"
            required
          />
          {errors.studentName && (
            <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>
          )}
        </div>

        {/* Admission Number */}
        <div>
          <label
            htmlFor="admissionNumber"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Admission Number
          </label>
          <input
            id="admissionNumber"
            name="admissionNumber"
            type="text"
            placeholder="Enter admission number"
            value={formData.admissionNumber}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#f82f53] outline-none transition"
            required
          />
          {errors.admissionNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.admissionNumber}
            </p>
          )}
        </div>

        {/* Select Class */}
        <div>
          <label
            htmlFor="studentClass"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Select Class
          </label>
          <select
            id="studentClass"
            name="studentClass"
            value={formData.studentClass}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#f82f53] outline-none transition max-h-48 overflow-y-auto"
            required
          >
            <option value="">-- Select Class --</option>
            {classOptions.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
          {errors.studentClass && (
            <p className="text-red-500 text-sm mt-1">{errors.studentClass}</p>
          )}
        </div>

        {/* TC File Upload */}
        <div>
          <label
            htmlFor="tcFile"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            TC Image
          </label>
          <input
            id="tcFile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#f82f53] outline-none transition"
            required
          />
          {tcFile && (
            <p className="text-sm text-gray-500 mt-1">
              Selected: {tcFile.name}
            </p>
          )}
          {errors.tcFile && (
            <p className="text-red-500 text-sm mt-1">{errors.tcFile}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="flex items-center justify-center gap-2 w-full bg-[#f82f53] hover:bg-[#e02849] text-white font-medium px-4 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Upload size={20} className="animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <FileText size={20} />
              Upload TC
            </>
          )}
        </button>

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-600 text-sm text-center mt-4">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
}
