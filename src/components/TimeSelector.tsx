import {
	Box,
	Chip,
	IconButton,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { ArrowClockwiseIcon, ClockIcon } from "@phosphor-icons/react/dist/ssr";
import type React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { formatTime } from "@/utils/sleepCalculations";

interface TimeSelectorProps {
	wakeTime: Date;
	onWakeTimeChange: (time: Date) => void;
	fallAsleepBuffer: number;
	onFallAsleepBufferChange: (buffer: number) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
	wakeTime,
	onWakeTimeChange,
	fallAsleepBuffer,
	onFallAsleepBufferChange,
}) => {
	const { t } = useTranslation();
	const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const timeString = event.target.value;
		if (timeString) {
			const [hours, minutes] = timeString.split(":").map(Number);
			const newTime = new Date();
			newTime.setHours(hours, minutes, 0, 0);

			// If the time is earlier than current time, set it for tomorrow
			const now = new Date();
			if (newTime <= now) {
				newTime.setDate(newTime.getDate() + 1);
			}

			onWakeTimeChange(newTime);
		}
	};

	const handleQuickTimeSelect = (time: Date) => {
		onWakeTimeChange(time);
	};

	const handleBufferToggle = () => {
		const newBuffer = fallAsleepBuffer === 15 ? 0 : 15;
		onFallAsleepBufferChange(newBuffer);
	};

	const getCurrentTimeSuggestions = () => {
		const now = new Date();
		const suggestions: Date[] = [];

		// Add current time
		suggestions.push(now);

		// Add common wake times (6 AM, 7 AM, 8 AM)
		const commonTimes = [6, 7, 8];
		commonTimes.forEach((hour) => {
			const time = new Date();
			time.setHours(hour, 0, 0, 0);
			if (time > now) {
				suggestions.push(time);
			} else {
				// Add for tomorrow
				const tomorrowTime = new Date(time);
				tomorrowTime.setDate(tomorrowTime.getDate() + 1);
				suggestions.push(tomorrowTime);
			}
		});

		return suggestions.slice(0, 4); // Limit to 4 suggestions
	};

	const quickTimes = getCurrentTimeSuggestions();

	return (
		<Box sx={{ mb: 3 }}>
			<Typography
				variant="h6"
				gutterBottom
				sx={{ display: "flex", alignItems: "center", gap: 1 }}
			>
				<ClockIcon color="primary" />
				{t("calculator.wakeTime")}
			</Typography>

			<Box sx={{ mb: 2 }}>
				<TextField
					fullWidth
					type="time"
					value={wakeTime.toTimeString().slice(0, 5)}
					onChange={handleTimeChange}
					label={t("calculator.wakeTime")}
					InputLabelProps={{
						shrink: true,
					}}
					sx={{ mb: 2 }}
				/>

				<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
					{t("calculator.quickSelect")}
				</Typography>
				<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
					{quickTimes.map((time) => (
						<Chip
							key={`quick-time-${time.getTime()}`}
							label={formatTime(time)}
							onClick={() => handleQuickTimeSelect(time)}
							variant={
								time.getTime() === wakeTime.getTime() ? "filled" : "outlined"
							}
							color="primary"
							size="small"
							icon={<ClockIcon />}
						/>
					))}
					<Tooltip title="Set to current time">
						<IconButton
							size="small"
							onClick={() => handleQuickTimeSelect(new Date())}
							sx={{ ml: 1 }}
						>
							<ArrowClockwiseIcon />
						</IconButton>
					</Tooltip>
				</Stack>
			</Box>

			<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				<Typography variant="body2" color="text.secondary">
					{t("calculator.fallAsleepBuffer")}:
				</Typography>
				<Chip
					label={
						fallAsleepBuffer === 0
							? t("calculator.noBuffer")
							: `${fallAsleepBuffer} ${t("calculator.minutes")}`
					}
					onClick={handleBufferToggle}
					variant={fallAsleepBuffer > 0 ? "filled" : "outlined"}
					color={fallAsleepBuffer > 0 ? "primary" : "default"}
					size="small"
				/>
				<Typography variant="caption" color="text.secondary">
					({t("calculator.timeToFallAsleep")})
				</Typography>
			</Box>
		</Box>
	);
};

export default TimeSelector;
