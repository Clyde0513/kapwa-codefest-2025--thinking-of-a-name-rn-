import { NextRequest, NextResponse } from 'next/server';
import { getAdminSessionFromRequest } from './lib/auth';

export function middleware(request: NextRequest) {
  // Temporarily disable middleware to test login redirect
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Empty matcher - middleware disabled for testing
  ],
};
