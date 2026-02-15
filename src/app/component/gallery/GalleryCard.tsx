import Image from "next/image";

interface Props {
  image: string;
  title: string;
  description: string;
  date: string; // ISO format like "2025-08-12T12:24:38.442Z"
  onClick: () => void;
}

export default function GalleryCard({
  image,
  title,
  description,
  date,
  onClick,
}: Props) {
  // Format date to "12 Aug 2025"
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative w-full h-60 overflow-hidden">
        <Image
          src={image || "/default-image.png"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Optional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        <p className="text-xs text-gray-400 mt-2">{formattedDate}</p>
      </div>

      {/* Bottom Border Animation */}
      <span className="absolute bottom-0 left-0 h-1 bg-pink-600 w-0 group-hover:w-full transition-all duration-300" />
    </div>
  );
}
