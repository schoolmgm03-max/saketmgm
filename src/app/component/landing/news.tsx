'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { NewsItem } from '../../../../types/news';

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        const json = await res.json();

        // Check if the data is an array or nested
        const newsData = Array.isArray(json) ? json : json.data;

        if (Array.isArray(newsData)) {
          setNews(newsData);
        } else {
          console.error('API returned an unexpected format:', json);
          setNews([]);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    fetchNews();
  }, []);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section className="py-16 bg-gray-50 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Latest News & Updates</h2>
        <p className="text-gray-500 mb-12">Stay informed with our recent announcements</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {news.slice(0, visibleCount).map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-left">
                <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                <a
                  href="#"
                  className="text-[#f82f53] text-sm font-medium mt-2 inline-block hover:underline"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < news.length && (
          <button
            onClick={handleSeeMore}
            className="mt-10 px-6 py-2 bg-[#f82f53] text-white rounded-full hover:bg-[#e12244] transition"
          >
            See More
          </button>
        )}
      </div>
    </section>
  );
}
