"use client";

export default function FacilitiesHero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <img
        src="https://res.cloudinary.com/dbgdrmqy6/image/upload/v1757573758/20250126_103223_0_1_f2nre3.jpg"
        alt="Facilities Background"
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl">
          Explore Our State-of-the-Art Facilities
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-medium max-w-xl">
          Saket MGM Senior Secondary School is committed to providing a
          conducive learning environment, equipped with modern infrastructure
          and amenities to foster holistic development.
        </p>
      </div>
    </section>
  );
}
