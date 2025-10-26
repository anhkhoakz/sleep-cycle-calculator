import {
	Box,
	Container,
	Divider,
	Drawer,
	Fab,
	FormControlLabel,
	Grid,
	IconButton,
	Paper,
	Switch,
	Tooltip,
	Typography,
} from "@mui/material";
import {
	GearIcon,
	MoonIcon,
	SunIcon,
	TimerIcon,
} from "@phosphor-icons/react/dist/ssr";
import type React from "react";
import { useEffect, useState } from "react";
import CycleResults from "@/components/CycleResults";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import QuickReferenceTable from "@/components/QuickReferenceTable";
import SettingsPanel from "@/components/SettingsPanel";
import SleepInfoCard from "@/components/SleepInfoCard";
import TimeSelector from "@/components/TimeSelector";
import { useTranslation } from "@/hooks/useTranslation";
import {
	generateAllSleepOptions,
	loadPreferences,
	SLEEP_CONFIG,
	type SleepPreferences,
	savePreferences,
} from "@/utils/sleepCalculations";

const SleepCalculator: React.FC = () => {
	const { t } = useTranslation();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [wakeTime, setWakeTime] = useState<Date>(() => {
		// Default to 7:00 AM tomorrow
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		tomorrow.setHours(7, 0, 0, 0);
		return tomorrow;
	});
	const [fallAsleepBuffer, setFallAsleepBuffer] = useState(
		SLEEP_CONFIG.fallAsleepBuffer,
	);
	const [calculations, setCalculations] = useState(() =>
		generateAllSleepOptions(wakeTime, fallAsleepBuffer),
	);
	const [preferences, setPreferences] = useState<SleepPreferences>(
		loadPreferences(),
	);
	const [settingsOpen, setSettingsOpen] = useState(false);

	// Load preferences on mount
	useEffect(() => {
		const savedPreferences = loadPreferences();
		setPreferences(savedPreferences);
		setIsDarkMode(savedPreferences.isDarkMode);
		setWakeTime(new Date(savedPreferences.wakeTime));
		setFallAsleepBuffer(savedPreferences.fallAsleepBuffer);
	}, []);

	// Update calculations when wake time or buffer changes
	useEffect(() => {
		setCalculations(generateAllSleepOptions(wakeTime, fallAsleepBuffer));
	}, [wakeTime, fallAsleepBuffer]);

	// Save preferences when they change
	useEffect(() => {
		const newPreferences: SleepPreferences = {
			...preferences,
			wakeTime: wakeTime.toISOString(),
			fallAsleepBuffer,
			isDarkMode,
		};
		setPreferences(newPreferences);
		savePreferences(newPreferences);
	}, [wakeTime, fallAsleepBuffer, isDarkMode, preferences]);

	const handleDarkModeToggle = () => {
		setIsDarkMode(!isDarkMode);
	};

	const handlePreferencesChange = (newPreferences: SleepPreferences) => {
		setPreferences(newPreferences);
		setIsDarkMode(newPreferences.isDarkMode);
		setWakeTime(new Date(newPreferences.wakeTime));
		setFallAsleepBuffer(newPreferences.fallAsleepBuffer);
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				backgroundColor: "background.default",
				transition: "background-color 0.3s ease-in-out",
			}}
		>
			<Container maxWidth="lg" sx={{ py: 4 }}>
				{/* Header */}
				<Box sx={{ textAlign: "center", mb: 4 }}>
					<Typography
						variant="h1"
						component="h1"
						gutterBottom
						sx={{
							fontWeight: 700,
							background: "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
							backgroundClip: "text",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							mb: 2,
						}}
					>
						{t("common.title")}
					</Typography>
					<Typography
						variant="h6"
						component="p"
						color="text.secondary"
						paragraph
					>
						{t("common.subtitle")}
					</Typography>

					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							gap: 1,
						}}
					>
						<FormControlLabel
							control={
								<Switch
									checked={isDarkMode}
									onChange={handleDarkModeToggle}
									color="primary"
								/>
							}
							label={
								<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
									{isDarkMode ? <MoonIcon /> : <SunIcon />}
									<Typography variant="body2">
										{isDarkMode ? t("common.darkMode") : t("common.lightMode")}
									</Typography>
								</Box>
							}
						/>

						<Tooltip title={t("common.settings")}>
							<IconButton
								onClick={() => setSettingsOpen(true)}
								color="primary"
								sx={{ ml: 2 }}
							>
								<GearIcon />
							</IconButton>
						</Tooltip>

						<LanguageSwitcher />
					</Box>
				</Box>

				<Grid container spacing={3}>
					{/* Main Calculator */}
					<Grid size={{ xs: 12, lg: 8 }}>
						<Paper elevation={2} sx={{ p: 3, mb: 3 }}>
							<Typography
								variant="h2"
								component="h2"
								gutterBottom
								sx={{ display: "flex", alignItems: "center", gap: 1 }}
							>
								<MoonIcon weight="fill" size={22} color="primary" />
								{t("calculator.title")}
							</Typography>

							<TimeSelector
								wakeTime={wakeTime}
								onWakeTimeChange={setWakeTime}
								fallAsleepBuffer={fallAsleepBuffer}
								onFallAsleepBufferChange={setFallAsleepBuffer}
							/>

							<Divider sx={{ my: 3 }} />

							<CycleResults
								calculations={calculations}
								fallAsleepBuffer={fallAsleepBuffer}
							/>
						</Paper>

						{/* Educational Content */}
						<SleepInfoCard />
					</Grid>

					{/* Sidebar */}
					<Grid size={{ xs: 12, lg: 4 }}>
						<Box sx={{ position: "sticky", top: 24 }}>
							<QuickReferenceTable />

							<Paper elevation={2} sx={{ p: 3, mt: 3 }}>
								<Typography variant="h3" component="h3" gutterBottom>
									{t("common.howItWorks")}
								</Typography>
								<Typography variant="body2" color="text.secondary" paragraph>
									{t("info.cycleLength")}
								</Typography>
								<Typography variant="body2" color="text.secondary" paragraph>
									{t("info.calculation")}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									<strong>{t("common.proTip")}</strong> {t("info.wakeUpTip")}
								</Typography>
							</Paper>
						</Box>
					</Grid>
				</Grid>
			</Container>

			{/* Settings Drawer */}
			<Drawer
				anchor="right"
				open={settingsOpen}
				onClose={() => setSettingsOpen(false)}
				sx={{
					"& .MuiDrawer-paper": {
						width: { xs: "100%", sm: 400 },
					},
				}}
			>
				<SettingsPanel
					onPreferencesChange={handlePreferencesChange}
					onDarkModeToggle={handleDarkModeToggle}
					isDarkMode={isDarkMode}
				/>
			</Drawer>

			{/* PWA Install Prompt */}
			<PWAInstallPrompt />

			{/* Floating Action Button for quick access */}
			<Tooltip title="Scroll to calculator">
				<Fab
					color="primary"
					sx={{
						position: "fixed",
						bottom: 24,
						right: 24,
						background: "linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)",
					}}
					onClick={() => {
						const calculatorElement = document.querySelector(
							"[data-calculator-section]",
						);
						calculatorElement?.scrollIntoView({ behavior: "smooth" });
					}}
				>
					<TimerIcon />
				</Fab>
			</Tooltip>
		</Box>
	);
};

export default SleepCalculator;
