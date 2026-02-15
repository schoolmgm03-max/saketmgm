// src/app/api/admin/gallery/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/galleryImage";
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

// -------------------- Cloudinary config --------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// -------------------- PUT: Update gallery image --------------------
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const newFile = formData.get("newFile") as File | null;

    if (!id) {
      return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
    }

    // 1. Find existing document
    const imageDoc = await Gallery.findById(id);
    if (!imageDoc) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // 2. Prepare update object
    const updateData: Partial<{
      title: string;
      description: string;
      category: string;
      imageUrl?: string;
      public_id?: string;
    }> = { title, description, category };

    // 3. If new file provided → delete old and upload new
    if (newFile) {
      // 3.1 Delete old image from Cloudinary
      if (imageDoc.public_id) {
        const deleteRes = await cloudinary.uploader.destroy(imageDoc.public_id);
        if (deleteRes.result !== "ok" && deleteRes.result !== "not found") {
          return NextResponse.json(
            { error: "Failed to delete old image from Cloudinary" },
            { status: 500 }
          );
        }
      }

      // 3.2 Upload new image
      const arrayBuffer = await newFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadRes = (await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "gallery" },
          (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (err) reject(err);
            else if (result) resolve(result);
            else reject(new Error("Unknown upload error"));
          }
        );
        stream.end(buffer);
      })) as UploadApiResponse;

      updateData.imageUrl = uploadRes.secure_url;
      updateData.public_id = uploadRes.public_id;
    }

    // 4. Update in MongoDB
    const updated = await Gallery.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating image:", error);
    return NextResponse.json(
      { error: "Failed to update image" },
      { status: 500 }
    );
  }
}
