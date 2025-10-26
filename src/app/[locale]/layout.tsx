import { locales } from "@/lib/i18n";

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	return (
		<html lang={params.locale}>
			<head>
				<link
					rel="manifest"
					href={`/manifest${params.locale === "vi" ? "-vi" : ""}.json`}
				/>
				<link rel="apple-touch-icon" href="/vite.svg" />
			</head>
			<body>{children}</body>
		</html>
	);
}
