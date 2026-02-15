// components/AcademicExcellence.tsx
export default function AcademicExcellence() {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center text-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/dbgdrmqy6/image/upload/v1757573625/IMG_20250415_073407934_g96qox.jpg"
          alt="Facilities Background"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
      </div>

      {/* Overlay Text */}
      <div className="relative z-10 px-4">
        <h2 className="text-4xl font-bold text-white mb-4">
          Our Academic Excellence
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-white">
          At Saket MGM, we foster intellectual curiosity and critical thinking,
          preparing students for a future of innovation and global citizenship.
        </p>
      </div>
    </section>
  );
}
