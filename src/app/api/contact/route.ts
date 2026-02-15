import { connectDB } from "@/lib/mongodb";
import ContactModel from "@/models/contact";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message,phone} = body;

    // Basic validation
    if (!name || !email || !subject || !message ||!phone) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Save to database
    await ContactModel.create({ name, email, subject, message,phone });

    return NextResponse.json({ success: true, message: "Message stored successfully" });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
