import { NextResponse } from "next/server";
import { News } from "@/models/news";
import { connectDB } from "@/lib/mongodb";

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
