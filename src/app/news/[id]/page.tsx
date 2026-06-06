"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { NewsItem } from "../../../../types/news";
import NewsImageLightbox from "../../component/newsNotice/NewsImageLightbox";

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLightbox, setShowLightbox] = useState(false);

  const id = params?.id as string;

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`/api/news/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("News not found");
        return res.json();
      })
      .then((data) => {
        setNews(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch news:", err);
        setError("News article not found.");
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#f82f53] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading news article...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            News Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The news article you are looking for does not exist or has been
            removed.
          </p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#f82f53] text-white rounded-full hover:bg-[#e12244] transition"
          >
            <ArrowLeft size={18} />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb / Back navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#f82f53] transition text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to News & Notices
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <section
        className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-200 cursor-pointer group"
        onClick={() => setShowLightbox(true)}
      >
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <span className="text-white text-sm font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
            🔍 Click to view full image
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 max-w-4xl mx-auto">
          <span className="inline-block bg-[#f82f53] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {news.category}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            {news.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-1.5">
            <Calendar size={16} />
            <span>{news.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Tag size={16} />
            <span>{news.category}</span>
          </div>
        </div>

        {/* Article body */}
        <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#f82f53]">
          {news.content.split("\n").map((paragraph, idx) => (
            <p key={idx} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </article>

        {/* View Full Image Button */}
        <div className="mt-6">
          <button
            onClick={() => setShowLightbox(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium text-sm"
          >
            📷 View Full Image
          </button>
        </div>

        {/* Share / Back CTA */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-4 items-center justify-between">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#f82f53] text-[#f82f53] rounded-full hover:bg-[#f82f53] hover:text-white transition font-medium text-sm"
          >
            <ArrowLeft size={16} />
            All News & Notices
          </Link>
        </div>
      </section>

      {/* Image Lightbox */}
      {showLightbox && news && (
        <NewsImageLightbox
          image={news.image}
          title={news.title}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </>
  );
}