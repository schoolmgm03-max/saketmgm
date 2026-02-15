import Image from "next/image";

interface Props {
  image: string;
  title: string;
  onClose: () => void;
}

export default function Lightbox({ image, title, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative max-w-3xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl font-bold"
        >
          &times;
        </button>
        <Image src={image} alt={title} width={1200} height={800} className="rounded" />
      </div>
    </div>
  );
}
