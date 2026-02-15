import { NextResponse } from "next/server";
import { News } from "@/models/news";
import { connectDB } from "@/lib/mongodb";
import cloudinary from "cloudinary";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "3");
  const category = searchParams.get("category") || "All";

  const filter = category === "All" ? {} : { category };

  try {
    const total = await News.countDocuments(filter);
    const data = await News.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({ total, data });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch news", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    console.log("Full body received:", body);

    const { title, content, image, category, date, public_id } = body;

    // Validate all required fields
    if (!title || !content || !image || !category || !date || !public_id) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Save news to DB
    const newNews = await News.create({
      title,
      content,
      image,
      public_id,
      category,
      date,
    });

    return NextResponse.json(newNews, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating news" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "News ID is required" }, { status: 400 });
    }

    // 1️⃣ Find the news item to get Cloudinary public_id
    const newsItem = await News.findById(id);
    if (!newsItem) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    // 2️⃣ Delete image from Cloudinary (if exists)
    if (newsItem.public_id) {
      try {
        await cloudinary.v2.uploader.destroy(newsItem.public_id);
        console.log(`✅ Cloudinary image deleted: ${newsItem.public_id}`);
      } catch (error) {
        console.error("⚠️ Failed to delete image from Cloudinary:", error);
      }
    }

    // 3️⃣ Delete the news record from MongoDB
    await News.findByIdAndDelete(id);

    return NextResponse.json({ message: "✅ News deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Delete error:", error);
    return NextResponse.json({ message: "Delete failed", error }, { status: 500 });
  }
}
