import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Testimonial from "@/models/Testimonial"; // ✅ Add this line

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
