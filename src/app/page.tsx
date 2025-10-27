"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import DynamicManifest from "@/components/DynamicManifest";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import SleepCalculator from "@/components/SleepCalculator";
import { darkTheme, theme } from "@/theme/theme";
import { loadPreferences } from "@/utils/sleepCalculations";

export default function HomePage() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const savedPreferences = loadPreferences();
		setIsDarkMode(savedPreferences.isDarkMode);
	}, []);

	if (!mounted) {
		return null;
	}

	const currentTheme = isDarkMode ? darkTheme : theme;

	return (
		<ThemeProvider theme={currentTheme}>
			<CssBaseline />
			<ServiceWorkerRegistration />
			<DynamicManifest />
			<SleepCalculator />
		</ThemeProvider>
	);
}

