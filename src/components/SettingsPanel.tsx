import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Divider,
	FormControlLabel,
	IconButton,
	Snackbar,
	Stack,
	Switch,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import {
	BellIcon,
	BellSlashIcon,
	DownloadIcon,
	GearIcon,
	MoonIcon,
	SunIcon,
	TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import type React from "react";
import { useEffect, useState } from "react";
import { notificationService } from "@/utils/notifications";
import type { SleepPreferences } from "@/utils/sleepCalculations";
import {
	clearAllData,
	DEFAULT_PREFERENCES,
	loadPreferences,
	savePreferences,
} from "@/utils/sleepCalculations";

interface SettingsPanelProps {
	onPreferencesChange: (preferences: SleepPreferences) => void;
	onDarkModeToggle: () => void;
	isDarkMode: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
	onPreferencesChange,
	onDarkModeToggle,
	isDarkMode,
}) => {
	const [preferences, setPreferences] =
		useState<SleepPreferences>(DEFAULT_PREFERENCES);
	const [notificationSettings, setNotificationSettings] = useState(
		notificationService.getSettings(),
	);
	const [showSnackbar, setShowSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [notificationPermission, setNotificationPermission] = useState(
		Notification.permission,
	);

	useEffect(() => {
		const savedPreferences = loadPreferences();
		setPreferences(savedPreferences);
		onPreferencesChange(savedPreferences);
	}, [onPreferencesChange]);

	const handlePreferenceChange = (
		key: keyof SleepPreferences,
		value: string | number | boolean,
	) => {
		const newPreferences = { ...preferences, [key]: value };
		setPreferences(newPreferences);
		savePreferences(newPreferences);
		onPreferencesChange(newPreferences);
	};

	const handleNotificationSettingChange = (
		key: string,
		value: string | number | boolean,
	) => {
		const newSettings = { ...notificationSettings, [key]: value };
		setNotificationSettings(newSettings);
		notificationService.updateSettings(newSettings);
	};

	const handleRequestNotificationPermission = async () => {
		const granted = await notificationService.requestPermission();
		setNotificationPermission(Notification.permission);

		if (granted) {
			setSnackbarMessage("Notification permission granted!");
			setShowSnackbar(true);
		} else {
			setSnackbarMessage("Notification permission denied");
			setShowSnackbar(true);
		}
	};

	const handleTestNotification = async () => {
		try {
			await notificationService.testNotification();
			setSnackbarMessage("Test notification sent!");
			setShowSnackbar(true);
		} catch (error) {
			console.error("Failed to send test notification:", error);
			setSnackbarMessage("Failed to send test notification");
			setShowSnackbar(true);
		}
	};

	const handleClearData = () => {
		if (
			window.confirm(
				"Are you sure you want to clear all saved data? This action cannot be undone.",
			)
		) {
			clearAllData();
			setPreferences(DEFAULT_PREFERENCES);
			onPreferencesChange(DEFAULT_PREFERENCES);
			setSnackbarMessage("All data cleared successfully");
			setShowSnackbar(true);
		}
	};

	const handleExportData = () => {
		const data = {
			preferences,
			notificationSettings,
			exportedAt: new Date().toISOString(),
		};

		const blob = new Blob([JSON.stringify(data, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.download = `sleep-calculator-backup-${new Date().toISOString().split("T")[0]}.json`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);

		setSnackbarMessage("Data exported successfully");
		setShowSnackbar(true);
	};

	return (
		<Card>
			<CardContent>
				<Typography
					variant="h6"
					gutterBottom
					sx={{ display: "flex", alignItems: "center", gap: 1 }}
				>
					<GearIcon color="primary" />
					Settings & Preferences
				</Typography>

				<Stack spacing={3}>
					{/* Theme Settings */}
					<Box>
						<Typography variant="subtitle1" gutterBottom>
							Appearance
						</Typography>
						<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
							<FormControlLabel
								control={
									<Switch
										checked={isDarkMode}
										onChange={onDarkModeToggle}
										color="primary"
									/>
								}
								label={
									<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
										{isDarkMode ? <MoonIcon /> : <SunIcon />}
										<Typography variant="body2">
											{isDarkMode ? "Dark Mode" : "Light Mode"}
										</Typography>
									</Box>
								}
							/>
						</Box>
					</Box>

					<Divider />

					{/* Sleep Preferences */}
					<Box>
						<Typography variant="subtitle1" gutterBottom>
							Sleep Preferences
						</Typography>
						<Stack spacing={2}>
							<TextField
								label="Default Wake Time"
								type="time"
								value={new Date(preferences.wakeTime)
									.toTimeString()
									.slice(0, 5)}
								onChange={(e) => {
									const [hours, minutes] = e.target.value
										.split(":")
										.map(Number);
									const newTime = new Date();
									newTime.setHours(hours, minutes, 0, 0);
									handlePreferenceChange("wakeTime", newTime.toISOString());
								}}
								fullWidth
								size="small"
							/>

							<TextField
								label="Fall Asleep Buffer (minutes)"
								type="number"
								value={preferences.fallAsleepBuffer}
								onChange={(e) =>
									handlePreferenceChange(
										"fallAsleepBuffer",
										parseInt(e.target.value, 10) || 15,
									)
								}
								fullWidth
								size="small"
								inputProps={{ min: 0, max: 60 }}
							/>

							<TextField
								label="Preferred Sleep Cycles"
								type="number"
								value={preferences.preferredCycles}
								onChange={(e) =>
									handlePreferenceChange(
										"preferredCycles",
										parseInt(e.target.value, 10) || 5,
									)
								}
								fullWidth
								size="small"
								inputProps={{ min: 4, max: 6 }}
							/>
						</Stack>
					</Box>

					<Divider />

					{/* Notification Settings */}
					<Box>
						<Typography variant="subtitle1" gutterBottom>
							Notifications
						</Typography>
						<Stack spacing={2}>
							<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
								<FormControlLabel
									control={
										<Switch
											checked={notificationSettings.enabled}
											onChange={(e) =>
												handleNotificationSettingChange(
													"enabled",
													e.target.checked,
												)
											}
											color="primary"
										/>
									}
									label={
										<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
											{notificationSettings.enabled ? (
												<BellIcon />
											) : (
												<BellSlashIcon />
											)}
											<Typography variant="body2">
												Enable Notifications
											</Typography>
										</Box>
									}
								/>
								{notificationPermission === "denied" && (
									<Chip label="Permission Denied" color="error" size="small" />
								)}
								{notificationPermission === "granted" && (
									<Chip
										label="Permission Granted"
										color="success"
										size="small"
									/>
								)}
							</Box>

							{notificationSettings.enabled && (
								<>
									<FormControlLabel
										control={
											<Switch
												checked={notificationSettings.bedtimeReminder}
												onChange={(e) =>
													handleNotificationSettingChange(
														"bedtimeReminder",
														e.target.checked,
													)
												}
												color="primary"
											/>
										}
										label="Bedtime Reminders"
									/>

									<FormControlLabel
										control={
											<Switch
												checked={notificationSettings.wakeUpReminder}
												onChange={(e) =>
													handleNotificationSettingChange(
														"wakeUpReminder",
														e.target.checked,
													)
												}
												color="primary"
											/>
										}
										label="Wake Up Reminders"
									/>

									<TextField
										label="Reminder Time (minutes before bedtime)"
										type="number"
										value={notificationSettings.reminderMinutes}
										onChange={(e) =>
											handleNotificationSettingChange(
												"reminderMinutes",
												parseInt(e.target.value, 10) || 30,
											)
										}
										fullWidth
										size="small"
										inputProps={{ min: 5, max: 120 }}
									/>

									<Box sx={{ display: "flex", gap: 1 }}>
										<Button
											variant="outlined"
											size="small"
											onClick={handleRequestNotificationPermission}
											disabled={notificationPermission === "granted"}
										>
											Request Permission
										</Button>
										<Button
											variant="outlined"
											size="small"
											onClick={handleTestNotification}
											disabled={!notificationService.isEnabled()}
										>
											Test Notification
										</Button>
									</Box>
								</>
							)}
						</Stack>
					</Box>

					<Divider />

					{/* Data Management */}
					<Box>
						<Typography variant="subtitle1" gutterBottom>
							Data Management
						</Typography>
						<Stack direction="row" spacing={1}>
							<Tooltip title="Export your settings and preferences">
								<IconButton onClick={handleExportData} color="primary">
									<DownloadIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title="Clear all saved data">
								<IconButton onClick={handleClearData} color="error">
									<TrashIcon />
								</IconButton>
							</Tooltip>
						</Stack>
					</Box>
				</Stack>

				<Snackbar
					open={showSnackbar}
					autoHideDuration={4000}
					onClose={() => setShowSnackbar(false)}
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				>
					<Alert onClose={() => setShowSnackbar(false)} severity="success">
						{snackbarMessage}
					</Alert>
				</Snackbar>
			</CardContent>
		</Card>
	);
};

export default SettingsPanel;
