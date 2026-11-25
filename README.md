# SkyScope Weather

A full-featured weather app built for GitHub Pages. It includes current conditions, live radar, hourly/daily forecasts, air quality, astronomy, saved locations, and smart weather insights.

## Features

- **Current conditions**: temperature, feels-like, high/low, humidity, wind, gusts, precipitation, UV, cloud cover, visibility, pressure, dew point
- **Live radar**: animated RainViewer precipitation radar with play/pause and timeline scrubber on a Leaflet/OpenStreetMap map
- **Hourly + 7-day forecasts**: temperature, conditions, and precipitation probability
- **Air quality**: US AQI, category badge, PM2.5, PM10, ozone, and health guidance
- **Astronomy**: sunrise, sunset, daylight duration, sun progress, moon phase and illumination
- **Smart insights**: quick guidance for umbrella, sun protection, wind, and air quality/comfort
- **Saved locations**: quick-access locations stored in browser localStorage
- **Search + geolocation**: Open-Meteo geocoding and browser location support
- **Unit toggle**: switch between Fahrenheit/mph/miles and Celsius/km/h/km
- **Responsive UI**: designed for desktop and mobile

## Tech

- Static HTML/CSS/JavaScript (no build step)
- [Open-Meteo Forecast API](https://open-meteo.com/) for weather data
- [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api) for AQI
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) for search
- [RainViewer](https://www.rainviewer.com/api.html) for radar tiles
- [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) for maps

## Run locally

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy

Deployed via GitHub Pages from the `main` branch root.
