import {
	Box,
	Card,
	CardContent,
	Chip,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { NotepadIcon, TimerIcon } from "@phosphor-icons/react/dist/ssr";
import type React from "react";

const QuickReferenceTable: React.FC = () => {
	const referenceData = [
		{
			cycles: 4,
			hours: 6.0,
			description: "Minimum recommended",
			quality: "minimal",
		},
		{
			cycles: 5,
			hours: 7.5,
			description: "Good for most adults",
			quality: "optimal",
		},
		{
			cycles: 6,
			hours: 9.0,
			description: "Optimal for recovery",
			quality: "optimal",
		},
	];

	const getQualityColor = (quality: string) => {
		switch (quality) {
			case "optimal":
				return "success";
			case "minimal":
				return "error";
			default:
				return "default";
		}
	};

	const getQualityText = (quality: string) => {
		switch (quality) {
			case "optimal":
				return "Optimal";
			case "minimal":
				return "Minimal";
			default:
				return "Good";
		}
	};

	return (
		<Card>
			<CardContent>
				<Typography
					variant="h3"
					component="h3"
					gutterBottom
					sx={{ display: "flex", alignItems: "center", gap: 1 }}
				>
					<NotepadIcon color="primary" />
					Quick Reference
				</Typography>

				<Typography variant="body2" color="text.secondary" paragraph>
					Common sleep cycle combinations and their benefits:
				</Typography>

				<TableContainer component={Paper} variant="outlined">
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell>
									<strong>Cycles</strong>
								</TableCell>
								<TableCell align="center">
									<strong>Total Hours</strong>
								</TableCell>
								<TableCell align="center">
									<strong>Quality</strong>
								</TableCell>
								<TableCell>
									<strong>Description</strong>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{referenceData.map((row) => (
								<TableRow key={`reference-${row.cycles}`} hover>
									<TableCell component="th" scope="row">
										<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
											<TimerIcon size={16} color="action" />
											{row.cycles}
										</Box>
									</TableCell>
									<TableCell align="center">
										<Typography variant="body2" fontWeight={600}>
											{row.hours}h
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Chip
											label={getQualityText(row.quality)}
											size="small"
											color={
												getQualityColor(row.quality) as
													| "success"
													| "error"
													| "default"
											}
											variant="outlined"
										/>
									</TableCell>
									<TableCell>
										<Typography variant="body2">{row.description}</Typography>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

				<Box
					sx={{
						mt: 2,
						p: 2,
						backgroundColor: "background.paper",
						borderRadius: 1,
					}}
				>
					<Typography variant="body2" color="text.secondary">
						<strong>💡 Remember:</strong> Individual sleep needs vary. Use this
						calculator as a starting point and adjust based on how you feel.
						Consistency is key to better sleep quality.
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default QuickReferenceTable;
