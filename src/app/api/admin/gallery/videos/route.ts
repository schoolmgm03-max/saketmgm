import { NextRequest, NextResponse } from "next/server";
import Video from "@/models/galleryVideos";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

// ================================
// 📌 GET: Get all videos
// ================================
export async function GET() {
  await connectDB();
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: videos });
  } catch (error) {
    console.error("❌ GET videos error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

// ================================
// 📌 POST: Add new video
// ================================
export async function POST(req: NextRequest) {
  console.log("📩 API Hit: /api/admin/gallery/videos [POST]");

  try {
    await connectDB();
    console.log("✅ Database connected successfully");

    const body: {
      url?: string;
      title?: string;
      description?: string;
      category?: string;
      duration?: number | null;
    } = await req.json();

    const { url, title, description, category, duration } = body;

    // Validation
    if (!url || !title) {
      return NextResponse.json(
        { success: false, error: "URL and Title are required" },
        { status: 400 }
      );
    }

    // Create and save video
    const newVideo = new Video({
      url,
      title,
      description: description || "",
      category: category || "Uncategorized",
      duration: duration ?? null,
    });

    const savedVideo = await newVideo.save();
    console.log("✅ Video Saved:", savedVideo);

    return NextResponse.json({ success: true, data: savedVideo }, { status: 201 });
  } catch (error) {
    console.error("❌ Error adding video:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add video" },
      { status: 500 }
    );
  }
}

// ================================
// 📌 DELETE: Delete a video by ID
// ================================
export async function DELETE(req: NextRequest) {
  await connectDB();

  try {
    const body: { id?: string } = await req.json();
    const { id } = body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid or missing ID" }, { status: 400 });
    }

    const deleted = await Video.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "✅ Video deleted successfully" });
  } catch (error) {
    console.error("❌ Delete error:", error);
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
  }
}

// ================================
// 📌 PUT: Update a video by ID
// ================================
export async function PUT(req: NextRequest) {
  await connectDB();
  try {
    const body: {
      id?: string;
      url?: string;
      title?: string;
      description?: string;
      category?: string;
      duration?: number | null;
    } = await req.json();

    const { id, url, title, description, category, duration } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Video ID is required" },
        { status: 400 }
      );
    }

    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      { url, title, description, category, duration },
      { new: true }
    );

    if (!updatedVideo) {
      return NextResponse.json(
        { success: false, error: "Video not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedVideo });
  } catch (error) {
    console.error("❌ Update video error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update video" },
      { status: 500 }
    );
  }
}
