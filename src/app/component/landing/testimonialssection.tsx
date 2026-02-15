"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Testimonial } from "../../../../types/testimonial";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 3;
  const intervalTime = 5000; // 5 seconds

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        return res.json();
      })
      .then((data) => {
        setTestimonials(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        console.error("Failed to fetch testimonials", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Auto slide every intervalTime
  useEffect(() => {
    if (testimonials.length > itemsPerPage) {
      const interval = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % Math.ceil(testimonials.length / itemsPerPage));
      }, intervalTime);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  if (loading) return <p className="text-center py-10">Loading testimonials...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-600">
        Error loading testimonials: {error}
      </p>
    );
  if (testimonials.length === 0)
    return <p className="text-center py-10">No testimonials available.</p>;

  // Current page slice
  const startIndex = currentPage * itemsPerPage;
  const currentTestimonials = testimonials.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <section className="bg-gray-50 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          What Our Community Says
        </h2>
        <p className="text-gray-500 text-lg mb-10">
          Voices of students, parents, and alumni
        </p>

        <div className="relative h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="grid gap-6 md:grid-cols-3 absolute w-full"
            >
              {currentTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id || index}
                  className="bg-white rounded-xl shadow-md p-6 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                    className="rounded-full mx-auto mb-4 object-cover"
                  />
                  <p className="text-gray-600 italic mb-4">
                    &quot;{testimonial.message}&quot;
                  </p>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(testimonials.length / itemsPerPage) }).map(
            (_, i) => (
              <button
              type="button"
              aria-label={`Go to testimonials page ${i + 1}`}
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === currentPage ? "bg-gray-800" : "bg-gray-400"
                }`}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
