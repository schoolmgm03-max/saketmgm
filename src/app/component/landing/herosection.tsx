'use client';

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 4000,
  fade: true,
  arrows: false,
  pauseOnHover: false,
};

interface HeroImage {
  _id: string;
  imageUrl: string;
  title: string;
  altText: string;
}

export default function HeroSection() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0); // ✅ track current slide
  const router = useRouter();

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch('/api/hero-images');
      const data = await res.json();
      setImages(data);
    };
    fetchImages();
  }, []);

  return (
    <section className="relative h-screen w-full text-white overflow-hidden">
      <Slider
        {...settings}
        className="h-full w-full"
        afterChange={(index) => setCurrentSlide(index)} // ✅ trigger on slide change
      >
        {images.map((img, i) => (
          <div key={img._id} className="relative h-screen w-full">
            <Image
              src={img.imageUrl}
              alt={`Slide ${i}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center">
              {/* Animated Heading */}
              <motion.h1
                key={`title-${currentSlide}`} // ✅ key changes per slide
                className="text-4xl md:text-6xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {img.title.split('').map((char, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Animated Paragraph */}
              <motion.p
                key={`para-${currentSlide}`} // ✅ key changes per slide
                className="text-lg md:text-xl mt-4 text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {img.altText.split('').map((char, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.01 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>

              {/* Button */}
              <Button
                onClick={() => router.push('/admissions')}
                className="mt-6 bg-[#f82f53] hover:bg-black text-white text-lg font-semibold px-6 py-3 rounded-md"
              >
                Admissions Open
              </Button>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
