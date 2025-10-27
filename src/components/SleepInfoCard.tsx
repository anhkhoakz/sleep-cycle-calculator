import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Card,
	CardContent,
	Chip,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import {
	BrainIcon,
	CaretDownIcon,
	CheckCircleIcon,
	InfoIcon,
	LightbulbIcon,
	QuestionIcon,
} from "@phosphor-icons/react/dist/ssr";
import type React from "react";

const SleepInfoCard: React.FC = () => {
	const sleepTips = [
		"Keep a consistent sleep schedule, even on weekends",
		"Create a relaxing bedtime routine",
		"Avoid caffeine 6 hours before bedtime",
		"Keep your bedroom cool, dark, and quiet",
		"Limit screen time 1 hour before bed",
		"Exercise regularly, but not too close to bedtime",
		"Avoid large meals and alcohol before sleep",
		"Use your bed only for sleep and intimacy",
	];

	const sleepCycleFacts = [
		"Each sleep cycle lasts about 90 minutes",
		"A complete cycle includes light sleep, deep sleep, and REM sleep",
		"Deep sleep is most important for physical restoration",
		"REM sleep is crucial for memory consolidation and learning",
		"Most adults need 4-6 complete sleep cycles per night",
		"Waking up during deep sleep can cause sleep inertia",
	];

	return (
		<Box sx={{ mb: 3 }}>
			<Typography
				variant="h3"
				component="h3"
				gutterBottom
				sx={{ display: "flex", alignItems: "center", gap: 1 }}
			>
				<BrainIcon color="#b48ead" />
				Sleep Science & Tips
			</Typography>

			<Stack spacing={2}>
				<Card>
					<CardContent>
						<Typography
							variant="h4"
							component="h4"
							gutterBottom
							sx={{ display: "flex", alignItems: "center", gap: 1 }}
						>
							<InfoIcon color="#5e81ac" />
							Understanding Sleep Cycles
						</Typography>
						<Typography variant="body2" color="text.secondary" paragraph>
							Sleep isn't just one continuous state. It's made up of cycles that
							repeat throughout the night, eacsh lasting about 90 minutes.
							Understanding these cycles can help you wake up feeling refreshed.
						</Typography>

						<Box sx={{ mb: 2 }}>
							<Typography variant="subtitle2" gutterBottom>
								Sleep Cycle Stages:
							</Typography>
							<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
								<Chip
									label="Light Sleep"
									size="small"
									color="primary"
									variant="outlined"
								/>
								<Chip
									label="Deep Sleep"
									size="small"
									color="secondary"
									variant="outlined"
								/>
								<Chip
									label="REM Sleep"
									size="small"
									color="success"
									variant="outlined"
								/>
							</Stack>
						</Box>

						<List dense>
							{sleepCycleFacts.map((fact) => (
								<ListItem key={`fact-${fact.slice(0, 20)}`} sx={{ py: 0.5 }}>
									<ListItemIcon sx={{ minWidth: 32 }}>
										<CheckCircleIcon size={16} color="primary" />
									</ListItemIcon>
									<ListItemText
										primary={fact}
										primaryTypographyProps={{ variant: "body2" }}
									/>
								</ListItem>
							))}
						</List>
					</CardContent>
				</Card>

				<Card>
					<CardContent>
						<Typography
							variant="h4"
							component="h4"
							gutterBottom
							sx={{ display: "flex", alignItems: "center", gap: 1 }}
						>
							<LightbulbIcon color="#ebcb8b" weight="fill" />
							Sleep Hygiene Tips
						</Typography>
						<Typography variant="body2" color="text.secondary" paragraph>
							Good sleep hygiene practices can significantly improve your sleep
							quality and help you fall asleep faster, stay asleep longer, and
							wake up feeling refreshed.
						</Typography>

						<List dense>
							{sleepTips.map((tip) => (
								<ListItem key={`tip-${tip.slice(0, 20)}`} sx={{ py: 0.5 }}>
									<ListItemIcon sx={{ minWidth: 32 }}>
										<LightbulbIcon size={16} color="warning" />
									</ListItemIcon>
									<ListItemText
										primary={tip}
										primaryTypographyProps={{ variant: "body2" }}
									/>
								</ListItem>
							))}
						</List>
					</CardContent>
				</Card>

				<Accordion>
					<AccordionSummary expandIcon={<CaretDownIcon />}>
						<Typography
							variant="h4"
							component="h4"
							sx={{ display: "flex", alignItems: "center", gap: 1 }}
						>
							<QuestionIcon color="primary" />
							Frequently Asked Questions
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box>
							<Typography variant="subtitle1" gutterBottom>
								Why is it important to wake up at the end of a sleep cycle?
							</Typography>
							<Typography variant="body2" color="text.secondary" paragraph>
								Waking up during deep sleep can cause sleep inertia - that
								groggy, disoriented feeling that can last for 30 minutes or
								more. Waking up at the end of a cycle, during lighter sleep,
								helps you feel more alert and refreshed.
							</Typography>

							<Typography variant="subtitle1" gutterBottom>
								What if I can't fall asleep at the calculated bedtime?
							</Typography>
							<Typography variant="body2" color="text.secondary" paragraph>
								The calculator includes a buffer time for falling asleep
								(usually 15 minutes). If you consistently take longer to fall
								asleep, consider adjusting your bedtime earlier or improving
								your sleep hygiene routine.
							</Typography>

							<Typography variant="subtitle1" gutterBottom>
								Is 4 cycles (6 hours) enough sleep?
							</Typography>
							<Typography variant="body2" color="text.secondary" paragraph>
								While 4 cycles might be sufficient for some people, most adults
								need 5-6 cycles (7.5-9 hours) for optimal health and
								performance. Consistently getting less than 6 hours of sleep can
								lead to sleep debt and health issues.
							</Typography>

							<Typography variant="subtitle1" gutterBottom>
								Should I use this calculator every night?
							</Typography>
							<Typography variant="body2" color="text.secondary">
								This calculator is most helpful when you have a specific wake-up
								time you need to meet. For regular use, try to maintain a
								consistent sleep schedule that works for your lifestyle and
								allows you to get 7-9 hours of sleep most nights.
							</Typography>
						</Box>
					</AccordionDetails>
				</Accordion>
			</Stack>
		</Box>
	);
};

export default SleepInfoCard;
