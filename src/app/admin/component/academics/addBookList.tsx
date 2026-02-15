"use client";

import { useState } from "react";
import { Upload, FileText } from "lucide-react";

export default function AddBookList() {
    const [bookListFile, setBookListFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setBookListFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookListFile) {
            alert("Please select a PDF file.");
            return;
        }

        setUploading(true);
        setSuccessMessage("");

        try {
            // 1. Upload to Cloudinary
            const cloudinaryForm = new FormData();
            cloudinaryForm.append("file", bookListFile);
            cloudinaryForm.append("upload_preset", "ml_default");
            cloudinaryForm.append("resource_type", "auto");

            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dbgdrmqy6/auto/upload",
                {
                    method: "POST",
                    body: cloudinaryForm,
                }
            );

            const data = await res.json();
            if (!res.ok || !data.secure_url) throw new Error("Cloudinary upload failed");

            // 2. Save metadata to backend
            const backendRes = await fetch("/api/admin/booklist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    url: data.secure_url,
                    public_id: data.public_id,
                }),
            });

            if (!backendRes.ok) throw new Error("Backend save failed");

            setSuccessMessage("✅ Book List uploaded successfully!");
            setBookListFile(null);
        } catch (err) {
            console.error("Upload error:", err);
            alert("Something went wrong while uploading.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white/90 backdrop-blur-md rounded-2xl p-8 w-full max-w-lg space-y-5 border border-pink-100"
            >
                <h2 className="text-2xl font-bold text-center text-[#f82f53]">
                    Upload Book List PDF
                </h2>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Select PDF File
                    </label>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#f82f53] outline-none transition"
                        required
                    />
                    {bookListFile && (
                        <p className="text-sm text-gray-500 mt-1">
                            Selected: {bookListFile.name}
                        </p>
                    )}
                </div>

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
                            Upload Book List
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
