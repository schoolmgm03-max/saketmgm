// src/app/api/admin/newsletter/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Newsletter GET API working" });
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: "Newsletter POST API working", data: body });
}
