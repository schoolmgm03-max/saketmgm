// src/app/api/upload/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/galleryImage";
import cloudinary from "cloudinary";
export async function POST(req: Request) {
  try {
    await connectDB();

    const imagesData = await req.json(); // expecting array of images metadata

    if (!Array.isArray(imagesData) || imagesData.length === 0) {
      return NextResponse.json({ error: "No images data provided" }, { status: 400 });
    }

    // Validate required fields for each image here if needed

    // Insert multiple documents at once
    await Gallery.insertMany(imagesData);

    return NextResponse.json({ message: "Images saved successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save images" },
      { status: 500 }
    );
  }
} 
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  try {
    await connectDB();
    const images = await Gallery.find().sort({ date: -1 });
    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch images" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { public_id } = await req.json();
    console.log(public_id)
    if (!public_id) {
      return NextResponse.json({ error: "public_id is required" }, { status: 400 });
    }

    // Delete from Cloudinary
    const cloudRes = await cloudinary.v2.uploader.destroy(public_id);

    if (cloudRes.result !== "ok" && cloudRes.result !== "not found") {
      return NextResponse.json({ error: "Failed to delete image from Cloudinary" }, { status: 500 });
    }

    // Delete from MongoDB
    const deleted = await Gallery.findOneAndDelete({ public_id });

    if (!deleted) {
      return NextResponse.json({ error: "Image not found in database" }, { status: 404 });
    }

    return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete image" },
      { status: 500 }
    );
  }
}
