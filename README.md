# Map Locations

An interactive map application built with Next.js and Leaflet that allows users to view and filter different types of locations.

## Features

- 🗺️ Interactive map powered by Leaflet and OpenStreetMap
- 📍 Multiple location types (Restaurant, Cafe, Park, Museum, Hotel)
- 🔍 Filter locations by type using checkboxes
- 🎨 Color-coded markers for different location types
- 📱 Responsive design with sidebar navigation
- 🧭 Navigation tabs (Home, Map, Contact Us)
- 🎨 Pink background with blue text styling
- ⚡ Built with Next.js and TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page with tabs and navigation
│   └── globals.css         # Global styles (pink background, blue text)
├── components/
│   ├── Header.tsx          # Navigation header with tabs
│   └── Map.tsx             # Map component with markers
├── .github/
│   └── copilot-instructions.md # Copilot instructions
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── next.config.js          # Next.js configuration
```

## Usage

1. **Navigation**: Use the header tabs to navigate between Home, Map, and Contact Us pages
2. **Home Page**: Welcome page with an option to explore the map
3. **Map Page**: 
   - All location types are displayed by default
   - Use the checkboxes in the sidebar to filter specific location types
   - Click on any marker to see location details in a popup
   - Drag to pan, scroll to zoom on the map
4. **Contact Us**: View contact information

## Technologies Used

- **Next.js 16**: React framework for production
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Leaflet**: Open-source JavaScript library for interactive maps
- **React Leaflet**: React components for Leaflet maps
- **OpenStreetMap**: Free map tiles

## Customization

### Adding New Locations

Edit the `SAMPLE_LOCATIONS` array in `components/Map.tsx`:

```typescript
const SAMPLE_LOCATIONS: Location[] = [
  {
    id: 1,
    lat: 40.7128,
    lng: -74.006,
    name: 'Location Name',
    type: 'Restaurant', // Choose from available types
    description: 'Location description',
  },
  // Add more locations...
]
```

### Adding New Location Types

1. Add the type to `LOCATION_TYPES` in `app/page.tsx`
2. Add a color for the new type in the `colors` object in `components/Map.tsx`

### Styling

All styles use Tailwind CSS. Customize the theme by editing `tailwind.config.ts`.

## Build for Production

```bash
npm run build
npm start
```

## License

MIT
