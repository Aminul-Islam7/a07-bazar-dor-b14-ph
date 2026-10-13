import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { match } from 'path-to-regexp';

const authRoutes = ['/sign-in', '/sign-up'];

const protectedRoutes = ['/categories/*path/products/*path2'];

export async function proxy(request: NextRequest) {
	const { pathname, search } = request.nextUrl;

	const sessionData = await auth.api.getSession({
		headers: await headers(),
	});

	const isAuthenticated = Boolean(sessionData?.session || sessionData?.user);

	const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

	const isProtectedRoute = protectedRoutes.some(route => {
		const checkMatch = match(route, { decode: decodeURIComponent });
		return !!checkMatch(pathname);
	});

	// Signed-in users can't visit /sign-in or /sign-up
	if (isAuthenticated && isAuthRoute) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	// Unauthenticated users can't visit protected pages
	if (!isAuthenticated && isProtectedRoute) {
		const signInUrl = new URL('/sign-in', request.url);

		const fullCallbackUrl = `${pathname}${search}`;
		signInUrl.searchParams.set('callbackUrl', fullCallbackUrl);

		return NextResponse.redirect(signInUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/sign-in', '/sign-up', '/categories/:path*/products/:path*'],
};
