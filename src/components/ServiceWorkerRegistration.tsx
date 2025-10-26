"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
	useEffect(() => {
		if (typeof window !== "undefined" && "serviceWorker" in navigator) {
			window.addEventListener("load", () => {
				navigator.serviceWorker
					.register("/sw.js")
					.then(() => {
						// SW registered successfully
					})
					.catch((registrationError) => {
						console.error("SW registration failed: ", registrationError);
					});
			});
		}
	}, []);

	return null;
}
