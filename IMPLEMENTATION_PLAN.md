# Cambodia Weather Dashboard - Implementation Plan

## Project Overview

| Aspect | Details |
|--------|---------|
| **Framework** | Next.js 16.1.6 + React 19 + Tailwind CSS v4 |
| **UI Library** | Shadcn UI (v4 compatible) |
| **Map Library** | mapcn (MapLibre GL) |
| **Data Source** | `https://data.mef.gov.kh/api/v1/realtime-api/weather` |
| **Provinces** | 25 Cambodian provinces |
| **Design Theme** | Primary: `#137fec`, Font: Inter, Light mode |

---

## API Response Structure

```json
{
  "data": {
    "name": "Phnom Penh",
    "temp_c": 31.4,
    "temp_f": 88.5,
    "humidity": 30,
    "wind_kph": 7.9,
    "wind_dir": "NNE",
    "pressure_mb": 1008.0,
    "precip_mm": 0.0,
    "cloud": 14,
    "vis_km": 10.0,
    "feelslike_c": 30.5,
    "condition": { "text": "Clear", "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png" },
    "last_updated": "2026-02-20T19:15:00",
    "is_day": false
  }
}
```

---

## Scope Summary

| Feature | Decision |
|---------|----------|
| **Screens** | Main Dashboard first |
| **Refresh** | Auto-refresh every 5 minutes |
| **Map** | Use `mapcn` (MapLibre GL) for interactive Cambodia map |
| **UI** | Shadcn UI with Tailwind v4 |

---

## Phase 1: Setup & Dependencies

### Commands to run:

```bash
# 1. Initialize Shadcn UI (Tailwind v4 mode)
npx shadcn@latest init

# 2. Add required components
npx shadcn@latest add card button select tabs badge skeleton dropdown-menu

# 3. Install mapcn for interactive map
npx mapcn@latest add map marker popup

# 4. Install SWR for data fetching with auto-refresh
npm install swr
```

### Theme Configuration (`src/app/globals.css`):

```css
@import "tailwindcss";
@theme {
  --color-primary: #137fec;
  --font-sans: "Inter", sans-serif;
  --radius: 0.75rem; /* Round Eight */
}
```

---

## Phase 2: Types & API Layer

### Type Definitions (`src/types/weather.ts`)

```typescript
export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface WeatherData {
  id: number;
  name: string;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  wind_kph: number;
  wind_mph: number;
  wind_dir: string;
  wind_degree: number;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  cloud: number;
  vis_km: number;
  vis_miles: number;
  uv: number | null;
  gust_kph: number;
  gust_mph: number;
  dewpoint_c: number;
  dewpoint_f: number;
  heatindex_c: number;
  heatindex_f: number;
  windchill_c: number;
  windchill_f: number;
  is_day: boolean;
  condition: WeatherCondition;
  last_updated: string;
  last_updated_epoch: number;
  created_at: string;
}

export interface WeatherResponse {
  data: WeatherData;
}

export interface AllWeatherResponse {
  data: WeatherData[];
}
```

### API Client (`src/lib/api.ts`)

- `fetchAllWeather()` - GET all provinces
- `fetchProvinceWeather(name)` - GET single province
- Base URL: `https://data.mef.gov.kh/api/v1/realtime-api/weather`

### Data Hook (`src/hooks/useWeather.ts`)

- SWR hook with 5-minute refresh interval
- Error handling & loading states

---

## Phase 3: Components

| Component | Purpose |
|-----------|---------|
| `WeatherCard` | Compact card showing temp, condition, humidity |
| `CurrentConditions` | Large display for selected province |
| `WeatherMetrics` | Grid of metric cards (wind, pressure, visibility, etc.) |
| `ProvinceMap` | Interactive mapcn map with province markers |
| `ProvinceGrid` | Grid of all province cards |
| `WeatherIcon` | Day/night aware weather icon |
| `Header` | App header with title and last updated time |

---

## Phase 4: Main Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│  Header: National Weather Analytics Dashboard    🕐 19:30│
├─────────────────────────────────────────────────────────┤
│ ┌───────────────────────┐ ┌─────────────────────────────┐│
│ │                       │ │   Current Conditions        ││
│ │   Cambodia Map        │ │   Phnom Penh                ││
│ │   (mapcn)             │ │   31.4°C                    ││
│ │   - Clickable markers │ │   Clear                     ││
│ │   - Province hover    │ │   Feels like 30.5°C         ││
│ │                       │ └─────────────────────────────┘│
│ └───────────────────────┘                               │
├─────────────────────────────────────────────────────────┤
│  Weather Metrics (4 cards)                              │
│  Wind    Humidity   Precip   Cloud                      │
│  7.9 kph    30%     0.0 mm    14%                       │
├─────────────────────────────────────────────────────────┤
│  All Provinces Grid (25 cards)                          │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                    │
│  │PP  │ │SR  │ │BTB │ │KPC │ │...  │                    │
│  │31° │ │30° │ │31° │ │28° │ │     │                    │
│  └────┘ └────┘ └────┘ └────┘ └────┘                    │
└─────────────────────────────────────────────────────────┘
```

---

## Phase 5: File Structure

```
src/
├── app/
│   ├── page.tsx                 # Main dashboard
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Theme config
├── components/
│   ├── ui/                      # Shadcn components
│   ├── map/                     # mapcn components
│   └── weather/
│       ├── weather-card.tsx
│       ├── current-conditions.tsx
│       ├── weather-metrics.tsx
│       ├── province-map.tsx
│       ├── province-grid.tsx
│       └── weather-icon.tsx
├── hooks/
│   └── use-weather.ts           # SWR hook with 5min refresh
├── lib/
│   ├── api.ts                   # API client
│   └── utils.ts                 # Utilities
└── types/
    └── weather.ts               # TypeScript types
```

---

## Cambodia Province Coordinates (for mapcn markers)

```typescript
const provinceCoords: Record<string, [number, number]> = {
  "Phnom Penh": [104.9282, 11.5564],
  "Siem Reap": [103.8566, 13.3634],
  "Battambang": [102.9735, 13.1025],
  "Sihanoukville": [103.5096, 10.6264],
  "Kampong Cham": [105.4581, 11.9934],
  "Kampong Chhnang": [104.6656, 12.2500],
  "Kampong Speu": [104.5167, 11.4500],
  "Kampong Thom": [104.9000, 12.7167],
  "Kampot": [104.1833, 10.6167],
  "Kandal": [105.0667, 11.4333],
  "Kep": [104.3167, 10.4833],
  "Koh Kong": [103.0000, 11.6167],
  "Kratie": [106.0167, 12.4833],
  "Mondulkiri": [107.1833, 12.8667],
  "Oddar Meanchey": [103.5000, 14.1833],
  "Pailin": [102.6167, 12.8500],
  "Preah Vihear": [104.8000, 13.8000],
  "Prey Veng": [105.3333, 11.4833],
  "Pursat": [103.9167, 12.5333],
  "Ratanakiri": [106.9833, 13.7333],
  "Stung Treng": [105.9667, 13.5167],
  "Svay Rieng": [105.6667, 11.0833],
  "Takeo": [104.7833, 10.9833],
  "Banteay Meanchey": [102.9833, 13.6167],
  "Tboung Khmum": [105.9667, 11.5000],
};
```

---

## Key Implementation Notes

1. **Auto-refresh**: SWR with `refreshInterval: 300000` (5 minutes)
2. **Map**: mapcn with markers for each province, click to select
3. **Theme**: Primary color `#137fec`, Inter font, rounded corners
4. **Icons**: Use WeatherAPI icons with day/night detection via `is_day`
5. **Stitch Design**: Match card layouts, use `#137fec` for accents

---

## List of 25 Provinces

1. Phnom Penh
2. Siem Reap
3. Battambang
4. Sihanoukville
5. Kampong Cham
6. Kampong Chhnang
7. Kampong Speu
8. Kampong Thom
9. Kampot
10. Kandal
11. Kep
12. Koh Kong
13. Kratie
14. Mondulkiri
15. Oddar Meanchey
16. Pailin
17. Preah Vihear
18. Prey Veng
19. Pursat
20. Ratanakiri
21. Stung Treng
22. Svay Rieng
23. Takeo
24. Banteay Meanchey
25. Tboung Khmum
