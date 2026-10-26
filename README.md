# Weather Analytics Dashboard

A weather dashboard I built with React, TypeScript and Express. You search for a city and it shows the current weather, a 24-hour temperature chart, the next few days, chances of rain, air quality, and sunrise/sunset times.

![Dashboard](./docs/screenshot.png)

## What it does

- Search cities with autocomplete
- Current conditions: temperature, feels like, humidity, wind, visibility, pressure, precipitation
- 24-hour temperature chart
- Daily forecast and rain chances
- Air quality (AQI, PM2.5, PM10, CO, NO₂, O₃, SO₂)
- Sunrise and sunset in the city's own timezone
- Loading skeletons and error messages with a retry button
- Works on mobile

## Built with

**Client:** React 19, TypeScript, Vite, Tailwind CSS v4, TanStack Query, Recharts, Axios

**Server:** Node.js, Express, TypeScript, Zod, Winston, Helmet, express-rate-limit

**Data:** OpenWeatherMap (current weather, forecast, air pollution, geocoding)

## How it's organized

```
client/src
  components/   UI pieces
  pages/        Dashboard page
  hooks/        React Query hooks, debounce
  services/     Axios client
  types/  utils/

server/src
  config/       env validation
  routes/       controllers/    services/
  middlewares/  error handling
  utils/        logger, cache, AppError
```

The browser only talks to my Express server, never to OpenWeatherMap directly, so the API key stays on the backend. One request to `/api/weather/:city` makes the server call four OpenWeatherMap endpoints in parallel and return a single cleaned-up response. Results are cached for 10 minutes, in Redis if you set `REDIS_URL` and in memory otherwise.

## Running it locally

You need Node 20+ and a free API key from [openweathermap.org](https://openweathermap.org/api). New keys can take a while to activate.

```bash
git clone https://github.com/rehamkashaf33-source/weather-analytics-dashboard.git
cd weather-analytics-dashboard
```

Server:

```bash
cd server
cp .env     # then put your key in OPENWEATHER_API_KEY
npm install
npm run dev
```

Client (new terminal):

```bash
cd client
cp .env.env
npm install
npm run dev
```

Open http://localhost:5173. On Windows CMD use `copy` instead of `cp`.

### Environment variables

Server (`server/.env`):

- `OPENWEATHER_API_KEY` (required)
- `PORT` (default 4000)
- `CLIENT_URL` (default http://localhost:5173, used for CORS)
- `REDIS_URL` (optional, falls back to in-memory cache)
- `CACHE_TTL_SECONDS` (default 600)

Client (`client/.env`):

- `VITE_API_URL` (default http://localhost:4000/api)

## API

`GET /api/weather/:city` returns the current weather, hourly and daily forecast, and air quality for a city.

```json
{
  "location": { "name": "Cairo", "country": "EG", "lat": 30.04, "lon": 31.23 },
  "current": { "temp": 25.1, "humidity": 41, "windSpeed": 11.1, "description": "clear sky" },
  "hourly": [{ "time": 1761512400, "temp": 25, "pop": 0 }],
  "daily": [{ "date": "2026-10-27", "min": 19, "max": 29, "pop": 0, "icon": "01d" }],
  "airQuality": { "aqi": 3, "label": "Moderate", "components": { "pm2_5": 25.1 } }
}
```

(trimmed for readability)

`GET /api/weather/search?q=cai` returns up to 5 matching cities.

Errors come back as `{ "message": "..." }` with a 400, 404, 429 or 502 status. The API is rate limited to 60 requests a minute per IP.

## If something breaks

- **"Weather provider rejected the API key"**: the key is wrong or hasn't activated yet. Restart the server after editing `.env`.
- **"OPENWEATHER_API_KEY is required"**: `server/.env` is missing or empty.
- **Network error in the browser**: the server isn't running, or `VITE_API_URL` is wrong.

## Still to do

- Login and favorite cities (PostgreSQL + Prisma)
- Weather alerts
- Light theme
- UV index (needs the paid One Call API)
- Docker, tests, CI