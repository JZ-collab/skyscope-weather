(() => {
  'use strict';

  const DEFAULT_LOCATION = {
    name: 'San Francisco',
    admin1: 'California',
    country: 'United States',
    latitude: 37.7749,
    longitude: -122.4194,
    timezone: 'America/Los_Angeles'
  };

  const WMO = {
    0: { label: 'Clear sky', icon: 'sun' },
    1: { label: 'Mainly clear', icon: 'sun' },
    2: { label: 'Partly cloudy', icon: 'cloud-sun' },
    3: { label: 'Overcast', icon: 'cloud' },
    45: { label: 'Fog', icon: 'fog' },
    48: { label: 'Rime fog', icon: 'fog' },
    51: { label: 'Light drizzle', icon: 'drizzle' },
    53: { label: 'Drizzle', icon: 'drizzle' },
    55: { label: 'Heavy drizzle', icon: 'drizzle' },
    56: { label: 'Freezing drizzle', icon: 'sleet' },
    57: { label: 'Heavy freezing drizzle', icon: 'sleet' },
    61: { label: 'Light rain', icon: 'rain' },
    63: { label: 'Rain', icon: 'rain' },
    65: { label: 'Heavy rain', icon: 'rain' },
    66: { label: 'Freezing rain', icon: 'sleet' },
    67: { label: 'Heavy freezing rain', icon: 'sleet' },
    71: { label: 'Light snow', icon: 'snow' },
    73: { label: 'Snow', icon: 'snow' },
    75: { label: 'Heavy snow', icon: 'snow' },
    77: { label: 'Snow grains', icon: 'snow' },
    80: { label: 'Light showers', icon: 'rain' },
    81: { label: 'Showers', icon: 'rain' },
    82: { label: 'Heavy showers', icon: 'rain' },
    85: { label: 'Snow showers', icon: 'snow' },
    86: { label: 'Heavy snow showers', icon: 'snow' },
    95: { label: 'Thunderstorm', icon: 'storm' },
    96: { label: 'Thunderstorm with hail', icon: 'storm' },
    99: { label: 'Thunderstorm with hail', icon: 'storm' }
  };

  const ICONS = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" opacity="0.95"/><path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"/></svg>',
    'cloud-sun': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="2.5" fill="currentColor" stroke="none" opacity="0.95"/><path d="M9 2.5V4M3.5 8H5M13 8h1.5M4.9 3.9l1.1 1.1M12 3.9l-1.1 1.1M4.9 12.1l1.1-1.1"/><path d="M7.5 19a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 17.6 9.2 3.8 3.8 0 0 1 17.5 16.8H7.5Z" fill="rgba(234,242,255,0.18)"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18a4 4 0 0 1-.7-7.94A5.5 5.5 0 0 1 17.1 8.5 3.75 3.75 0 0 1 17.25 16H7Z" fill="rgba(234,242,255,0.18)"/></svg>',
    rain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15a4 4 0 0 1-.7-7.94A5.5 5.5 0 0 1 17.1 5.5 3.75 3.75 0 0 1 17.25 13H7Z" fill="rgba(234,242,255,0.18)"/><path d="M8 17.5l-1 2M12 17.5l-1 2M16 17.5l-1 2" stroke="#7ec8ff"/></svg>',
    drizzle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15a4 4 0 0 1-.7-7.94A5.5 5.5 0 0 1 17.1 5.5 3.75 3.75 0 0 1 17.25 13H7Z" fill="rgba(234,242,255,0.18)"/><path d="M8.5 17v1.5M12 17v1.5M15.5 17v1.5" stroke="#7ec8ff"/></svg>',
    snow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 14a4 4 0 0 1-.7-7.94A5.5 5.5 0 0 1 17.1 4.5 3.75 3.75 0 0 1 17.25 12H7Z" fill="rgba(234,242,255,0.18)"/><path d="M8 16.5h.01M12 16.5h.01M16 16.5h.01M10 19h.01M14 19h.01" stroke="#dff4ff" stroke-width="2.4"/></svg>',
    storm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 14a4 4 0 0 1-.7-7.94A5.5 5.5 0 0 1 17.1 4.5 3.75 3.75 0 0 1 17.25 12H7Z" fill="rgba(234,242,255,0.18)"/><path d="M13 12l-2.5 4H13l-2 4 5-5.5h-2.5l2-2.5Z" fill="#ffd36a" stroke="#ffd36a"/></svg>',
    sleet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 14a4 4 0 0 1-.7-7.94A5.5 5.5 0 0 1 17.1 4.5 3.75 3.75 0 0 1 17.25 12H7Z" fill="rgba(234,242,255,0.18)"/><path d="M9 16.5l-.8 1.8M15 16.5l-.8 1.8" stroke="#7ec8ff"/><path d="M12 17h.01M12 20h.01" stroke="#dff4ff" stroke-width="2.4"/></svg>',
    fog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 14a4 4 0 0 1-.7-7.94A5.5 5.5 0 0 1 17.1 4.5 3.75 3.75 0 0 1 17.25 12H7Z" fill="rgba(234,242,255,0.18)"/><path d="M4 16h16M6 19h12" stroke="#b8cade"/></svg>'
  };

  const el = {
    searchForm: document.getElementById('search-form'),
    searchInput: document.getElementById('search-input'),
    locationBtn: document.getElementById('location-btn'),
    status: document.getElementById('status'),
    locationName: document.getElementById('location-name'),
    locationMeta: document.getElementById('location-meta'),
    currentTemp: document.getElementById('current-temp'),
    currentCondition: document.getElementById('current-condition'),
    feelsLike: document.getElementById('feels-like'),
    currentIcon: document.getElementById('current-icon'),
    updatedAt: document.getElementById('updated-at'),
    humidity: document.getElementById('stat-humidity'),
    wind: document.getElementById('stat-wind'),
    precip: document.getElementById('stat-precip'),
    uv: document.getElementById('stat-uv'),
    visibility: document.getElementById('stat-visibility'),
    pressure: document.getElementById('stat-pressure'),
    hourly: document.getElementById('hourly-scroll'),
    daily: document.getElementById('daily-list'),
    radarPlay: document.getElementById('radar-play'),
    radarTime: document.getElementById('radar-time')
  };

  const state = {
    location: { ...DEFAULT_LOCATION },
    map: null,
    marker: null,
    baseLayer: null,
    radarFrames: [],
    radarLayers: [],
    radarIndex: 0,
    radarTimer: null,
    radarHost: 'https://tilecache.rainviewer.com'
  };

  function iconFor(code) {
    const key = (WMO[code] || WMO[0]).icon;
    return ICONS[key] || ICONS.cloud;
  }

  function labelFor(code) {
    return (WMO[code] || { label: 'Unknown' }).label;
  }

  function setStatus(message, type) {
    el.status.textContent = message || '';
    el.status.className = 'status' + (type ? ' ' + type : '');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatTemp(v) {
    return Math.round(v) + '°';
  }

  function formatHour(iso, tz) {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(undefined, { hour: 'numeric', timeZone: tz }).format(d);
  }

  function formatDay(iso, tz, index) {
    const d = new Date(iso + 'T00:00:00');
    if (index === 0) return 'Today';
    return new Intl.DateTimeFormat(undefined, { weekday: 'short', timeZone: tz }).format(d);
  }

  function formatUpdated(iso, tz) {
    try {
      const d = new Date(iso);
      return 'Updated ' + new Intl.DateTimeFormat(undefined, {
        hour: 'numeric', minute: '2-digit', timeZone: tz
      }).format(d);
    } catch (_) {
      return 'Updated just now';
    }
  }

  function uvLabel(uv) {
    if (uv < 3) return 'Low';
    if (uv < 6) return 'Moderate';
    if (uv < 8) return 'High';
    if (uv < 11) return 'Very high';
    return 'Extreme';
  }

  async function fetchJson(url) {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('Request failed: ' + res.status);
    return res.json();
  }

  async function searchLocation(query) {
    const url = 'https://geocoding-api.open-meteo.com/v1/search?name=' +
      encodeURIComponent(query) + '&count=1&language=en&format=json';
    const data = await fetchJson(url);
    if (!data.results || !data.results.length) throw new Error('No location found for "' + query + '".');
    const r = data.results[0];
    return {
      name: r.name,
      admin1: r.admin1 || '',
      country: r.country || '',
      latitude: r.latitude,
      longitude: r.longitude,
      timezone: r.timezone || 'auto'
    };
  }

  async function reverseGeocode(lat, lon) {
    // Open-Meteo has no reverse geocoding; use BigDataCloud free client endpoint.
    try {
      const url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' +
        lat + '&longitude=' + lon + '&localityLanguage=en';
      const d = await fetchJson(url);
      return {
        name: d.city || d.locality || d.principalSubdivision || 'Current location',
        admin1: d.principalSubdivision || '',
        country: d.countryName || '',
        latitude: lat,
        longitude: lon,
        timezone: d.localityInfo?.informative?.find(x => /time/i.test(x.name || ''))?.name || Intl.DateTimeFormat().resolvedOptions().timeZone || 'auto'
      };
    } catch (_) {
      return {
        name: 'Current location',
        admin1: '',
        country: '',
        latitude: lat,
        longitude: lon,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'auto'
      };
    }
  }

  async function fetchWeather(loc) {
    const params = new URLSearchParams({
      latitude: loc.latitude,
      longitude: loc.longitude,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,visibility,is_day',
      hourly: 'temperature_2m,precipitation_probability,weather_code,is_day',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,sunrise,sunset',
      temperature_unit: 'fahrenheit',
      wind_speed_unit: 'mph',
      precipitation_unit: 'inch',
      timezone: loc.timezone || 'auto',
      forecast_days: 7
    });
    return fetchJson('https://api.open-meteo.com/v1/forecast?' + params.toString());
  }

  function renderCurrent(loc, data) {
    const c = data.current;
    const daily = data.daily;
    const tz = data.timezone || loc.timezone;
    el.locationName.textContent = loc.name;
    el.locationMeta.textContent = [loc.admin1, loc.country].filter(Boolean).join(', ') || '—';
    el.currentTemp.textContent = formatTemp(c.temperature_2m);
    el.currentCondition.textContent = labelFor(c.weather_code);
    el.feelsLike.textContent = 'Feels like ' + formatTemp(c.apparent_temperature);
    el.currentIcon.innerHTML = iconFor(c.weather_code);
    el.updatedAt.textContent = formatUpdated(c.time, tz);
    el.humidity.textContent = Math.round(c.relative_humidity_2m) + '%';
    const windDir = degToCompass(c.wind_direction_10m);
    el.wind.textContent = Math.round(c.wind_speed_10m) + ' mph ' + windDir;
    el.precip.textContent = (c.precipitation || 0).toFixed(2) + ' in';
    const uv = daily.uv_index_max ? daily.uv_index_max[0] : null;
    el.uv.textContent = uv != null ? Math.round(uv) + ' ' + uvLabel(uv) : '--';
    const visMi = c.visibility != null ? (c.visibility / 1609.344) : null;
    el.visibility.textContent = visMi != null ? visMi.toFixed(1) + ' mi' : '--';
    el.pressure.textContent = c.pressure_msl != null ? Math.round(c.pressure_msl) + ' hPa' : '--';
  }

  function degToCompass(deg) {
    const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
    return dirs[Math.round(((deg % 360) / 22.5)) % 16];
  }

  function renderHourly(data) {
    const tz = data.timezone;
    const now = Date.now();
    const times = data.hourly.time;
    let start = 0;
    for (let i = 0; i < times.length; i++) {
      if (new Date(times[i]).getTime() >= now - 30 * 60 * 1000) { start = i; break; }
    }
    const end = Math.min(start + 24, times.length);
    let html = '';
    for (let i = start; i < end; i++) {
      const t = times[i];
      const temp = data.hourly.temperature_2m[i];
      const code = data.hourly.weather_code[i];
      const pop = data.hourly.precipitation_probability[i];
      const isNow = i === start;
      html += '<div class="hour-card' + (isNow ? ' now' : '') + '">' +
        '<div class="hour-time">' + (isNow ? 'Now' : escapeHtml(formatHour(t, tz))) + '</div>' +
        '<div class="hour-icon">' + iconFor(code) + '</div>' +
        '<div class="hour-temp">' + formatTemp(temp) + '</div>' +
        '<div class="hour-precip">' + (pop > 0 ? pop + '% precip' : '&nbsp;') + '</div>' +
        '</div>';
    }
    el.hourly.innerHTML = html;
  }

  function renderDaily(data) {
    const tz = data.timezone;
    const d = data.daily;
    const mins = d.temperature_2m_min;
    const maxs = d.temperature_2m_max;
    const lo = Math.min.apply(null, mins);
    const hi = Math.max.apply(null, maxs);
    const span = Math.max(hi - lo, 1);
    let html = '';
    for (let i = 0; i < d.time.length; i++) {
      const min = mins[i];
      const max = maxs[i];
      const left = ((min - lo) / span) * 100;
      const width = Math.max(((max - min) / span) * 100, 6);
      const pop = d.precipitation_probability_max[i];
      html += '<div class="daily-row">' +
        '<div class="daily-day">' + escapeHtml(formatDay(d.time[i], tz, i)) + '</div>' +
        '<div class="daily-icon">' + iconFor(d.weather_code[i]) + '</div>' +
        '<div class="daily-bar-wrap">' +
          '<span class="lo">' + Math.round(min) + '°</span>' +
          '<div class="daily-bar"><div class="daily-bar-fill" style="left:' + left.toFixed(2) + '%;width:' + width.toFixed(2) + '%"></div></div>' +
          '<span class="hi">' + Math.round(max) + '°</span>' +
        '</div>' +
        '<div class="daily-precip">' + (pop > 0 ? pop + '%' : '—') + '</div>' +
        '<div class="daily-desc">' + escapeHtml(labelFor(d.weather_code[i])) + '</div>' +
        '</div>';
    }
    el.daily.innerHTML = html;
  }

  function initMap() {
    if (state.map) return;
    state.map = L.map('radar-map', { zoomControl: true, attributionControl: true }).setView([state.location.latitude, state.location.longitude], 8);
    state.baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(state.map);
    state.marker = L.circleMarker([state.location.latitude, state.location.longitude], {
      radius: 7, color: '#ffffff', weight: 2, fillColor: '#2390ff', fillOpacity: 1
    }).addTo(state.map);
  }

  function updateMapLocation(loc) {
    initMap();
    state.map.setView([loc.latitude, loc.longitude], state.map.getZoom() < 7 ? 8 : state.map.getZoom(), { animate: true });
    state.marker.setLatLng([loc.latitude, loc.longitude]);
  }

  function clearRadarLayers() {
    state.radarLayers.forEach(l => { try { state.map.removeLayer(l); } catch (_) {} });
    state.radarLayers = [];
  }

  function stopRadar() {
    if (state.radarTimer) { clearInterval(state.radarTimer); state.radarTimer = null; }
    el.radarPlay.textContent = 'Play';
  }

  function showRadarFrame(index) {
    if (!state.radarFrames.length) return;
    state.radarIndex = (index + state.radarFrames.length) % state.radarFrames.length;
    state.radarLayers.forEach((layer, i) => {
      layer.setOpacity(i === state.radarIndex ? 0.75 : 0);
    });
    const frame = state.radarFrames[state.radarIndex];
    const d = new Date(frame.time * 1000);
    el.radarTime.textContent = new Intl.DateTimeFormat(undefined, {
      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
    }).format(d);
  }

  async function loadRadar() {
    initMap();
    stopRadar();
    try {
      const data = await fetchJson('https://api.rainviewer.com/public/weather-maps.json');
      const past = (data.radar && data.radar.past) ? data.radar.past.slice(-12) : [];
      const nowcast = (data.radar && data.radar.nowcast) ? data.radar.nowcast : [];
      const frames = past.concat(nowcast);
      state.radarHost = data.host || state.radarHost;
      clearRadarLayers();
      state.radarFrames = frames;
      if (!frames.length) {
        el.radarTime.textContent = 'Radar unavailable';
        return;
      }
      frames.forEach((frame, i) => {
        const url = state.radarHost + frame.path + '/256/{z}/{x}/{y}/2/1_1.png';
        const layer = L.tileLayer(url, { opacity: i === frames.length - 1 ? 0.75 : 0, zIndex: 300 });
        layer.addTo(state.map);
        state.radarLayers.push(layer);
      });
      showRadarFrame(frames.length - 1);
    } catch (err) {
      console.error(err);
      el.radarTime.textContent = 'Radar failed to load';
    }
  }

  function toggleRadarPlayback() {
    if (!state.radarFrames.length) return;
    if (state.radarTimer) { stopRadar(); return; }
    el.radarPlay.textContent = 'Pause';
    state.radarTimer = setInterval(() => {
      showRadarFrame(state.radarIndex + 1);
    }, 700);
  }

  async function loadLocation(loc, label) {
    setStatus(label || 'Loading weather...', 'loading');
    try {
      state.location = loc;
      const weather = await fetchWeather(loc);
      // If timezone was auto, adopt resolved timezone for formatting
      if (!loc.timezone || loc.timezone === 'auto') loc.timezone = weather.timezone;
      renderCurrent(loc, weather);
      renderHourly(weather);
      renderDaily(weather);
      updateMapLocation(loc);
      setStatus('');
      // Refresh radar only if not loaded or location moved significantly
      if (!state.radarFrames.length) loadRadar();
    } catch (err) {
      console.error(err);
      setStatus(err.message || 'Unable to load weather data.', 'error');
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    const q = el.searchInput.value.trim();
    if (!q) return;
    setStatus('Searching for "' + q + '"...', 'loading');
    try {
      const loc = await searchLocation(q);
      await loadLocation(loc, 'Loading weather for ' + loc.name + '...');
      el.searchInput.blur();
    } catch (err) {
      console.error(err);
      setStatus(err.message || 'Search failed.', 'error');
    }
  }

  function handleGeolocation() {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser.', 'error');
      return;
    }
    el.locationBtn.disabled = true;
    setStatus('Getting your location...', 'loading');
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const loc = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
        await loadLocation(loc, 'Loading weather for your location...');
      } finally {
        el.locationBtn.disabled = false;
      }
    }, (err) => {
      console.warn(err);
      setStatus('Could not access your location. Please search for a city.', 'error');
      el.locationBtn.disabled = false;
    }, { timeout: 10000, maximumAge: 300000 });
  }

  function bindEvents() {
    el.searchForm.addEventListener('submit', handleSearch);
    el.locationBtn.addEventListener('click', handleGeolocation);
    el.radarPlay.addEventListener('click', toggleRadarPlayback);
  }

  async function init() {
    bindEvents();
    initMap();
    await loadLocation(DEFAULT_LOCATION, 'Loading weather...');
    loadRadar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
