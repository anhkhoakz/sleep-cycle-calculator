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
	Stack,
	Typography,
} from "@mui/material";
import {
	DesktopIcon,
	DeviceMobileIcon,
	DownloadIcon,
} from "@phosphor-icons/react/dist/ssr";
import type React from "react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[];
	readonly userChoice: Promise<{
		outcome: "accepted" | "dismissed";
		platform: string;
	}>;
	prompt(): Promise<void>;
}

const PWAInstallPrompt: React.FC = () => {
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [showInstallPrompt, setShowInstallPrompt] = useState(false);
	const [isInstalled, setIsInstalled] = useState(false);
	const [isIOS, setIsIOS] = useState(false);
	const [isStandalone, setIsStandalone] = useState(false);

	useEffect(() => {
		// Check if app is already installed
		const checkInstalled = () => {
			const isStandaloneMode = window.matchMedia(
				"(display-mode: standalone)",
			).matches;
			const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);

			setIsStandalone(isStandaloneMode);
			setIsIOS(isIOSDevice);
			setIsInstalled(isStandaloneMode);
		};

		checkInstalled();

		// Listen for the beforeinstallprompt event
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			setDeferredPrompt(e as BeforeInstallPromptEvent);

			// Show install prompt after a delay
			setTimeout(() => {
				if (!isInstalled) {
					setShowInstallPrompt(true);
				}
			}, 3000);
		};

		// Listen for app installed event
		const handleAppInstalled = () => {
			setIsInstalled(true);
			setShowInstallPrompt(false);
			setDeferredPrompt(null);
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		window.addEventListener("appinstalled", handleAppInstalled);

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt,
			);
			window.removeEventListener("appinstalled", handleAppInstalled);
		};
	}, [isInstalled]);

	const handleInstallClick = async () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;

			if (outcome === "accepted") {
				console.log("User accepted the install prompt");
			} else {
				console.log("User dismissed the install prompt");
			}

			setDeferredPrompt(null);
			setShowInstallPrompt(false);
		}
	};

	const handleDismiss = () => {
		setShowInstallPrompt(false);
		// Don't show again for this session
		sessionStorage.setItem("pwa-install-dismissed", "true");
	};

	// Don't show if already installed or dismissed in this session
	if (isInstalled || sessionStorage.getItem("pwa-install-dismissed")) {
		return null;
	}

	// iOS installation instructions
	if (isIOS && !isStandalone) {
		return (
			<Dialog
				open={showInstallPrompt}
				onClose={handleDismiss}
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<DeviceMobileIcon color="primary" />
					Install Sleep Calculator
				</DialogTitle>

				<DialogContent>
					<Alert severity="info" sx={{ mb: 2 }}>
						Install this app on your iOS device for quick access to your sleep
						calculator.
					</Alert>

					<Typography variant="body1" gutterBottom>
						To install this app on your iPhone or iPad:
					</Typography>

					<Stack spacing={2} sx={{ mt: 2 }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
							<Chip label="1" color="primary" size="small" />
							<Typography variant="body2">
								Tap the <strong>Share</strong> button in Safari
							</Typography>
						</Box>

						<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
							<Chip label="2" color="primary" size="small" />
							<Typography variant="body2">
								Scroll down and tap <strong>"Add to Home Screen"</strong>
							</Typography>
						</Box>

						<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
							<Chip label="3" color="primary" size="small" />
							<Typography variant="body2">
								Tap <strong>"Add"</strong> to confirm
							</Typography>
						</Box>
					</Stack>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleDismiss}>Maybe Later</Button>
					<Button onClick={handleDismiss} variant="contained">
						Got It!
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	// Android/Desktop installation prompt
	if (deferredPrompt && !isIOS) {
		return (
			<Dialog
				open={showInstallPrompt}
				onClose={handleDismiss}
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<DownloadIcon color="primary" />
					Install Sleep Calculator
				</DialogTitle>

				<DialogContent>
					<Card variant="outlined" sx={{ mb: 2 }}>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Install as App
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Get quick access to your sleep calculator with notifications and
								offline support.
							</Typography>
						</CardContent>
					</Card>

					<Stack spacing={1}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<DesktopIcon size={16} color="action" />
							<Typography variant="body2">Works offline</Typography>
						</Box>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<DesktopIcon size={16} color="action" />
							<Typography variant="body2">Sleep reminders</Typography>
						</Box>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<DesktopIcon size={16} color="action" />
							<Typography variant="body2">
								Quick access from home screen
							</Typography>
						</Box>
					</Stack>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleDismiss}>Not Now</Button>
					<Button
						onClick={handleInstallClick}
						variant="contained"
						startIcon={<DownloadIcon />}
					>
						Install App
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	return null;
};

export default PWAInstallPrompt;
