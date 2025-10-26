import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, isValidLocale, locales } from "./src/lib/i18n";

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// Check if there is any supported locale in the pathname
	const pathnameIsMissingLocale = locales.every(
		(locale) =>
			!pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
	);

	// Redirect if there is no locale
	if (pathnameIsMissingLocale) {
		// Get locale from Accept-Language header or use default
		const locale = getLocaleFromRequest(request) || defaultLocale;

		// Redirect to the localized path
		const newUrl = new URL(`/${locale}${pathname}`, request.url);
		return NextResponse.redirect(newUrl);
	}
}

function getLocaleFromRequest(request: NextRequest): string | null {
	const acceptLanguage = request.headers.get("accept-language");

	if (!acceptLanguage) {
		return null;
	}

	// Parse Accept-Language header
	const languages = acceptLanguage
		.split(",")
		.map((lang) => {
			const [locale, qValue] = lang.trim().split(";q=");
			return {
				locale: locale.split("-")[0], // Extract language code (e.g., 'vi' from 'vi-VN')
				quality: qValue ? parseFloat(qValue) : 1.0,
			};
		})
		.sort((a, b) => b.quality - a.quality);

	// Find the first supported locale
	for (const { locale } of languages) {
		if (isValidLocale(locale)) {
			return locale;
		}
	}

	return null;
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		"/((?!_next|api|favicon.ico|sw.js|manifest.json|manifest-vi.json|vite.svg).*)",
	],
};
