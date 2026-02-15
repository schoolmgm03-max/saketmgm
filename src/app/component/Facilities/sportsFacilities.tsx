"use client"

import Image from "next/image"

const sportsFacilities = [
  {
    title: "Cricket Field",
    description:
      "A full-sized, lush green cricket ground for training, inter-school matches, and physical education classes.",
    image:
      "https://res.cloudinary.com/dbgdrmqy6/image/upload/v1757572600/20230502_065920_zrgvjn.jpg",
  },
  {
    title: "Basketball Courts",
    description:
      "Multiple well-maintained outdoor and indoor basketball courts for practice and competitive games.",
    image:
      "https://res.cloudinary.com/dbgdrmqy6/image/upload/v1757572497/20230516_071355_0_2_mdmxqa.jpg",
  },
  {
    title: "Yoga compound",
    description:
      "A dedicated open-air and indoor space for yoga practice, promoting mindfulness, flexibility, and overall well-being.",
    image:
      "https://res.cloudinary.com/dbgdrmqy6/image/upload/v1757573373/20230620_074828_emohzp.jpg",
  },
  {
    title: "Student Playground",
    description:
      "The playground at Saket MGM Senior Secondary School is a vibrant space that promotes physical fitness, teamwork, and recreation. It provides students with opportunities to engage in sports, outdoor activities, and holistic development beyond the classroom.",
    image:
      "https://res.cloudinary.com/dbgdrmqy6/image/upload/v1757574146/comprase-image_1_abka09.jpg",
  },
  {
    title: "school swings & play area",
    description:
      "A safe and cheerful play area equipped with swings, slides, and recreational facilities, providing young students a joyful space for fun, relaxation, and social interaction.",
    image:
      "https://res.cloudinary.com/dbgdrmqy6/image/upload/v1757573645/20231219_103837_2_jziatf.jpg",
  },
  {
    title: "project & drawing",
    description:
      "A well-equipped project and drawing room that nurtures creativity, innovation, and artistic skills, providing students with space to express ideas through models, sketches, and creative artwork.",
    image:
      "https://res.cloudinary.com/dbgdrmqy6/image/upload/v1757573591/IMG-20240808-WA0023_hatkqw.jpg",
  },
]

export default function SportsFacilities() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold mb-2">Extensive Sports Facilities</h2>
      <p className="text-gray-600 max-w-3xl mx-auto mb-12">
        Promoting physical fitness and teamwork, our school offers a wide range
        of indoor and outdoor sports facilities for various athletic pursuits.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {sportsFacilities.map((facility, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden text-left transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative h-48 w-full group overflow-hidden">
              <Image
                src={facility.image}
                alt={facility.title}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">{facility.title}</h3>
              <p className="text-gray-700 text-sm">{facility.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
