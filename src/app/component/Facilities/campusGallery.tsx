"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface GalleryItem {
  id: number
  imageUrl: string
  category: string
  title?: string
}

export default function CampusGallery() {
  const [images, setImages] = useState<GalleryItem[]>([])

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery") // Replace with actual API endpoint
        const data: GalleryItem[] = await res.json()
        const filtered = data.filter((item) => item.category === "facility")
        setImages(filtered)
      } catch (error) {
        console.error("Failed to load gallery images:", error)
      }
    }

    fetchGallery()
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Campus Tour: A Visual Journey</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Explore our beautiful school campus through a collection of photos showcasing the vibrant learning environment and serene surroundings.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((item) => (
          <div key={item.id} className="rounded-xl overflow-hidden shadow-sm hover:scale-105 transition-transform">
            <div className="relative w-full aspect-square">
              <Image
                src={item.imageUrl}
                alt={item.title || "Campus Facility"}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
