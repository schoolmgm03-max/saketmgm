"use client";

import { useEffect, useState } from "react";

type ImageType = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  imageUrl: string;
  public_id: string;
  date: string;
};

export default function ManageGallery() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [editingImage, setEditingImage] = useState<ImageType | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [newFile, setNewFile] = useState<File | null>(null);

  const [page, setPage] = useState(1);
  const limit = 8;

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/gallery");
      if (!res.ok) throw new Error("Failed to fetch images");
      const data: ImageType[] = await res.json();
      setImages(data);
      setFilteredImages(data.slice(0, limit));
      setAllCategories([
        "all",
        ...Array.from(new Set(data.map((img) => img.category))),
      ]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function handleLoadMore() {
    const nextPage = page + 1;
    const newImages = images
      .filter((img) =>
        categoryFilter === "all" ? true : img.category === categoryFilter
      )
      .slice(0, nextPage * limit);

    setFilteredImages(newImages);
    setPage(nextPage);
  }

  function handleFilterChange(category: string) {
    setCategoryFilter(category);
    setPage(1);
    const filtered = images.filter((img) =>
      category === "all" ? true : img.category === category
    );
    setFilteredImages(filtered.slice(0, limit));
  }

  async function handleDelete(public_id: string) {
    if (!confirm("Are you sure you want to delete this image?")) return;
    setDeletingId(public_id);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id }),
      });

      if (!res.ok) throw new Error("Failed to delete image");

      const updatedImages = images.filter((img) => img.public_id !== public_id);
      setImages(updatedImages);
      handleFilterChange(categoryFilter);
      alert("Image deleted successfully");
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setDeletingId(null);
    }
  }

  // -------- Edit Handlers ----------
  function openEditModal(img: ImageType) {
    setEditingImage(img);
    setEditForm({
      title: img.title,
      description: img.description || "",
      category: img.category,
    });
    setNewFile(null);
  }

  function closeEditModal() {
    setEditingImage(null);
    setEditForm({ title: "", description: "", category: "" });
    setNewFile(null);
  }

  async function handleEditSave() {
    if (!editingImage) return;

    try {
      const formData = new FormData();
      formData.append("id", editingImage._id);
      formData.append("title", editForm.title.trim());
      formData.append("description", editForm.description.trim());
      formData.append("category", editForm.category.trim());

      if (newFile) {
        formData.append("newFile", newFile);
      }

      const res = await fetch("/api/admin/gallery/update", {
        method: "PUT",
        body: formData, // ✅ sending FormData
      });

      if (!res.ok) throw new Error("Failed to update image");
      const updated = await res.json();

      const updatedImages = images.map((img) =>
        img._id === editingImage._id ? updated : img
      );
      setImages(updatedImages);
      handleFilterChange(categoryFilter);
      alert("Image updated successfully");
      closeEditModal();
    } catch (err) {
      alert((err as Error).message);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-[#f82f53] mb-10">
        Manage Gallery
      </h1>

      {/* Filter */}
      {allCategories.length > 0 && (
        <div className="flex w-100 mb-6">
          <select
            aria-label="Filter images by category"
            value={categoryFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-auto text-gray-700"
          >
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      )}

      {loading && (
        <p className="text-center text-gray-500">Loading images...</p>
      )}
      {error && <p className="text-center text-red-600">Error: {error}</p>}
      {!loading && images.length === 0 && (
        <p className="text-center text-gray-600">
          No images found in the gallery.
        </p>
      )}

      {/* Gallery Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-[1600px] mx-auto">
        {filteredImages.map((img) => (
          <div
            key={img._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col"
          >
            <img
              src={img.imageUrl}
              alt={img.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="font-semibold text-lg text-[#f82f53] line-clamp-1">
                  {img.title}
                </h2>
                <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                  {img.description || "No description provided."}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  <strong>Category:</strong> {img.category}
                </p>
                <p className="text-xs text-gray-400">
                  <strong>Date:</strong>{" "}
                  {new Date(img.date).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => openEditModal(img)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition-all"
                >
                  Edit
                </button>
                <button
                  disabled={deletingId === img.public_id}
                  onClick={() => handleDelete(img.public_id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition-all disabled:opacity-50"
                >
                  {deletingId === img.public_id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filteredImages.length <
        images.filter((img) =>
          categoryFilter === "all" ? true : img.category === categoryFilter
        ).length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-[#f82f53] hover:bg-[#d82646] text-white px-6 py-3 rounded-lg font-semibold"
          >
            Load More
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-[#f82f53]">
              Edit Image
            </h2>

            <label
              htmlFor="editTitle"
              className="block mb-2 text-sm font-medium"
            >
              Title
            </label>
            <input
              id="editTitle"
              type="text"
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
              placeholder="Enter title"
              className="w-full border rounded px-3 py-2 mb-3"
            />

            <label
              htmlFor="editDescription"
              className="block mb-2 text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="editDescription"
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
              placeholder="Enter description"
              className="w-full border rounded px-3 py-2 mb-3"
            />

            <label
              htmlFor="editCategory"
              className="block mb-2 text-sm font-medium"
            >
              Category
            </label>
            <input
              id="editCategory"
              type="text"
              value={editForm.category}
              onChange={(e) =>
                setEditForm({ ...editForm, category: e.target.value })
              }
              placeholder="Enter category"
              className="w-full border rounded px-3 py-2 mb-3"
            />

            <label
              htmlFor="editImage"
              className="block mb-2 text-sm font-medium"
            >
              New Image (optional)
            </label>
            <input
              id="editImage"
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setNewFile(e.target.files[0])}
              className="w-full border rounded px-3 py-2 mb-3"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={closeEditModal}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEditSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
