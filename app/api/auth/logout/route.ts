import { NextRequest, NextResponse } from 'next/server';
import { clearAdminSession } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    // Clear the admin session
    await clearAdminSession();

    return NextResponse.json(
      { 
        success: true, 
        message: 'Logged out successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Logout error:', error);
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
