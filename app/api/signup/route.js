// http://localhost:3000/api/signup

import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcrypt';

import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const isExisted = await User.findOne({ email });

    if (isExisted) {
      return NextResponse.json({ ErrorMessage: 'User Already exist!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
