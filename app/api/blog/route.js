// http://localhost:3000/api/blog

import Blog from '@/models/Blog';
import { connectDB } from '@/lib/db';
import { NextResponse } from 'next/server';
import { verifyJWTtoken } from '@/lib/jwt';

export async function POST(req) {
  await connectDB();

  const accessToken = req.headers.get('authorization');
  const token = accessToken.split(' ')[1];
  const decodedToken = verifyJWTtoken(token);

  if (!accessToken || !decodedToken) {
    return new Response(JSON.stringify({ error: 'unauthorized wrong token' }), {
      status: 403,
    });
  }
  try {
    const body = await req.json();
    const newBlog = await Blog.create(body);

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Post Error' });
  }
}
