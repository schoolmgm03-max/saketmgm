// src/app/api/admin/tc/route.ts
import { connectDB } from "@/lib/mongodb";
import TC from "@/models/tc";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

// -------------------- Cloudinary config --------------------
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -------------------- POST: Create TC --------------------
export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    const { studentName, studentClass,  admissionNumber, tcUrl, public_id } = data;

    if (!studentName || !studentClass  || !admissionNumber || !tcUrl || !public_id) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newTC = await TC.create({
      studentName,
      studentClass,
      admissionNumber,
      tcUrl,
      public_id,
    });

    return NextResponse.json({ message: "TC saved successfully", tc: newTC }, { status: 201 });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ error: "Failed to save TC" }, { status: 500 });
  }
}

// -------------------- GET: Fetch all TCs --------------------
export async function GET() {
  try {
    await connectDB();
    const allTCs = await TC.find({}).sort({ date: -1 }); // latest first
    return NextResponse.json(allTCs, { status: 200 });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: "Failed to fetch TCs" }, { status: 500 });
  }
}

// -------------------- DELETE: Remove TC --------------------
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "TC ID required" }, { status: 400 });

    const tc = await TC.findById(id);
    if (!tc) return NextResponse.json({ error: "TC not found" }, { status: 404 });

    // Delete image from Cloudinary first
    if (tc.tcUrl) {
      try {
        console.log("TC URL:", tc.tcUrl);

        const url = new URL(tc.tcUrl);
        // Extract everything after /upload/
        let publicId = url.pathname.split('/upload/')[1]; 
        if (!publicId) throw new Error("Invalid Cloudinary URL");

        // Remove version prefix (v123456...) if present
        publicId = publicId.replace(/^v\d+\//, "");
        // Remove file extension
        publicId = publicId.replace(/\.[^/.]+$/, "");

        console.log("Computed publicId for deletion:", publicId);

        const result = await cloudinary.v2.uploader.destroy(publicId);
        console.log("Cloudinary delete result:", result);

        if (result.result !== "ok") {
          return NextResponse.json({ error: "Failed to delete image from Cloudinary" }, { status: 500 });
        }

      } catch (err) {
        console.error("Failed to delete Cloudinary image:", err);
        return NextResponse.json({ error: "Failed to delete image from Cloudinary" }, { status: 500 });
      }
    }

    // Delete TC from MongoDB
    await TC.findByIdAndDelete(id);
    console.log("Deleted TC from MongoDB:", id);

    return NextResponse.json({ message: "TC deleted successfully" }, { status: 200 });

  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json({ error: "Failed to delete TC" }, { status: 500 });
  }
}
