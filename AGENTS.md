# AGENTS.md - Development Guidelines

## Commands

### Development
- `npm run dev` - Start Next.js development server (http://localhost:3000)
- `npm run build` - Build production bundle
- `npm start` - Start production server

### Code Quality
- `npm run lint` - Run Biome linter (checks and auto-fixes)
- `npm run format` - Format code with Biome

### Testing
No test framework configured. When adding tests, set up a test runner (Vitest/Jest) and add scripts to package.json.

---

## Code Style Guidelines

### Formatting & Linting
- **Tool**: Biome (2.2.0)
- **Indentation**: 4 spaces
- **Auto-organize imports**: Enabled by default
- **Recommended rules**: Enabled for Next.js and React domains

### TypeScript Configuration
- **Strict mode**: Enabled
- **Target**: ES2017
- **Module**: ESNext with bundler resolution
- **JSX**: react-jsx
- **Path aliases**: `@/*` maps to `./src/*`
- **Compiler**: React Compiler enabled (next.config.ts)

### Naming Conventions

**Components**: PascalCase - `WeatherCard`, `ProvinceMap`

**Hooks**: camelCase with `use` prefix - `useWeather`, `useAqi`

**Utilities**: camelCase - `cn`, `fetchAllWeather`

**Constants**: SCREAMING_SNAKE_CASE - `SWR_OPTIONS`, `BASE_URL`

**Types/Interfaces**: PascalCase - `WeatherData`, `WeatherCondition`

### Import Patterns

Use `@/` alias for internal imports. Order: external → internal (types → utils → hooks → components).

```tsx
import { useState, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { WeatherCard } from "@/components/weather/weather-card";
import { useWeather } from "@/hooks/use-weather";
import type { WeatherData } from "@/types/weather";
import { cn } from "@/lib/utils";
```

Use `import type` for type-only imports: `import type { WeatherData } from "@/types/weather";`

### Component Structure

Client components must start with `"use client";`:

```tsx
"use client";
import { useState } from "react";

interface WeatherCardProps {
    weather: WeatherData;
    onClick?: () => void;
}

export function WeatherCard({ weather, onClick }: WeatherCardProps) {
    // Component logic
}
```

Props destructuring with defaults: `export function Component({ data, isLoading = false, className }: Props)`

### Styling

Use Tailwind CSS with `cn()` utility (clsx + tailwind-merge) for conditional classes.

**Design tokens**: Dark mode, primary `#bfff00` (neon lime), fonts Space Grotesk/JetBrains Mono, no border radius.

### Data Fetching

Use SWR for client-side data fetching:

```tsx
const { data, error, isLoading, mutate } = useSWR<WeatherData[]>(
    "weather-all",
    fetchAllWeather,
    { refreshInterval: 300000, revalidateOnFocus: false },
);
```

**API Routes**: Use `NextResponse.json()` with proper error handling.

**Caching**: Use `next: { revalidate: 300 }` for ISR (5 minutes).

**External API**: Use `fetchWithTlsBypass` for APIs with incomplete SSL chains (e.g., data.mef.gov.kh).

### Error Handling

Throw descriptive errors in API functions. Client components should check error states and show friendly error UI with retry buttons.

### Type Safety

Define interfaces for all external data. Use generics for reusable functions.

### Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── api/         # API routes
│   ├── layout.tsx   # Root layout
│   └── page.tsx     # Main dashboard
├── components/
│   ├── ui/          # Base UI components (shadcn/ui)
│   └── weather/     # Feature-specific components
├── hooks/           # Custom React hooks (useWeather, useAqi)
├── lib/             # Utilities (api, utils, analytics)
└── types/           # TypeScript definitions
```

### UI Components

Use shadcn/ui base components. Props should use `React.ComponentProps` for type extension: `function Card({ className, ...props }: React.ComponentProps<"div">)`

### Additional Guidelines

- **React Compiler**: Enabled - let the compiler optimize re-renders
- **Analytics**: Use `trackEvent` from `@/lib/analytics` for user interactions
- **Maps**: Use MapLibre GL for map components with dynamic imports (`ssr: false`)
- **Constants**: Keep magic numbers as named constants
- **Loading UI**: Use Skeleton components for loading states

### Before Committing

```bash
npm run lint        # Check and auto-fix
npm run format      # Format code
```

Note: No typecheck script exists. Add one if needed: `"typecheck": "tsc --noEmit"`
