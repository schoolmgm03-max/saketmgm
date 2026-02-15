'use client';

import Image from 'next/image';
import Link from 'next/link';

const facilities = [
  {
    title: 'Modern Science Labs',
    image:
      'https://res.cloudinary.com/dbgdrmqy6/image/upload/v1757573598/IMG-20240808-WA0031_ljezar.jpg',
    icon: '/lab-icon.png',
  },
  {
    title: 'Expansive Library',
    image: 'https://images.unsplash.com/photo-1538792636877-dcdcd4679371?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    icon: '/library-icon.png',
  },
  {
    title: 'State-of-the-Art Sports Complex',
    image: 'https://res.cloudinary.com/dbgdrmqy6/image/upload/v1757573703/20230516_071355_0_pufhxn.jpg',
    icon: '/sports-icon.png',
  },
];

export default function FacilitiesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Explore Our Facilities</h2>
        <p className="mt-4 text-lg text-gray-600">
          Providing a conducive environment for learning and growth
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
        {facilities.map((facility, index) => (
          <Link
            key={index}
            href="/facilities"
            className="relative rounded-xl overflow-hidden group hover:shadow-lg transition"
          >
            {/* Image */}
            <Image
              src={facility.image}
              alt={facility.title}
              width={600}
              height={400}
              className="w-full h-64 object-cover"
            />

            {/* Text over image (bottom-left) */}
            <div className="absolute bottom-4 left-4 text-left text-white">
              <h3 className="text-2xl font-bold text-white">{facility.title}</h3>
              <p className="mt-2 text-sm text-[#f82f53] font-semibold inline-block px-3 py-1 border border-[#f82f53] rounded-md hover:bg-[#f82f53] hover:text-white transition">
                Explore Facility
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
