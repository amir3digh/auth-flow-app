import { NextRequest, NextResponse } from 'next/server';
import { createOrGetUser, generateToken } from '@/lib/auth';
import { loginSchema } from '@/lib/schemas';
import * as z from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone } = loginSchema.parse(body);

    // Create or get user
    const user = await createOrGetUser(phone);
    
    // Generate token
    const token = await generateToken(phone);

    // Set HTTP-only cookie
    const response = NextResponse.json({ 
      success: true, 
      user: {
        name: user.name,
        email: user.email,
        picture: user.picture,
        phone: user.phone,
        location: user.location,
        dob: user.dob,
        registered: user.registered,
        nat: user.nat
      }
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0].message },
        { status: 400 }
      );
    }
    
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 