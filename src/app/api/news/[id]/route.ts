import { NextResponse } from "next/server";
import { News } from "@/models/news";
import { connectDB } from "@/lib/mongodb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await params;
    const newsItem = await News.findById(id);

    if (!newsItem) {
      return NextResponse.json(
        { message: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: newsItem });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch news", error },
      { status: 500 }
    );
  }
}