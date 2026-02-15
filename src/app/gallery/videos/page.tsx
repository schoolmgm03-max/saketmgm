"use client";
import VideoCard from "@/app/component/gallery/VideoCard";
import VideoLightbox from "@/app/component/gallery/VideoLightbox";
import { useEffect, useState } from "react";

interface GalleryVideo {
  _id: string;
  title: string;
  description: string;
  category: string;
  url: string; // ✅ DB field
  createdAt: string;
}

export default function VideoGallery() {
  const [allVideos, setAllVideos] = useState<GalleryVideo[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [limit, setLimit] = useState(6);
  const [lightboxVideo, setLightboxVideo] = useState<GalleryVideo | null>(null);

  // ✅ Fetch videos
  useEffect(() => {
    fetch("/api/admin/gallery/videos")
      .then(async (res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const videos: GalleryVideo[] = data.data ?? data;

        // ✅ YouTube URL → Embed
        const formatted = videos.map((v) => ({
          ...v,
          url: formatYouTubeUrl(v.url),
        }));

        setAllVideos(formatted);

        // ✅ Categories
        const uniqueCats = Array.from(new Set(videos.map((v) => v.category)));
        setCategories(["All", ...uniqueCats]);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch videos:", err);
        setAllVideos([]);
      });
  }, []);

  // ✅ YouTube URL Formatter
  const formatYouTubeUrl = (url: string) => {
    try {
      const ytMatch = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/
      );
      if (ytMatch && ytMatch[1]) {
        return `https://www.youtube.com/embed/${ytMatch[1]}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  // ✅ Filter
  const filteredVideos = allVideos.filter(
    (vid) =>
      selectedCategory === "All" ||
      vid.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  // ✅ Escape key close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxVideo(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">School Video Gallery</h2>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setLimit(6);
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

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredVideos.slice(0, limit).map((vid) => (
          <VideoCard
            key={vid._id}
            url={vid.url} // ✅ url prop bhejna hai
            title={vid.title}
            description={vid.description}
            date={vid.createdAt}
            onClick={() => setLightboxVideo(vid)}
          />
        ))}
      </div>

      {/* Load More */}
      {limit < filteredVideos.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setLimit(limit + 6)}
            className="px-6 py-2 rounded bg-[#f82f53] text-white font-medium hover:bg-red-600 transition"
          >
            Load More
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightboxVideo && (
        <VideoLightbox
          url={lightboxVideo.url} // ✅ embed url
          title={lightboxVideo.title}
          onClose={() => setLightboxVideo(null)}
        />
      )}
    </div>
  );
}
