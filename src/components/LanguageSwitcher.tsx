"use client";

import {
	Box,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from "@mui/material";
import { GlobeIcon } from "@phosphor-icons/react/dist/ssr";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { createLocalizedPathname } from "@/lib/i18n";

const languages = [
	{ code: "en", name: "English", flag: "🇺🇸" },
	{ code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
];

export default function LanguageSwitcher() {
	const router = useRouter();
	const pathname = usePathname();
	const _params = useParams();
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
		const newPath = createLocalizedPathname(pathname, newLocale as any);
		router.push(newPath);
	};

	const currentLanguage =
		languages.find((lang) => lang.code === locale) || languages[0];

	return (
		<>
			<Tooltip title="Change Language">
				<IconButton onClick={handleClick} color="primary" sx={{ ml: 1 }}>
					<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
						<span style={{ fontSize: "1.2em" }}>{currentLanguage.flag}</span>
						<GlobeIcon size={20} />
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
						<span style={{ fontSize: "1.2em" }}>{language.flag}</span>
						<Typography variant="body2">{language.name}</Typography>
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
