# Meteo Cambodia

A tactical weather analytics dashboard for Cambodia built with Next.js.

## Data Source

Weather, air quality, and exchange rate data is fetched from the Cambodian Ministry of Economy and Finance API:

- **Base URL**: `https://data.mef.gov.kh/api/v1/realtime-api/`

### TLS Certificate Note

The external API has an incomplete SSL certificate chain. A workaround is implemented using `undici` with TLS verification disabled for requests to this domain only (`src/lib/fetch-with-tls.ts`).

## Design Reference

This project is based on a Stitch design: **National Weather Analytics Dashboard V1**

- **Project ID**: `projects/16356065330325725480`
- **Device**: Desktop (1280px width)

### Design Theme

| Property | Value |
|----------|-------|
| Color Mode | Dark |
| Primary Color | `#bfff00` (Neon Lime) |
| Font | Space Grotesk, JetBrains Mono |
| Roundness | None (Tactical) |
| Style | Minimal, Grid-based |

### Screens

| Screen | Width | Height |
|--------|-------|--------|
| Main Dashboard | 1280px | 1560px |
| Analytics View | 1280px | 1423px |
| Details Panel | 1280px | 1560px |

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stitch MCP Access

This project uses [Stitch MCP](https://github.com/davideast/stitch-mcp) for design integration.

### Configuration

The MCP server is configured in `.opencode/config.json`:

```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["@_davideast/stitch-mcp", "proxy"],
      "env": {
        "STITCH_API_KEY": "your-api-key"
      }
    }
  }
}
```

### CLI Commands

Access Stitch MCP via CLI:

```bash
# List all projects
STITCH_API_KEY="your-api-key" npx @_davideast/stitch-mcp tool list_projects

# Get project details
STITCH_API_KEY="your-api-key" npx @_davideast/stitch-mcp tool get_project -d '{"name": "projects/16356065330325725480"}'

# Get screen details
STITCH_API_KEY="your-api-key" npx @_davideast/stitch-mcp tool get_screen -d '{"name": "projects/16356065330325725480/screens/SCREEN_ID"}'

# View project interactively
npx @_davideast/stitch-mcp view

# Explore screens
npx @_davideast/stitch-mcp screens
```

### Available Tools

| Tool | Description |
|------|-------------|
| `list_projects` | List all Stitch projects |
| `get_project` | Get project details |
| `get_screen` | Get screen details |
| `list_screens` | List screens in a project |
| `snapshot` | Create UI snapshot |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Stitch MCP GitHub](https://github.com/davideast/stitch-mcp)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
