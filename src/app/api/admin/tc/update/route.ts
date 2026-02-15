// src/app/api/admin/tc/update/route.ts
import { connectDB } from "@/lib/mongodb";
import TC from "@/models/tc";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import { v2 as cloudinary } from "cloudinary";

// -------------------- Cloudinary config --------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -------------------- Disable Next.js body parser --------------------
export const config = { api: { bodyParser: false } };

// -------------------- PUT: Update TC --------------------
export async function PUT(req: Request) {
  try {
    await connectDB();
    console.log("Database connected");

    // -------------------- Get form data --------------------
    const formData = await req.formData();
    const tcId = formData.get("id")?.toString();
    const studentName = formData.get("studentName")?.toString() || "";
    const studentClass = formData.get("studentClass")?.toString() || "";
    const admissionNumber = formData.get("admissionNumber")?.toString() || "";
    const tcFile = formData.get("tcImage") as File | null;

    if (!tcId) {
      console.warn("No TC ID provided");
      return NextResponse.json({ error: "TC ID is required" }, { status: 400 });
    }

    // -------------------- Find TC --------------------
    const tc = await TC.findById(tcId);
    if (!tc) {
      console.warn("TC not found:", tcId);
      return NextResponse.json({ error: "TC not found" }, { status: 404 });
    }

    console.log("Editing TC:", tcId);

    // -------------------- Update text fields --------------------
    tc.studentName = studentName;
    tc.studentClass = studentClass;
    tc.admissionNumber = admissionNumber;

    // -------------------- Handle new image upload --------------------
    if (tcFile && tcFile.size > 0) {
      console.log("New image uploaded:", tcFile.name);

      // Delete old image from Cloudinary first
      if (tc.tcUrl) {
        try {
          const url = new URL(tc.tcUrl);
          const parts = url.pathname.split("/"); // ['', 'v123456789', 'folder/filename.jpg']
          const filenameWithExt = parts[parts.length - 1];
          const folder = parts.length > 2 ? parts[parts.length - 2] : "tc"; // default to "tc" folder
          const publicId = `${folder}/${filenameWithExt.split(".")[0]}`;

          console.log("Deleting old Cloudinary image:", publicId);
          const deleteResult = await cloudinary.uploader.destroy(publicId);
          console.log("Old image deletion result:", deleteResult);

          if (deleteResult.result !== "ok" && deleteResult.result !== "not found") {
            console.error("Old image deletion failed:", deleteResult);
            return NextResponse.json({ error: "Failed to delete old image from Cloudinary" }, { status: 500 });
          }
        } catch (err) {
          console.error("Error deleting old image:", err);
          return NextResponse.json({ error: "Failed to delete old image from Cloudinary" }, { status: 500 });
        }
      }

      // Save new file to OS temp directory
      const tempDir = os.tmpdir();
      const tempPath = path.join(tempDir, tcFile.name);
      const arrayBuffer = await tcFile.arrayBuffer();
      fs.writeFileSync(tempPath, Buffer.from(arrayBuffer));
      console.log("Saved temp file:", tempPath);

      // Upload new image to Cloudinary
      try {
        const uploadResult = await cloudinary.uploader.upload(tempPath, { folder: "tc" });
        tc.tcUrl = uploadResult.secure_url;
        console.log("Uploaded new image to Cloudinary:", uploadResult.secure_url);
      } catch (uploadErr) {
        console.error("Error uploading new image:", uploadErr);
        fs.unlinkSync(tempPath); // delete temp file
        return NextResponse.json({ error: "Failed to upload new image to Cloudinary" }, { status: 500 });
      }

      // Delete temp file
      fs.unlinkSync(tempPath);
      console.log("Deleted temp file:", tempPath);
    }

    // -------------------- Save TC --------------------
    await tc.save();
    console.log("TC updated successfully:", tc._id);

    return NextResponse.json(tc, { status: 200 });
  } catch (error) {
    console.error("PUT handler error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
