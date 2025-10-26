import { format } from "date-fns";
import type { SleepCalculation } from "./sleepCalculations";

export interface NotificationSettings {
	enabled: boolean;
	bedtimeReminder: boolean;
	wakeUpReminder: boolean;
	reminderMinutes: number; // minutes before bedtime
}

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
	enabled: false,
	bedtimeReminder: true,
	wakeUpReminder: false,
	reminderMinutes: 30,
};

class NotificationService {
	private permission: NotificationPermission = "default";
	private settings: NotificationSettings = DEFAULT_NOTIFICATION_SETTINGS;
	private initialized = false;

	private initialize(): void {
		if (this.initialized || typeof window === "undefined") {
			return;
		}

		this.permission =
			typeof Notification !== "undefined" ? Notification.permission : "default";
		this.loadSettings();
		this.initialized = true;
	}

	private loadSettings(): void {
		try {
			const stored = localStorage.getItem("sleep-calculator-notifications");
			if (stored) {
				this.settings = {
					...DEFAULT_NOTIFICATION_SETTINGS,
					...JSON.parse(stored),
				};
			}
		} catch (error) {
			console.error("Failed to load notification settings:", error);
		}
	}

	private saveSettings(): void {
		try {
			localStorage.setItem(
				"sleep-calculator-notifications",
				JSON.stringify(this.settings),
			);
		} catch (error) {
			console.error("Failed to save notification settings:", error);
		}
	}

	async requestPermission(): Promise<boolean> {
		this.initialize();

		if (!("Notification" in window)) {
			console.warn("This browser does not support notifications");
			return false;
		}

		if (this.permission === "granted") {
			return true;
		}

		if (this.permission === "denied") {
			return false;
		}

		const permission = await Notification.requestPermission();
		this.permission = permission;
		return permission === "granted";
	}

	isSupported(): boolean {
		this.initialize();
		return "Notification" in window;
	}

	isEnabled(): boolean {
		this.initialize();
		return this.permission === "granted" && this.settings.enabled;
	}

	getSettings(): NotificationSettings {
		this.initialize();
		return { ...this.settings };
	}

	updateSettings(newSettings: Partial<NotificationSettings>): void {
		this.initialize();
		this.settings = { ...this.settings, ...newSettings };
		this.saveSettings();
	}

	async scheduleBedtimeReminder(calculation: SleepCalculation): Promise<void> {
		this.initialize();
		if (!this.isEnabled() || !this.settings.bedtimeReminder) {
			return;
		}

		const reminderTime = new Date(
			calculation.bedtime.getTime() - this.settings.reminderMinutes * 60 * 1000,
		);
		const now = new Date();

		if (reminderTime <= now) {
			return;
		}

		const delay = reminderTime.getTime() - now.getTime();

		setTimeout(() => {
			this.showNotification(
				"Time for Bed! 🌙",
				`Your optimal bedtime is ${format(calculation.bedtime, "h:mm a")} for ${calculation.cycles} sleep cycles.`,
				"bedtime-reminder",
			);
		}, delay);
	}

	async scheduleWakeUpReminder(calculation: SleepCalculation): Promise<void> {
		this.initialize();
		if (!this.isEnabled() || !this.settings.wakeUpReminder) {
			return;
		}

		const reminderTime = new Date(
			calculation.wakeTime.getTime() - 5 * 60 * 1000,
		); // 5 minutes before wake up
		const now = new Date();

		if (reminderTime <= now) {
			return;
		}

		const delay = reminderTime.getTime() - now.getTime();

		setTimeout(() => {
			this.showNotification(
				"Almost Time to Wake Up! ☀️",
				`You should wake up at ${format(calculation.wakeTime, "h:mm a")} for optimal sleep cycle completion.`,
				"wakeup-reminder",
			);
		}, delay);
	}

	private showNotification(title: string, body: string, tag: string): void {
		this.initialize();
		if (!this.isEnabled()) {
			return;
		}

		const notification = new Notification(title, {
			body,
			icon: "/vite.svg", // You can replace this with a custom icon
			tag,
			requireInteraction: true,
			silent: false,
		});

		notification.onclick = () => {
			window.focus();
			notification.close();
		};

		// Auto-close after 10 seconds
		setTimeout(() => {
			notification.close();
		}, 10000);
	}

	clearAllReminders(): void {
		this.initialize();
		// Note: This is a simplified implementation
		// In a real app, you'd want to store timeout IDs and clear them properly
	}

	async testNotification(): Promise<void> {
		this.initialize();
		if (!this.isEnabled()) {
			throw new Error("Notifications are not enabled");
		}

		this.showNotification(
			"Sleep Calculator Test 🔔",
			"This is a test notification to verify your notification settings are working correctly.",
			"test-notification",
		);
	}
}

export const notificationService = new NotificationService();
