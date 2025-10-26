// This is the list of supported locales
export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];

// This is the default locale
export const defaultLocale: Locale = "en";

// This function checks if the locale is supported
export function isValidLocale(locale: string): locale is Locale {
	return locales.includes(locale as Locale);
}

// This function gets the locale from the pathname
export function getLocaleFromPathname(pathname: string): Locale {
	const segments = pathname.split("/");
	const locale = segments[1];

	if (isValidLocale(locale)) {
		return locale;
	}

	return defaultLocale;
}

// This function creates a localized pathname
export function createLocalizedPathname(
	pathname: string,
	locale: Locale,
): string {
	const segments = pathname.split("/");

	// Remove existing locale if present
	if (isValidLocale(segments[1])) {
		segments.splice(1, 1);
	}

	// Add new locale
	if (locale !== defaultLocale) {
		segments.splice(1, 0, locale);
	}

	return segments.join("/") || "/";
}
