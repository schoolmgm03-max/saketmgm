"use client";
interface VideoCardProps {
  url: string;
  title: string;
  description: string;
  date: string;
  onClick: () => void;
}

export default function VideoCard({
  url,
  title,
  description,
  date,
  onClick,
}: VideoCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
    >
      {/* Thumbnail */}
      <iframe
        src={url}
        className="w-full h-48"
        allowFullScreen
      ></iframe>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <p className="text-xs text-gray-400 mt-2">
          {new Date(date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
