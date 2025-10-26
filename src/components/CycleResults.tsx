import {
	Box,
	Card,
	CardContent,
	Chip,
	Divider,
	Fade,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import {
	CheckCircleIcon,
	ClockIcon,
	CopyIcon,
	InfoIcon,
	TimerIcon,
	WarningIcon,
} from "@phosphor-icons/react/dist/ssr";
import React from "react";
import type { SleepCalculation } from "@/utils/sleepCalculations";
import {
	formatTime,
	getSleepQualityColor,
	getSleepQualityText,
} from "@/utils/sleepCalculations";
import CalendarExport from "./CalendarExport";

interface CycleResultsProps {
	calculations: SleepCalculation[];
	fallAsleepBuffer: number;
}

const CycleResults: React.FC<CycleResultsProps> = ({
	calculations,
	fallAsleepBuffer,
}) => {
	const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

	const handleCopyTime = async (time: Date, index: number) => {
		try {
			await navigator.clipboard.writeText(formatTime(time));
			setCopiedIndex(index);
			setTimeout(() => setCopiedIndex(null), 2000);
		} catch (err) {
			console.error("Failed to copy time:", err);
		}
	};

	const getQualityIcon = (quality: "optimal" | "good" | "minimal") => {
		switch (quality) {
			case "optimal":
				return <CheckCircleIcon color="green" weight="fill" size={20} />;
			case "good":
				return <WarningIcon color="orange" weight="fill" size={20} />;
			case "minimal":
				return <InfoIcon color="red" weight="fill" size={20} />;
			default:
				return <InfoIcon color="gray" weight="fill" size={20} />;
		}
	};

	const getQualityDescription = (quality: "optimal" | "good" | "minimal") => {
		switch (quality) {
			case "optimal":
				return "Perfect for feeling refreshed and energized";
			case "good":
				return "Good amount of sleep, you should feel rested";
			case "minimal":
				return "Minimum recommended sleep, may feel tired";
			default:
				return "";
		}
	};

	if (calculations.length === 0) {
		return (
			<Card>
				<CardContent>
					<Typography variant="body1" color="text.secondary" textAlign="center">
						Select a wake-up time to see your optimal bedtime options
					</Typography>
				</CardContent>
			</Card>
		);
	}

	return (
		<Box>
			<Typography
				variant="h6"
				gutterBottom
				sx={{ display: "flex", alignItems: "center", gap: 1 }}
			>
				<TimerIcon color="primary" />
				Your Sleep Schedule Options
			</Typography>

			<Stack spacing={2}>
				{calculations.map((calc, index) => (
					<Fade in={true} timeout={300 + index * 100} key={calc.cycles}>
						<Card
							sx={{
								border: `2px solid ${getSleepQualityColor(calc.quality)}20`,
								backgroundColor: `${getSleepQualityColor(calc.quality)}05`,
								"&:hover": {
									boxShadow: 3,
									transform: "translateY(-2px)",
									transition: "all 0.2s ease-in-out",
								},
							}}
						>
							<CardContent>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "flex-start",
										mb: 2,
									}}
								>
									<Box>
										<Typography
											variant="h5"
											component="div"
											sx={{ fontWeight: 600 }}
										>
											{formatTime(calc.bedtime)}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											Bedtime for {calc.cycles} sleep cycle
											{calc.cycles !== 1 ? "s" : ""}
										</Typography>
									</Box>

									<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
										{getQualityIcon(calc.quality)}
										<Chip
											label={getSleepQualityText(calc.quality)}
											size="small"
											sx={{
												backgroundColor: getSleepQualityColor(calc.quality),
												color: "white",
												fontWeight: 600,
											}}
										/>
									</Box>
								</Box>

								<Box sx={{ mb: 2 }}>
									<Stack direction="row" spacing={2} alignItems="center">
										<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
											<ClockIcon size={16} color="action" />
											<Typography variant="body2">
												{calc.totalHours.toFixed(1)} hours total sleep
											</Typography>
										</Box>

										{fallAsleepBuffer > 0 && (
											<Box
												sx={{ display: "flex", alignItems: "center", gap: 1 }}
											>
												<Typography variant="body2" color="text.secondary">
													+{fallAsleepBuffer} min buffer
												</Typography>
											</Box>
										)}
									</Stack>
								</Box>

								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ mb: 2 }}
								>
									{getQualityDescription(calc.quality)}
								</Typography>

								<Divider sx={{ my: 1 }} />

								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<Typography variant="body2" color="text.secondary">
										Wake up at: <strong>{formatTime(calc.wakeTime)}</strong>
									</Typography>

									<Box sx={{ display: "flex", gap: 1 }}>
										<CalendarExport calculation={calc} />

										<Tooltip
											title={copiedIndex === index ? "Copied!" : "Copy bedtime"}
										>
											<IconButton
												size="small"
												onClick={() => handleCopyTime(calc.bedtime, index)}
												sx={{
													color:
														copiedIndex === index
															? "success.main"
															: "text.secondary",
													transition: "color 0.2s ease-in-out",
												}}
											>
												<CopyIcon size={16} />
											</IconButton>
										</Tooltip>
									</Box>
								</Box>
							</CardContent>
						</Card>
					</Fade>
				))}
			</Stack>

			{calculations.length > 0 && (
				<Box
					sx={{
						mt: 3,
						p: 2,
						backgroundColor: "background.paper",
						borderRadius: 2,
					}}
				>
					<Typography variant="body2" color="text.secondary">
						<strong>💡 Tip:</strong> Sleep cycles are approximately 90 minutes
						long. Waking up at the end of a complete cycle helps you feel more
						refreshed.
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default CycleResults;
