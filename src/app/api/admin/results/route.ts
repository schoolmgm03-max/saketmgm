import { connectDB } from "@/lib/mongodb";
import ExamResult from "@/models/ExamResult";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const results = await ExamResult.find({}).sort({ examClass: 1, sno: 1 });
    return NextResponse.json(results, { status: 200 });
  } catch (err) {
    console.error("GET results Error:", err);
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const { examClass, year, registered, passed, percentage, remarks, sno } = data;

    if (!examClass || !year || !registered || !passed || !percentage || sno === undefined) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newResult = await ExamResult.create({
      examClass,
      year,
      registered,
      passed,
      percentage,
      remarks,
      sno,
    });

    return NextResponse.json({ message: "Result saved successfully", result: newResult }, { status: 201 });
  } catch (err) {
    console.error("POST result Error:", err);
    return NextResponse.json({ error: "Failed to save result" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const { id, ...updateData } = data;

    if (!id) return NextResponse.json({ error: "Result ID required" }, { status: 400 });

    const updatedResult = await ExamResult.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updatedResult, { status: 200 });
  } catch (err) {
    console.error("PUT result Error:", err);
    return NextResponse.json({ error: "Failed to update result" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await ExamResult.findByIdAndDelete(id);
    return NextResponse.json({ message: "Result deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("DELETE result Error:", err);
    return NextResponse.json({ error: "Failed to delete result" }, { status: 500 });
  }
}
