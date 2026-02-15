import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // ✅ named import
import HeroImage from "@/models/HeroImage";

export async function GET() {
  try {
    await connectDB();
    const images = await HeroImage.find();
    return NextResponse.json(images);
  } catch (error) {
    console.error("❌ Error fetching hero images:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
