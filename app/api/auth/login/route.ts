import { NextRequest, NextResponse } from 'next/server';
import { validateLogin, createAdminSession, isAuthorizedEmail } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if email is authorized
    if (!isAuthorizedEmail(email)) {
      return NextResponse.json(
        { error: 'Access denied. This email is not authorized for admin access.' },
        { status: 403 }
      );
    }

    // Validate credentials
    const { valid, name } = validateLogin(email, password);
    
    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session
    await createAdminSession(email, name || 'Admin');

    return NextResponse.json(
      { 
        success: true, 
        message: 'Login successful',
        user: {
          email,
          name: name || 'Admin',
          isAdmin: true
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
