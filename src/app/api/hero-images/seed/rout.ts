import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import HeroImage from "@/models/HeroImage";

export async function GET() {
  try {
    await connectDB();

    // Dummy data
    const dummyImages = [
      { url: "https://source.unsplash.com/1600x600/?school,education", title: "Welcome to Saket MGM" },
      { url: "https://source.unsplash.com/1600x600/?students,classroom", title: "Empowering Education" },
      { url: "https://source.unsplash.com/1600x600/?learning,books", title: "Learn, Lead, Succeed" }
    ];

    await HeroImage.insertMany(dummyImages);

    return NextResponse.json({ message: "Hero images inserted successfully!" });
  } catch (error) {
    console.error("❌ Error inserting hero images:", error);
    return NextResponse.json({ error: "Failed to insert hero images" }, { status: 500 });
  }
}
