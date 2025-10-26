import { addMinutes, format, subMinutes } from "date-fns";

export interface SleepCalculation {
	cycles: number;
	totalHours: number;
	bedtime: Date;
	wakeTime: Date;
	quality: "optimal" | "good" | "minimal";
}

export interface SleepCycleConfig {
	cycleLength: number; // 90 minutes
	fallAsleepBuffer: number; // 10-15 minutes
	minCycles: number; // 4
	maxCycles: number; // 6
	optimalCycles: number[]; // [5, 6]
}

export interface SleepPreferences {
	wakeTime: string; // ISO string
	fallAsleepBuffer: number;
	isDarkMode: boolean;
	notificationsEnabled: boolean;
	reminderTime: string; // ISO string for bedtime reminder
	preferredCycles: number;
}

export const SLEEP_CONFIG: SleepCycleConfig = {
	cycleLength: 90, // 90 minutes per cycle
	fallAsleepBuffer: 15, // 15 minutes buffer
	minCycles: 4,
	maxCycles: 6,
	optimalCycles: [5, 6],
};

export const DEFAULT_PREFERENCES: SleepPreferences = {
	wakeTime: new Date().toISOString(),
	fallAsleepBuffer: 15,
	isDarkMode: false,
	notificationsEnabled: false,
	reminderTime: new Date().toISOString(),
	preferredCycles: 5,
};

// LocalStorage utilities
export const STORAGE_KEYS = {
	PREFERENCES: "sleep-calculator-preferences",
	SCHEDULES: "sleep-calculator-schedules",
	NOTIFICATION_PERMISSION: "sleep-calculator-notification-permission",
} as const;

export const savePreferences = (preferences: SleepPreferences): void => {
	try {
		localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
	} catch (error) {
		console.error("Failed to save preferences:", error);
	}
};

export const loadPreferences = (): SleepPreferences => {
	try {
		const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
		if (stored) {
			const parsed = JSON.parse(stored);
			// Ensure all required fields exist
			return { ...DEFAULT_PREFERENCES, ...parsed };
		}
	} catch (error) {
		console.error("Failed to load preferences:", error);
	}
	return DEFAULT_PREFERENCES;
};

export const saveSleepSchedule = (schedule: SleepCalculation): void => {
	try {
		const schedules = loadSleepSchedules();
		const newSchedule = {
			...schedule,
			bedtime: schedule.bedtime.toISOString(),
			wakeTime: schedule.wakeTime.toISOString(),
			savedAt: new Date().toISOString(),
		};

		// Keep only the last 10 schedules
		const updatedSchedules = [newSchedule, ...schedules].slice(0, 10);
		localStorage.setItem(
			STORAGE_KEYS.SCHEDULES,
			JSON.stringify(updatedSchedules),
		);
	} catch (error) {
		console.error("Failed to save sleep schedule:", error);
	}
};

export const loadSleepSchedules = (): Array<
	SleepCalculation & { savedAt: string }
> => {
	try {
		const stored = localStorage.getItem(STORAGE_KEYS.SCHEDULES);
		if (stored) {
			const parsed = JSON.parse(stored);
			return parsed.map((schedule: SleepCalculation & { savedAt: string }) => ({
				...schedule,
				bedtime: new Date(schedule.bedtime),
				wakeTime: new Date(schedule.wakeTime),
			}));
		}
	} catch (error) {
		console.error("Failed to load sleep schedules:", error);
	}
	return [];
};

export const clearAllData = (): void => {
	try {
		localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
		localStorage.removeItem(STORAGE_KEYS.SCHEDULES);
		localStorage.removeItem(STORAGE_KEYS.NOTIFICATION_PERMISSION);
	} catch (error) {
		console.error("Failed to clear data:", error);
	}
};

export const calculateBedtime = (
	wakeTime: Date,
	cycles: number,
	fallAsleepBuffer: number = SLEEP_CONFIG.fallAsleepBuffer,
): SleepCalculation => {
	const totalMinutes = cycles * SLEEP_CONFIG.cycleLength;
	const bedtime = subMinutes(wakeTime, totalMinutes + fallAsleepBuffer);
	const totalHours = totalMinutes / 60;

	let quality: "optimal" | "good" | "minimal";
	if (cycles >= 5) {
		quality = "optimal";
	} else if (cycles === 4) {
		quality = "good";
	} else {
		quality = "minimal";
	}

	return {
		cycles,
		totalHours,
		bedtime,
		wakeTime,
		quality,
	};
};

export const calculateWakeTime = (
	bedtime: Date,
	cycles: number,
	fallAsleepBuffer: number = SLEEP_CONFIG.fallAsleepBuffer,
): SleepCalculation => {
	const totalMinutes = cycles * SLEEP_CONFIG.cycleLength;
	const wakeTime = addMinutes(bedtime, totalMinutes + fallAsleepBuffer);
	const totalHours = totalMinutes / 60;

	let quality: "optimal" | "good" | "minimal";
	if (cycles >= 5) {
		quality = "optimal";
	} else if (cycles === 4) {
		quality = "good";
	} else {
		quality = "minimal";
	}

	return {
		cycles,
		totalHours,
		bedtime,
		wakeTime,
		quality,
	};
};

export const formatTime = (date: Date): string => {
	return format(date, "h:mm a");
};

export const formatTime24 = (date: Date): string => {
	return format(date, "HH:mm");
};

export const getSleepQualityColor = (
	quality: "optimal" | "good" | "minimal",
): string => {
	switch (quality) {
		case "optimal":
			return "#4caf50"; // Green
		case "good":
			return "#ff9800"; // Orange
		case "minimal":
			return "#f44336"; // Red
		default:
			return "#757575"; // Gray
	}
};

export const getSleepQualityText = (
	quality: "optimal" | "good" | "minimal",
): string => {
	switch (quality) {
		case "optimal":
			return "Optimal Sleep";
		case "good":
			return "Good Sleep";
		case "minimal":
			return "Minimal Sleep";
		default:
			return "Unknown";
	}
};

export const generateAllSleepOptions = (
	wakeTime: Date,
	fallAsleepBuffer: number = SLEEP_CONFIG.fallAsleepBuffer,
): SleepCalculation[] => {
	const options: SleepCalculation[] = [];

	for (
		let cycles = SLEEP_CONFIG.minCycles;
		cycles <= SLEEP_CONFIG.maxCycles;
		cycles++
	) {
		options.push(calculateBedtime(wakeTime, cycles, fallAsleepBuffer));
	}

	return options.sort((a, b) => b.cycles - a.cycles);
};

export const getCurrentTimeSuggestions = (): Date[] => {
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
		}
	});

	return suggestions;
};

export const validateWakeTime = (wakeTime: Date): boolean => {
	const now = new Date();
	const tomorrow = new Date(now);
	tomorrow.setDate(tomorrow.getDate() + 1);

	// Wake time should be in the future (either today or tomorrow)
	return wakeTime > now || wakeTime.getDate() === tomorrow.getDate();
};

// Calendar export utilities
export const generateCalendarEvent = (
	calculation: SleepCalculation,
): string => {
	const startTime = format(calculation.bedtime, "yyyyMMdd'T'HHmmss");
	const endTime = format(calculation.wakeTime, "yyyyMMdd'T'HHmmss");
	const summary = `Sleep Schedule - ${calculation.cycles} cycles (${calculation.totalHours.toFixed(1)}h)`;
	const description = `Sleep cycle: ${calculation.cycles} cycles\nTotal sleep: ${calculation.totalHours.toFixed(1)} hours\nQuality: ${getSleepQualityText(calculation.quality)}`;

	return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sleep Calculator//Sleep Schedule//EN
BEGIN:VEVENT
DTSTART:${startTime}
DTEND:${endTime}
SUMMARY:${summary}
DESCRIPTION:${description}
UID:${Date.now()}@sleep-calculator.com
END:VEVENT
END:VCALENDAR`;
};

export const downloadCalendarFile = (calculation: SleepCalculation): void => {
	const calendarContent = generateCalendarEvent(calculation);
	const blob = new Blob([calendarContent], { type: "text/calendar" });
	const url = URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.href = url;
	link.download = `sleep-schedule-${format(calculation.bedtime, "yyyy-MM-dd")}.ics`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};
