# SkyScope Weather

A full-featured weather app built for GitHub Pages. It includes current conditions, a 24-hour forecast, a 7-day outlook, and live precipitation radar.

## Features

- **Current conditions**: temperature, feels-like, humidity, wind, precipitation, UV, visibility, pressure
- **24-hour forecast**: hourly temperature, icons, and precipitation probability
- **7-day forecast**: daily highs/lows, condition icons, and precipitation chance
- **Live radar**: animated precipitation radar from RainViewer on an OpenStreetMap base map
- **Location search**: search any city worldwide via Open-Meteo geocoding
- **Geolocation**: use your current location with browser permission
- **Responsive UI**: works on desktop and mobile

## Tech

- Static HTML/CSS/JavaScript (no build step)
- [Open-Meteo](https://open-meteo.com/) for weather and geocoding
- [RainViewer](https://www.rainviewer.com/api.html) for radar tiles
- [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) for maps

## Run locally

Open `index.html` in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy

This repo is configured for GitHub Pages deployment from the repository root on the default branch.
