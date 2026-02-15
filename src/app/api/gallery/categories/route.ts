import { NextResponse } from "next/server";
import GalleryImage from "@/models/galleryImage";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();
  const categories = await GalleryImage.distinct("category");
  return NextResponse.json({ data: categories });
}
