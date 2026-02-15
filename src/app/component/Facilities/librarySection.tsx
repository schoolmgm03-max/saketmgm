"use client"

import Image from "next/image"

export default function LibrarySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-2">Inspiring Library & Reading Zones</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Our extensive library is a hub of knowledge, offering a vast collection of books, digital resources, and quiet spaces for research and contemplative reading.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Resource-Rich Library */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden text-left">
          <div className="relative h-80 w-full">
            <Image
              src="https://images.unsplash.com/photo-1485322551133-3a4c27a9d925?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Uploaded library image
              alt="Resource-Rich Library"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2">Resource-Rich Library</h3>
            <p className="text-gray-700 text-sm">
              A comprehensive collection of academic texts, fiction, reference materials, and periodicals. Designed to support curriculum and foster a love for reading.
            </p>
          </div>
        </div>

        {/* Dedicated Reading Zones */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden text-left">
          <div className="relative h-80 w-full">
            <Image
              src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1470&q=80"
              alt="Dedicated Reading Zones"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2">Dedicated Reading Zones</h3>
            <p className="text-gray-700 text-sm">
              Comfortable and quiet reading nooks, group study areas, and access to online databases for in-depth research and collaborative learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
