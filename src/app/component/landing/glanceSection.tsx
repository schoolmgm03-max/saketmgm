'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Library, Users, Medal, GraduationCap } from 'lucide-react';

const stats = [
  { icon: <Library size={40} className="text-[#f82f53]" />, value: 15, label: 'Years of Legacy', suffix: '+' },
  { icon: <Users size={40} className="text-[#f82f53]" />, value: 3000, label: 'Students Enrolled', suffix: '+' },
  { icon: <Medal size={40} className="text-[#f82f53]" />, value: 130, label: 'Qualified Faculty', suffix: '+' },
  { icon: <GraduationCap size={40} className="text-[#f82f53]" />, value: 30, label: 'Diverse Programs', suffix: '+' },
];

export default function GlanceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-100px' }); // triggers when the section is visible
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (inView) {
      const intervals = stats.map((item, index) => {
        const increment = Math.ceil(item.value / 100);
        return setInterval(() => {
          setCounts((prev) => {
            const newCounts = [...prev];
            if (newCounts[index] < item.value) {
              newCounts[index] = Math.min(newCounts[index] + increment, item.value);
            }
            return newCounts;
          });
        }, 20);
      });

      return () => intervals.forEach(clearInterval);
    } else {
      // Reset counts when section goes out of view
      setCounts(stats.map(() => 0));
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
          Our School at a Glance
        </h2>
        <p className="text-gray-500 mb-12">Key figures that define our journey of excellence</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-red-50 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900">
                {counts[index]}
                {item.suffix}
              </h3>
              <p className="text-gray-600 mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
