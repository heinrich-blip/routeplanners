// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Generate a nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  
  // Store nonce in header to be accessed in layout
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Only run middleware on app routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}