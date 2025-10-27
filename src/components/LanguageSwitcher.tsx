"use client";

import {
	Box,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { createLocalizedPathname, type Locale } from "@/lib/i18n";

const languages = [
	{
		code: "en",
		name: "English",
		flag: "https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@gh-pages/flags/gb.svg",
	},
	{
		code: "vi",
		name: "Tiếng Việt",
		flag: "https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@gh-pages/flags/vn.svg",
	},
];

export default function LanguageSwitcher() {
	const router = useRouter();
	const pathname = usePathname();
	const { locale } = useTranslation();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLanguageChange = (newLocale: string) => {
		handleClose();
		const newPath = createLocalizedPathname(pathname, newLocale as Locale);
		router.push(newPath);
	};

	const currentLanguage =
		languages.find((lang) => lang.code === locale) || languages[0];

	return (
		<>
			<Tooltip title="Change Language">
				<IconButton onClick={handleClick} color="primary" sx={{ ml: 1 }}>
					<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
						<Image
							src={currentLanguage.flag}
							alt={currentLanguage.name}
							width={20}
							height={20}
						/>
					</Box>
				</IconButton>
			</Tooltip>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				{languages.map((language) => (
					<MenuItem
						key={language.code}
						onClick={() => handleLanguageChange(language.code)}
						selected={language.code === locale}
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1,
							minWidth: 120,
						}}
					>
						<Image
							src={language.flag}
							alt={language.name}
							width={20}
							height={20}
						/>
						<Typography variant="body2">{language.name}</Typography>
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
