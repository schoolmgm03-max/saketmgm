"use client"

import Image from "next/image"

export default function LabsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold mb-2">Modern Labs & Advanced Technology</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Our cutting-edge laboratories and computer facilities provide hands-on learning experiences and equip students with essential skills for the future.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Science Labs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden text-left">
          <div className="relative h-80 w-full">
            <Image
              src="https://images.unsplash.com/photo-1602052577122-f73b9710adba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Your uploaded image path
              alt="Science Laboratories"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2">Science Laboratories</h3>
            <p className="text-gray-700 text-sm">
              Fully equipped physics, chemistry, and biology labs designed for practical experimentation and scientific discovery. We encourage inquiry-based learning.
            </p>
          </div>
        </div>

        {/* Computer Labs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden text-left">
          <div className="relative h-80 w-full">
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80"
              alt="Computer Labs"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2">Computer Labs</h3>
            <p className="text-gray-700 text-sm">
              High-speed internet access and state-of-the-art computers for advanced IT education, programming, and digital literacy. Equipped with the latest software.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
