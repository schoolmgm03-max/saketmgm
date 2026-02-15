import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { v2 as cloudinary } from "cloudinary";
// Get all testimonials
export async function GET() {
  await connectDB();
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  return NextResponse.json(testimonials);
}

// Add testimonial (after Cloudinary upload)
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const testimonial = await Testimonial.create(body);

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Error saving testimonial:", error);
    return NextResponse.json({ error: "Failed to save testimonial" }, { status: 500 });
  }
}




// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// ✅ Extract public_id from Cloudinary URL
function extractPublicId(url: string): string {
  const cleanUrl = url.split("?")[0]; // remove query params
  const parts = cleanUrl.split("/");
  const fileWithExt = parts.pop()!; // e.g. "abc123.jpg"
  const publicId = fileWithExt.replace(/\.[^/.]+$/, ""); // remove extension

  // remove version folder if present (e.g. "v1699999999")
  const folderParts = parts.slice(parts.indexOf("upload") + 1);
  if (folderParts[0]?.startsWith("v")) folderParts.shift();

  const folder = folderParts.join("/");
  return folder ? `${folder}/${publicId}` : publicId;
}

// ✅ DELETE testimonial (DB + Cloudinary)
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Testimonial ID required" },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return NextResponse.json(
        { message: "Testimonial not found" },
        { status: 404 }
      );
    }

    // ✅ Cloudinary delete
    try {
      const publicId = testimonial.imagePublicId
        ? testimonial.imagePublicId
        : extractPublicId(testimonial.image);

      console.log("🗑️ Deleting from Cloudinary →", publicId);

      const result = await cloudinary.uploader.destroy(publicId);
      console.log("✅ Cloudinary delete result:", result);
    } catch (err) {
      console.error("❌ Cloudinary delete failed:", err);
    }

    // ✅ MongoDB delete
    await Testimonial.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting testimonial:", error);
    return NextResponse.json(
      { message: "Error deleting testimonial", error },
      { status: 500 }
    );
  }
}
