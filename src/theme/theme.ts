import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#6366f1", // Indigo
			light: "#818cf8",
			dark: "#4f46e5",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#8b5cf6", // Purple
			light: "#a78bfa",
			dark: "#7c3aed",
			contrastText: "#ffffff",
		},
		background: {
			default: "#f8fafc",
			paper: "#ffffff",
		},
		text: {
			primary: "#1e293b",
			secondary: "#475569", // Improved contrast (AA compliant)
		},
		success: {
			main: "#10b981",
			light: "#34d399",
			dark: "#059669",
		},
		warning: {
			main: "#f59e0b",
			light: "#fbbf24",
			dark: "#d97706",
		},
		error: {
			main: "#ef4444",
			light: "#f87171",
			dark: "#dc2626",
		},
	},
	typography: {
		fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
		h1: {
			fontSize: "2.5rem",
			fontWeight: 700,
			lineHeight: 1.2,
		},
		h2: {
			fontSize: "2rem",
			fontWeight: 600,
			lineHeight: 1.3,
		},
		h3: {
			fontSize: "1.5rem",
			fontWeight: 600,
			lineHeight: 1.4,
		},
		h4: {
			fontSize: "1.25rem",
			fontWeight: 600,
			lineHeight: 1.4,
		},
		h5: {
			fontSize: "1.125rem",
			fontWeight: 600,
			lineHeight: 1.4,
		},
		h6: {
			fontSize: "1rem",
			fontWeight: 600,
			lineHeight: 1.4,
		},
		body1: {
			fontSize: "1rem",
			lineHeight: 1.6,
		},
		body2: {
			fontSize: "0.875rem",
			lineHeight: 1.6,
		},
	},
	shape: {
		borderRadius: 12,
	},
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					boxShadow:
						"0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
					"&:hover": {
						boxShadow:
							"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					fontWeight: 600,
					borderRadius: 8,
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						borderRadius: 8,
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: 6,
					fontWeight: 500,
				},
			},
		},
	},
});

export const darkTheme = createTheme({
	...theme,
	palette: {
		mode: "dark",
		primary: {
			main: "#818cf8", // Lighter indigo for dark mode
			light: "#a5b4fc",
			dark: "#6366f1",
			contrastText: "#000000",
		},
		secondary: {
			main: "#a78bfa", // Lighter purple for dark mode
			light: "#c4b5fd",
			dark: "#8b5cf6",
			contrastText: "#000000",
		},
		background: {
			default: "#0f172a",
			paper: "#1e293b",
		},
		text: {
			primary: "#f1f5f9",
			secondary: "#e2e8f0", // Improved contrast for dark mode
		},
		success: {
			main: "#34d399",
			light: "#6ee7b7",
			dark: "#10b981",
		},
		warning: {
			main: "#fbbf24",
			light: "#fcd34d",
			dark: "#f59e0b",
		},
		error: {
			main: "#f87171",
			light: "#fca5a5",
			dark: "#ef4444",
		},
	},
	components: {
		...theme.components,
		MuiCard: {
			styleOverrides: {
				root: {
					boxShadow:
						"0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)",
					"&:hover": {
						boxShadow:
							"0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)",
					},
				},
			},
		},
	},
});
