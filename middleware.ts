import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	// No locale routing needed, just return the response
	return NextResponse.next();
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		"/((?!_next|api|favicon.ico|sw.js|manifest.json|manifest-vi.json|vite.svg).*)",
	],
};
