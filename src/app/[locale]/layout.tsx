import { locales } from "@/lib/i18n";

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
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
			<body>{children}</body>
		</html>
	);
}
