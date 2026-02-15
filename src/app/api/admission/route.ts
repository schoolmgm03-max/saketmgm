import { NextResponse } from "next/server";
import Admission from "@/models/admission";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    // Simple validation
    if (!data.fullName || !data.dob || !data.gender || !data.className || !data.caste || !data.fatherName || !data.mobile || !data.address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const admission = await Admission.create(data);

    return NextResponse.json({ message: "Form submitted successfully", admission }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}
