import { NextResponse } from "next/server";
import GalleryImage from "@/models/galleryImage";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "9");

  const filter: Record<string, unknown> = {};
  if (category && category !== "All") {
    filter.category = category;
  }

  const images = await GalleryImage.find(filter).sort({ date: -1 }).limit(limit);

  return NextResponse.json(images);
}
