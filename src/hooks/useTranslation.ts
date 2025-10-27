"use client";

import { useMemo } from "react";

// Import English translation file
import enTranslations from "../../locales/en/common.json";

export function useTranslation() {
	const t = useMemo(() => {
		return (key: string, params?: Record<string, string | number>) => {
			const keys = key.split(".");
			let value: unknown = enTranslations;

			for (const k of keys) {
				value = (value as Record<string, unknown>)?.[k];
			}

			if (typeof value !== "string") {
				console.warn(`Translation missing for key: ${key}`);
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
	}, []);

	return { t, locale: "en" };
}
