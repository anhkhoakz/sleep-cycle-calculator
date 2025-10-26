# Sleep Cycle Calculator - Next.js

A modern sleep cycle calculator built with Next.js, React, and Material-UI. Calculate your optimal bedtime based on sleep cycles to wake up refreshed.

## Features

- **Sleep Cycle Calculation**: Calculate optimal bedtime based on 90-minute sleep cycles
- **Multiple Options**: Get 4-6 sleep cycle options with quality indicators
- **Dark/Light Mode**: Toggle between themes for better user experience
- **PWA Support**: Install as a Progressive Web App on mobile devices
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Calendar Export**: Export sleep schedules to your calendar
- **Notifications**: Optional bedtime reminders
- **Settings Panel**: Customize wake time, fall-asleep buffer, and preferences
- **🌍 Multi-language Support**: Available in English and Vietnamese

## Tech Stack

- **Next.js 16**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Material-UI v7**: Modern component library
- **Phosphor Icons**: Beautiful icon set
- **date-fns**: Date manipulation utilities

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sleep-cycle-calculator
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page component
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── SleepCalculator.tsx    # Main calculator component
│   ├── CycleResults.tsx       # Sleep cycle results display
│   ├── TimeSelector.tsx       # Time input component
│   ├── SettingsPanel.tsx      # Settings drawer
│   ├── PWAInstallPrompt.tsx   # PWA installation prompt
│   └── ...                 # Other components
├── theme/                  # Material-UI theme configuration
│   └── theme.ts           # Light and dark themes
└── utils/                  # Utility functions
    ├── sleepCalculations.ts    # Sleep calculation logic
    └── notifications.ts       # Notification service
```

## Key Features Explained

### Sleep Cycle Calculation

The app calculates optimal bedtime by working backwards from your desired wake-up time, accounting for:

- 90-minute sleep cycles (light → deep → REM sleep)
- 15-minute fall-asleep buffer (customizable)
- 4-6 complete cycles for optimal rest

### PWA Features

- **Offline Support**: Works without internet connection
- **Install Prompt**: Native-like installation experience
- **Push Notifications**: Bedtime reminders (optional)
- **App-like Experience**: Full-screen mode on mobile

### Responsive Design

- Mobile-first approach
- Touch-friendly interface
- Adaptive layouts for all screen sizes
- Optimized for both portrait and landscape orientations

## Customization

### Themes

The app supports light and dark themes with:

- Custom color palettes
- Smooth transitions
- System preference detection
- Persistent user choice

### Settings

Users can customize:

- Default wake-up time
- Fall-asleep buffer duration
- Notification preferences
- Theme preference
- Preferred sleep cycles
- Language preference

## Language Support

The app supports multiple languages with automatic detection:

### Available Languages

- **English (en)**: Default language
- **Vietnamese (vi)**: Full Vietnamese translation

### Language Features

- **Automatic Detection**: Detects browser language preference
- **Manual Switching**: Language switcher in the header
- **Persistent Choice**: Remembers your language preference
- **PWA Support**: Different manifests for each language
- **Complete Translation**: All UI elements translated

### Adding New Languages

To add a new language:

1. Create translation files in `locales/[lang]/common.json`
2. Add the language code to `next.config.js` i18n configuration
3. Update the `LanguageSwitcher` component
4. Create a language-specific manifest file

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with PWA support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Migration from Vite

This project was migrated from Vite to Next.js for:

- Better SEO capabilities
- Server-side rendering
- Improved performance
- Enhanced PWA features
- Better deployment options

The migration maintains all existing functionality while adding Next.js benefits.
