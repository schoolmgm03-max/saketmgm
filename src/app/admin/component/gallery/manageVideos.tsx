"use client";

import { useEffect, useState } from "react";

type VideoType = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  url: string;
  createdAt: string;
};

export default function ManageVideo() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const limit = 8;

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [allCategories, setAllCategories] = useState<string[]>([]);

  // ==============================
  // 📌 Fetch Videos
  // ==============================
  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/gallery/videos");
      if (!res.ok) throw new Error("Failed to fetch videos");

      const response = await res.json();
      console.log("👉 API Response:", response);

      const videoArray: VideoType[] = Array.isArray(response.data)
        ? response.data
        : [];

      setVideos(videoArray);
      setFilteredVideos(videoArray.slice(0, limit));

      setAllCategories([
        "all",
        ...Array.from(new Set(videoArray.map((vid) => vid.category))),
      ]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  // ==============================
  // 📌 Pagination
  // ==============================
  function handleLoadMore() {
    const nextPage = page + 1;
    const filtered = videos.filter((vid) =>
      categoryFilter === "all" ? true : vid.category === categoryFilter
    );

    setFilteredVideos(filtered.slice(0, nextPage * limit));
    setPage(nextPage);
  }

  // ==============================
  // 📌 Filter
  // ==============================
  function handleFilterChange(category: string) {
    setCategoryFilter(category);
    setPage(1);

    const filtered = videos.filter((vid) =>
      category === "all" ? true : vid.category === category
    );
    setFilteredVideos(filtered.slice(0, limit));
  }

  // ==============================
  // 📌 Delete Video
  // ==============================
  const handleDelete = async (id: string) => {
    console.log("🟡 Sending delete request for:", id);
    setDeletingId(id);
    try {
      const res = await fetch("/api/admin/gallery/videos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      console.log("✅ Delete Response:", data);

      if (res.ok) {
        // ✅ Update both videos and filteredVideos
        setVideos((prev) => {
          const updated = prev.filter((v) => v._id !== id);

          // also update filteredVideos accordingly
          const filtered = updated.filter((vid) =>
            categoryFilter === "all" ? true : vid.category === categoryFilter
          );
          setFilteredVideos(filtered.slice(0, page * limit));

          return updated;
        });
      }
    } catch (err) {
      console.error("❌ Delete Error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // ==============================
  // 📌 Extract YouTube Embed Link
  // ==============================
  const getYouTubeEmbed = (url: string) => {
    if (!url) return null;

    try {
      const regExp =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

      const match = url.match(regExp);

      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      } else {
        console.warn("Invalid YouTube URL:", url);
        return null;
      }
    } catch (error) {
      console.error("Error parsing YouTube URL:", error);
      return null;
    }
  };

  // ==============================
  // 📌 JSX
  // ==============================
  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-[#f82f53] mb-10">
        Manage Videos
      </h1>

      {/* Filter */}
      {allCategories.length > 0 && (
        <div className="flex w-full mb-6">
          <select
            aria-label="Filter videos by category"
            value={categoryFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700"
          >
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Loading / Error / Empty states */}
      {loading && <p className="text-center text-gray-500">Loading videos...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}
      {!loading && videos.length === 0 && (
        <p className="text-center text-gray-600">
          No videos found in the gallery.
        </p>
      )}

      {/* Video Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-[1600px] mx-auto">
        {filteredVideos.map(
          ({ _id, title, description, category, url, createdAt }) => {
            const embedUrl = getYouTubeEmbed(url);
            return (
              <div
                key={_id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col"
              >
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    className="w-full h-48"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p className="text-center text-red-500">
                    Invalid YouTube URL
                  </p>
                )}

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="font-semibold text-lg text-[#f82f53] line-clamp-1">
                      {title}
                    </h2>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                      {description || "No description provided."}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      <strong>Category:</strong> {category}
                    </p>
                    <p className="text-xs text-gray-400">
                      <strong>Date:</strong>{" "}
                      {createdAt
                        ? new Date(createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                  <button
                    disabled={deletingId === _id}
                    onClick={() => handleDelete(_id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition-all disabled:opacity-50"
                  >
                    {deletingId === _id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Load More */}
      {filteredVideos.length <
        videos.filter((vid) =>
          categoryFilter === "all" ? true : vid.category === categoryFilter
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
    </div>
  );
}
