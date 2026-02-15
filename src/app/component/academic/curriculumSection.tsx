"use client";

import Image from "next/image";

export default function CurriculumSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Comprehensive Curriculum Structure
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our curriculum is meticulously designed to provide a holistic and progressive
            learning experience from foundational stages to advanced studies. We integrate
            national educational frameworks with innovative teaching practices to ensure
            academic rigor and relevance. Our approach encourages students to explore,
            question, and apply their knowledge in real-world contexts, fostering deep
            understanding and lifelong learning. Regular assessments and personalized
            feedback systems are in place to monitor student progress and provide targeted
            support, ensuring every student reaches their full potential.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <Image
            src="https://res.cloudinary.com/dbgdrmqy6/image/upload/v1757573713/20231019_113151_pjdhcy.jpg"
            alt="Students in a classroom"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
