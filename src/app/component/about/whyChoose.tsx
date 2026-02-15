"use client";
import Image from "next/image";

const features = [
  {
    title: "Expert Teachers",
    description:
      "Rapidusly unleash exceptional partnerships with authoritative expertise. Efficiently engineer academic excellence.",
    image: "https://res.cloudinary.com/dbgdrmqy6/image/upload/v1757573608/IMG_3430_drwfqc.jpg",
  },
  {
    title: "Multimedia Class",
    description:
      "Inspire learning through state-of-the-art multimedia tools and interactive teaching methods.",
    image: "https://res.cloudinary.com/dbgdrmqy6/image/upload/v1757573648/20231125_103609_1_t3azqm.jpg",
  },
  {
    title: "Music And Art Class",
    description:
      "Foster creativity with dedicated music and art programs led by passionate instructors.",
    image: "https://images.unsplash.com/photo-1653063051332-8e123e5113a1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900">
          Why Choose Saket MGM School
        </h2>
        <p className="text-lg text-gray-600 mt-2 mb-12">
          Saket MGM Senior Secondary School, Vidisha
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
