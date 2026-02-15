import { connectDB } from "@/lib/mongodb";
import BookList from "@/models/BookList";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// GET: Fetch current book list
export async function GET() {
  try {
    await connectDB();
    const bookList = await BookList.findOne().sort({ date: -1 });
    return NextResponse.json(bookList, { status: 200 });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: "Failed to fetch Book List" }, { status: 500 });
  }
}

// POST: Create or Update Book List
export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const { url, public_id } = data;

    if (!url || !public_id) {
      return NextResponse.json({ error: "URL and public_id are required" }, { status: 400 });
    }

    // Since we only want one book list, we can either update or create.
    // Let's create a new one every time and the GET will pick the latest.
    // Or we could delete old ones. For now, let's just keep the latest.
    
    const newBookList = await BookList.create({
      url,
      public_id,
      date: new Date(),
    });

    return NextResponse.json({ message: "Book List saved successfully", bookList: newBookList }, { status: 201 });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ error: "Failed to save Book List" }, { status: 500 });
  }
}

// DELETE: Remove Book List
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const bookList = await BookList.findById(id);
    if (!bookList) return NextResponse.json({ error: "Book List not found" }, { status: 404 });

    // Delete from Cloudinary
    if (bookList.public_id) {
        await cloudinary.uploader.destroy(bookList.public_id);
    }

    await BookList.findByIdAndDelete(id);
    return NextResponse.json({ message: "Book List deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json({ error: "Failed to delete Book List" }, { status: 500 });
  }
}
