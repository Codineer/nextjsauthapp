import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup' || path === "/verifyemail" || path === "/forgotpassword"
    const token = request.cookies.get('token')?.value || ""

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/home', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/profile", "/profile/:path*", "/login", "/signup", "/verifyemail", "/forgotpassword", "/home/:path*", "/changepassword"],
}