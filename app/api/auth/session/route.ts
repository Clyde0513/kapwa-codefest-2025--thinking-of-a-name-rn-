import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '../../../../lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { 
        authenticated: true,
        user: {
          email: session.email,
          name: session.name,
          isAdmin: session.isAdmin,
          expiresAt: session.expiresAt
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
