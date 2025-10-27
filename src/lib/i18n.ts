// This is the default locale - only English is supported now
export const defaultLocale = "en";
export type Locale = "en";

export const locales = [defaultLocale] as const;

// Helper to get translations
export function getTranslation(key: string): string {
	const keys = key.split(".");
	const enTranslations = require("../../locales/en/common.json");
	
	let value: unknown = enTranslations;

	for (const k of keys) {
		value = (value as Record<string, unknown>)?.[k];
	}

	return typeof value === "string" ? value : key;
}
