"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

interface GalleryImage {
  _id: string;
  imageUrl: string;
  title: string;
  category: string;
}

const GallerySection = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const translateX = useRef<number>(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setImages(data); // load all images
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    };
    fetchImages();
  }, []);

  // Auto-scroll using translateX
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || images.length === 0) return;

    const speed = 0.5; // adjust scroll speed

    const animate = () => {
      translateX.current -= speed;
      if (Math.abs(translateX.current) >= scrollContainer.scrollWidth / 2) {
        translateX.current = 0; // loop
      }
      scrollContainer.style.transform = `translateX(${translateX.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [images]);

  // Duplicate images for seamless scrolling
  const displayImages = images.concat(images);

  return (
    <section className="py-16 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          Campus Life Through Our Lens
        </h2>
        <p className="text-gray-600 mb-10 text-lg">
          A glimpse into the vibrant moments at Saket MGM
        </p>

        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-6 py-8"
            style={{ willChange: "transform" }}
          >
            {displayImages.map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 h-64 rounded-xl overflow-hidden shadow-lg relative cursor-pointer transition-transform duration-300"
              >
                <Image
                  src={img.imageUrl}
                  alt={img.title}
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="absolute bottom-4 left-4 text-white font-semibold text-lg pointer-events-none drop-shadow-lg">
                  {img.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link href="/gallery">
            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-900 font-semibold rounded-lg shadow hover:shadow-md transition">
              View All Photos
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
