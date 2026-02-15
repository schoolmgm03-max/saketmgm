// app/api/admin/contacts/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Contact from "@/models/contact";

export async function GET() {
  try {
    // DB connect
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    // Fetch all contacts (latest first)
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}