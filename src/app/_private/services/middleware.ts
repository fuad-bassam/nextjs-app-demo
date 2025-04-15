import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const response = NextResponse.next();
    // console.log("pathname", pathname)
    response.headers.set('x-pathname', pathname);
    return response;
}