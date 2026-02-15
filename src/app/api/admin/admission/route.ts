import { NextResponse } from 'next/server';
import Admission from '@/models/admission';
import { connectDB } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectDB();

    // If you want, add authentication here to secure admin API

    const admissions = await Admission.find().sort({ createdAt: -1 });
    return NextResponse.json(admissions, { status: 200 });
  } catch (error) {
    console.error('Admin GET admissions error:', error);
    return NextResponse.json({ error: 'Failed to fetch admissions' }, { status: 500 });
  }
}
