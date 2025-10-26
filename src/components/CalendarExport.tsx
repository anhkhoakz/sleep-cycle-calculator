import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Snackbar,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import {
	CalendarBlankIcon,
	CalendarIcon,
	ClockIcon,
	DownloadIcon,
	ShareIcon,
} from "@phosphor-icons/react/dist/ssr";
import type React from "react";
import { useState } from "react";
import type { SleepCalculation } from "@/utils/sleepCalculations";
import { downloadCalendarFile, formatTime } from "@/utils/sleepCalculations";

interface CalendarExportProps {
	calculation: SleepCalculation;
}

const CalendarExport: React.FC<CalendarExportProps> = ({ calculation }) => {
	const [showDialog, setShowDialog] = useState(false);
	const [showSnackbar, setShowSnackbar] = useState(false);

	const handleDownload = () => {
		downloadCalendarFile(calculation);
		setShowSnackbar(true);
		setShowDialog(false);
	};

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: "Sleep Schedule",
					text: `My sleep schedule: Bedtime at ${formatTime(calculation.bedtime)}, Wake up at ${formatTime(calculation.wakeTime)}`,
					url: window.location.href,
				});
			} catch (error) {
				console.log("Error sharing:", error);
			}
		} else {
			// Fallback: copy to clipboard
			const text = `Sleep Schedule: Bedtime at ${formatTime(calculation.bedtime)}, Wake up at ${formatTime(calculation.wakeTime)}`;
			navigator.clipboard.writeText(text);
			setShowSnackbar(true);
		}
	};

	return (
		<>
			<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
				<Tooltip title="Export to Calendar">
					<IconButton onClick={() => setShowDialog(true)} color="primary">
						<CalendarIcon />
					</IconButton>
				</Tooltip>

				{"share" in navigator && (
					<Tooltip title="Share Schedule">
						<IconButton onClick={handleShare} color="secondary">
							<ShareIcon />
						</IconButton>
					</Tooltip>
				)}
			</Box>

			<Dialog
				open={showDialog}
				onClose={() => setShowDialog(false)}
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<CalendarIcon color="primary" />
					Export to Calendar
				</DialogTitle>

				<DialogContent>
					<Card variant="outlined" sx={{ mb: 2 }}>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Sleep Schedule Details
							</Typography>

							<Stack spacing={2}>
								<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
									<ClockIcon size={16} color="action" />
									<Typography variant="body2">
										<strong>Bedtime:</strong> {formatTime(calculation.bedtime)}
									</Typography>
								</Box>

								<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
									<CalendarBlankIcon size={16} color="action" />
									<Typography variant="body2">
										<strong>Wake Up:</strong> {formatTime(calculation.wakeTime)}
									</Typography>
								</Box>

								<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
									<Typography variant="body2">
										<strong>Sleep Cycles:</strong> {calculation.cycles}
									</Typography>
									<Chip
										label={`${calculation.totalHours.toFixed(1)}h`}
										size="small"
										color="primary"
										variant="outlined"
									/>
								</Box>

								<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
									<Typography variant="body2">
										<strong>Quality:</strong>
									</Typography>
									<Chip
										label={calculation.quality}
										size="small"
										color={
											calculation.quality === "optimal"
												? "success"
												: calculation.quality === "good"
													? "warning"
													: "error"
										}
										variant="outlined"
									/>
								</Box>
							</Stack>
						</CardContent>
					</Card>

					<Typography variant="body2" color="text.secondary">
						This will create a calendar event (.ics file) that you can import
						into your calendar app. The event will include your bedtime and
						wake-up time with sleep cycle information.
					</Typography>
				</DialogContent>

				<DialogActions>
					<Button onClick={() => setShowDialog(false)}>Cancel</Button>
					<Button
						onClick={handleDownload}
						variant="contained"
						startIcon={<DownloadIcon />}
					>
						Download Calendar File
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={showSnackbar}
				autoHideDuration={3000}
				onClose={() => setShowSnackbar(false)}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert onClose={() => setShowSnackbar(false)} severity="success">
					Calendar file downloaded successfully!
				</Alert>
			</Snackbar>
		</>
	);
};

export default CalendarExport;
