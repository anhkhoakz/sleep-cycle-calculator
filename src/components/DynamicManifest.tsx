"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function DynamicManifest() {
	const params = useParams();

	useEffect(() => {
		const manifestLink = document.querySelector(
			'link[rel="manifest"]',
		) as HTMLLinkElement;
		if (manifestLink) {
			const locale = params.locale as string;
			const manifestPath =
				locale === "vi" ? "/manifest-vi.json" : "/manifest.json";
			manifestLink.href = manifestPath;
		}
	}, [params.locale]);

	return null;
}
