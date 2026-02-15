"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Image from "next/image";

// 👇 type for testimonial
interface Testimonial {
  _id: string;
  name: string;
  role: string;
  message: string;
  image: string;
}

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all testimonials
  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials", { cache: "no-store" }); // ✅ always fresh
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete testimonial
  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
      } else {
        console.error("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ✅ Show loader while fetching (fix hydration mismatch)
  if (loading) {
    return <p className="text-center text-gray-500">Loading testimonials...</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[#f82f53] mb-4">
        Manage Testimonials
      </h2>

      {testimonials.length === 0 ? (
        <p className="text-center text-gray-500">No testimonials found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white shadow rounded-lg p-4 border hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                {/* ✅ Next.js Image */}
                <Image
                  src={t.image}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>

              {/* ✅ Escaped quotes */}
              <p className="mt-3 text-gray-700 text-sm">
                &quot;{t.message}&quot;
              </p>

              <button
                onClick={() => deleteTestimonial(t._id)}
                className="mt-4 flex items-center gap-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
