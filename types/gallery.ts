// src/types/gallery.ts

export interface GalleryUploadRequest {
  title: string;
  category: string;
  description?: string;
  image: File;
}

export interface GalleryImage {
  _id: string;
  title: string;
  category: string;
  description?: string;
  imageUrl: string;
  date: string; // ISO string agar API se aa raha hai
}
