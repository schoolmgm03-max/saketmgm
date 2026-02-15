"use client"

import { useEffect, useState } from "react"
import { NewsItem } from "../../../../types/news"

const categories = ["All", "Events", "Announcements", "Academics", "General"]
const limit = 3

export default function NoticeBoard() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [category, setCategory] = useState("All")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    fetch(`/api/news?page=${page}&limit=${limit}&category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        const fetchedNews = Array.isArray(data?.data) ? data.data : []
        const fetchedTotal = typeof data?.total === "number" ? data.total : 0

        setNews(fetchedNews)
        setTotal(fetchedTotal)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch news:", err)
        setNews([])
        setTotal(0)
        setLoading(false)
      })
  }, [page, category])

  const maxPage = Math.ceil(total / limit)

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 my-6">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => {
              setCategory(cat)
              setPage(1)
            }}
            className={`px-4 py-2 rounded-full border ${
              category === cat ? "bg-red-500 text-white" : "bg-white text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Cards */}
      {loading ? (
        <p className="text-center py-10 text-gray-600">Loading...</p>
      ) : news.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <span className="text-gray-500 text-sm">{item.date}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">
                  {item.content && item.content.length > 100
                    ? item.content.slice(0, 100) + "..."
                    : item.content || ""}
                </p>
                {item.content && item.content.length > 100 && (
                  <a
                    href="#"
                    className="text-red-500 font-semibold mt-2 inline-block"
                  >
                    Read More
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-10 text-gray-600">No news found.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 my-6">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={page >= maxPage}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  )
}
