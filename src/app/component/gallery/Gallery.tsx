"use client";
import { useEffect, useState } from "react";
import GalleryCard from "./GalleryCard";
import Lightbox from "./Lightbox";

interface GalleryImage {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
}

export default function Gallery() {
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [limit, setLimit] = useState(9);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  // Fetch categories
  useEffect(() => {
    fetch("/api/gallery/categories")
      .then((res) => res.json())
      .then((data) => setCategories(["All", ...(data.data ?? data)]))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  // Fetch all images
  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setAllImages(data.data ?? data))
      .catch((err) => {
        console.error("Failed to fetch gallery", err);
        setAllImages([]);
      });
  }, []);

  // Filtered images
  const filteredImages = allImages.filter(
    (img) =>
      selectedCategory === "All" ||
      img.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  // Escape key closes lightbox
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">School Gallery</h2>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setLimit(9); // reset on category change
            }}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-[#f82f53] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredImages.slice(0, limit).map((img) => (
          <GalleryCard
            key={img._id}
            image={img.imageUrl}
            title={img.title}
            description={img.description}
            date={img.date}
            onClick={() => setLightboxImage(img)}
          />
        ))}
      </div>

      {/* Load More */}
      {limit < filteredImages.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setLimit(limit + 9)}
            className="px-6 py-2 rounded bg-[#f82f53] text-white font-medium hover:bg-red-600 transition"
          >
            Load More
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <Lightbox
          image={lightboxImage.imageUrl}
          title={lightboxImage.title}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  );
}
