"use client";
interface VideoLightboxProps {
  url: string;
  title: string;
  onClose: () => void;
}

export default function VideoLightbox({ url, title, onClose }: VideoLightboxProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg max-w-4xl w-full p-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-2xl"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {/* Video Player */}
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={url}
            className="w-full h-[500px] rounded"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
