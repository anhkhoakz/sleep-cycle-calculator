import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { locales } from "@/lib/i18n";

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const isVietnamese = locale === "vi";

	return {
		title: isVietnamese
			? "Máy Tính Chu Kỳ Giấc Ngủ"
			: "Sleep Cycle Calculator - Calculate Your Optimal Bedtime",
		description: isVietnamese
			? "Tính toán giờ ngủ tối ưu dựa trên chu kỳ giấc ngủ để thức dậy sảng khoái"
			: "Calculate your optimal bedtime based on sleep cycles to wake up refreshed",
		manifest: `/manifest${locale === "vi" ? "-vi" : ""}.json`,
	};
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return (
		<html lang={locale}>
			<head>
				<link
					rel="manifest"
					href={`/manifest${locale === "vi" ? "-vi" : ""}.json`}
				/>
				<link rel="apple-touch-icon" href="/vite.svg" />
			</head>
			<body>
				{children}
				<SpeedInsights />
			</body>
		</html>
	);
}
