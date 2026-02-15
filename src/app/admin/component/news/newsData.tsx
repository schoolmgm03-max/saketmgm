"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { NewsItem } from "../../../../../types/news";

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch News
  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/news?page=1&limit=50");
      const data = await res.json();
      setNewsList(data.data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🗑 Delete News
  const deleteNews = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news?")) return;
    try {
      const res = await fetch(`/api/admin/news?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNewsList((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage News</h1>

      {loading ? (
        <p>Loading news...</p>
      ) : newsList.length === 0 ? (
        <p>No news found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsList.map((news) => (
            <div
              key={news._id}
              className="border rounded-lg overflow-hidden shadow-sm bg-white"
            >
              <Image
                src={news.image}
                alt={news.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{news.title}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(news.date).toLocaleDateString()}
                </p>
                <p className="mt-2 text-gray-700 line-clamp-3">
                  {news.content}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Category: {news.category}
                </p>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => alert("Edit feature coming soon")}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    aria-label="Edit news"
                    title="Edit news"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteNews(news._id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    aria-label="Delete news"
                    title="Delete news"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
