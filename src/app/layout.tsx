import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sleep Cycle Calculator - Calculate Your Optimal Bedtime",
	description:
		"Calculate your optimal bedtime based on sleep cycles to wake up refreshed",
	manifest: "/manifest.json",
};

const RootLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<html lang="en" data-lt-installed="true">
			<head>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/favicon.ico" />
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body>
				{children}
				<SpeedInsights />
			</body>
		</html>
	);
};

export default RootLayout;

