"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";

// Import translation files
import enTranslations from "../../locales/en/common.json";
import viTranslations from "../../locales/vi/common.json";

const translations = {
	en: enTranslations,
	vi: viTranslations,
};

export function useTranslation() {
	const params = useParams();
	const locale = (params.locale as string) || "en";

	const t = useMemo(() => {
		return (key: string, params?: Record<string, string | number>) => {
			const keys = key.split(".");
			let value: unknown = translations[locale as keyof typeof translations];

			for (const k of keys) {
				value = (value as Record<string, unknown>)?.[k];
			}

			if (typeof value !== "string") {
				console.warn(
					`Translation missing for key: ${key} in locale: ${locale}`,
				);
				return key;
			}

			// Replace parameters if provided
			if (params) {
				return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
					return params[paramKey]?.toString() || match;
				});
			}

			return value;
		};
	}, [locale]);

	return { t, locale };
}

// Helper function to get nested translation
export function getTranslation(locale: string, key: string): string {
	const keys = key.split(".");
	let value: unknown = translations[locale as keyof typeof translations];

	for (const k of keys) {
		value = (value as Record<string, unknown>)?.[k];
	}

	return typeof value === "string" ? value : key;
}
