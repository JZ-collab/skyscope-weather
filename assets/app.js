(() => {
  'use strict';

  const DEFAULT_LOCATION = { name: 'San Francisco', admin1: 'California', country: 'United States', latitude: 37.7749, longitude: -122.4194, timezone: 'America/Los_Angeles' };
  const STORAGE = { unit: 'skyscope-unit', saved: 'skyscope-saved', theme: 'skyscope-theme' };
  const WMO = {
    0:{label:'Clear sky',icon:'sun'},1:{label:'Mainly clear',icon:'sun'},2:{label:'Partly cloudy',icon:'cloud-sun'},3:{label:'Overcast',icon:'cloud'},
    45:{label:'Fog',icon:'fog'},48:{label:'Rime fog',icon:'fog'},51:{label:'Light drizzle',icon:'drizzle'},53:{label:'Drizzle',icon:'drizzle'},55:{label:'Heavy drizzle',icon:'drizzle'},
    56:{label:'Freezing drizzle',icon:'sleet'},57:{label:'Heavy freezing drizzle',icon:'sleet'},61:{label:'Light rain',icon:'rain'},63:{label:'Rain',icon:'rain'},65:{label:'Heavy rain',icon:'rain'},
    66:{label:'Freezing rain',icon:'sleet'},67:{label:'Heavy freezing rain',icon:'sleet'},71:{label:'Light snow',icon:'snow'},73:{label:'Snow',icon:'snow'},75:{label:'Heavy snow',icon:'snow'},77:{label:'Snow grains',icon:'snow'},
    80:{label:'Light showers',icon:'rain'},81:{label:'Showers',icon:'rain'},82:{label:'Heavy showers',icon:'rain'},85:{label:'Snow showers',icon:'snow'},86:{label:'Heavy snow showers',icon:'snow'},
    95:{label:'Thunderstorm',icon:'storm'},96:{label:'Thunderstorm with hail',icon:'storm'},99:{label:'Thunderstorm with hail',icon:'storm'}
  };
  const ICONS = {
    sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/><path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"/></svg>',
    'cloud-sun':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="2.5" fill="currentColor" stroke="none"/><path d="M9 2.5V4M3.5 8H5M13 8h1.5M4.9 3.9l1.1 1.1M12 3.9l-1.1 1.1M4.9 12.1l1.1-1.1"/><path d="M7.5 19a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 17.6 9.2 3.8 3.8 0 0 1 17.5 16.8H7.5Z" fill="rgba(234,242,255,.18)"/></svg>',
    cloud:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18a4 4 0 0 1-.7-7.94A5.5 5.5 0 0 1 17.1 8.5 3.75 3.75 0 0 1 17.25 16H7Z" fill="rgba(234,242,255,.18)"/></svg>',
    rain:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15a4 4 0 0 1-.7-7.94A5.5 5.5 0 0 1 17.1 5.5 3.75 3.75 0 0 1 17.25 13H7Z" fill="rgba(234,242,255,.18)"/><path d="M8 17.5l-1 2M12 17.5l-1 2M16 17.5l-1 2" stroke="#7ec8ff"/></svg>',
    drizzle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15a4 4 0 0 1-.7-7.94A5.5 5.5 0 0 1 17.1 5.5 3.75 3.75 0 0 1 17.25 13H7Z" fill="rgba(234,242,255,.18)"/><path d="M8.5 17v1.5M12 17v1.5M15.5 17v1.5" stroke="#7ec8ff"/></svg>',
    snow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 14a4 4 0 0 1-.7-7.94A5.5 5.5 0 0 1 17.1 4.5 3.75 3.75 0 0 1 17.25 12H7Z" fill="rgba(234,242,255,.18)"/><path d="M8 16.5h.01M12 16.5h.01M16 16.5h.01M10 19h.01M14 19h.01" stroke="#dff4ff" stroke-width="2.4"/></svg>',
    storm:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 14a4 4 0 0 1-.7-7.94A5.5 5.5 0 0 1 17.1 4.5 3.75 3.75 0 0 1 17.25 12H7Z" fill="rgba(234,242,255,.18)"/><path d="M13 12l-2.5 4H13l-2 4 5-5.5h-2.5l2-2.5Z" fill="#ffd36a" stroke="#ffd36a"/></svg>',
    sleet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 14a4 4 0 0 1-.7-7.94A5.5 5.5 0 0 1 17.1 4.5 3.75 3.75 0 0 1 17.25 12H7Z" fill="rgba(234,242,255,.18)"/><path d="M9 16.5l-.8 1.8M15 16.5l-.8 1.8" stroke="#7ec8ff"/><path d="M12 17h.01M12 20h.01" stroke="#dff4ff" stroke-width="2.4"/></svg>',
    fog:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 14a4 4 0 0 1-.7-7.94A5.5 5.5 0 0 1 17.1 4.5 3.75 3.75 0 0 1 17.25 12H7Z" fill="rgba(234,242,255,.18)"/><path d="M4 16h16M6 19h12" stroke="#b8cade"/></svg>'
  };

  const $ = (id) => document.getElementById(id);
  const el = {
    searchForm:$('search-form'), searchInput:$('search-input'), locationBtn:$('location-btn'), unitBtn:$('unit-btn'), themeBtn:$('theme-btn'),
    saveLocationBtn:$('save-location-btn'), clearSavedBtn:$('clear-saved-btn'), status:$('status'), refreshBtn:$('refresh-btn'), refreshIndicator:$('refresh-indicator'),
    locationName:$('location-name'), locationMeta:$('location-meta'), currentTemp:$('current-temp'), currentCondition:$('current-condition'), feelsLike:$('feels-like'), hiLo:$('hi-lo'),
    currentIcon:$('current-icon'), updatedAt:$('updated-at'),
    humidity:$('stat-humidity'), wind:$('stat-wind'), gust:$('stat-gust'), precip:$('stat-precip'), uv:$('stat-uv'), cloud:$('stat-cloud'), visibility:$('stat-visibility'), pressure:$('stat-pressure'), dew:$('stat-dew'),
    hourly:$('hourly-scroll'), daily:$('daily-list'), hourly2:$('hourly-scroll-2'), daily2:$('daily-list-2'), forecastDetails:$('forecast-details'),
    insights:$('insights-grid'), sunrise:$('sunrise'), sunset:$('sunset'), daylight:$('daylight'), moonPhase:$('moon-phase'), sunProgress:$('sun-progress'), sunDot:$('sun-dot'), sunriseLabel:$('sunrise-label'), sunsetLabel:$('sunset-label'),
    aqiBadge:$('aqi-badge'), aqiScore:$('aqi-score'), aqiLabel:$('aqi-label'), aqiPm25:$('aqi-pm25'), aqiPm10:$('aqi-pm10'), aqiO3:$('aqi-o3'), aqiUv:$('aqi-uv'), aqiAdvice:$('aqi-advice'),
    savedList:$('saved-list'), activeLocationCard:$('active-location-card'),
    radarPlay:$('radar-play'), radarTime:$('radar-time'), radarRange:$('radar-range'),
    radarPlay2:$('radar-play-2'), radarTime2:$('radar-time-2'), radarRange2:$('radar-range-2')
  };

  const state = {
    location: { ...DEFAULT_LOCATION }, weather: null, aqi: null,
    unit: localStorage.getItem(STORAGE.unit) === 'c' ? 'c' : 'f',
    theme: localStorage.getItem(STORAGE.theme) === 'light' ? 'light' : 'dark',
    saved: loadSaved(),
    maps: { main: null, focus: null }, markers: { main: null, focus: null },
    radarFrames: [], radarLayers: { main: [], focus: [] }, radarIndex: 0, radarTimer: null, radarHost: 'https://tilecache.rainviewer.com',
    refreshTimer: null, activeRoute: 'dashboard'
  };

  function loadSaved() { try { const v = JSON.parse(localStorage.getItem(STORAGE.saved) || '[]'); return Array.isArray(v) ? v.slice(0, 8) : []; } catch { return []; } }
  function persistSaved() { localStorage.setItem(STORAGE.saved, JSON.stringify(state.saved.slice(0,8))); }
  function persistUnit() { localStorage.setItem(STORAGE.unit, state.unit); }
  function persistTheme() { localStorage.setItem(STORAGE.theme, state.theme); }
  const iconFor = (code) => ICONS[(WMO[code]||WMO[0]).icon] || ICONS.cloud;
  const labelFor = (code) => (WMO[code]||{label:'Unknown'}).label;
  const escapeHtml = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  const toC = (f) => (f - 32) * 5 / 9;
  const tempValue = (f) => state.unit === 'c' ? toC(f) : f;
  const fmtTemp = (f) => Math.round(tempValue(f)) + '°';
  const fmtSpeed = (mph) => state.unit === 'c' ? Math.round(mph * 1.60934) + ' km/h' : Math.round(mph) + ' mph';
  const fmtVis = (mi) => state.unit === 'c' ? (mi * 1.60934).toFixed(1) + ' km' : mi.toFixed(1) + ' mi';
  const fmtPressure = (hPa) => state.unit === 'c' ? Math.round(hPa) + ' hPa' : (hPa * 0.02953).toFixed(2) + ' inHg';
  function setStatus(msg, type) { el.status.textContent = msg || ''; el.status.className = 'status' + (type ? ' ' + type : ''); }

  function formatHour(iso, tz) { return new Intl.DateTimeFormat(undefined, { hour:'numeric', timeZone: tz }).format(new Date(iso)); }
  function formatDay(iso, tz, i) { if (i === 0) return 'Today'; return new Intl.DateTimeFormat(undefined, { weekday:'short', timeZone: tz }).format(new Date(iso + 'T00:00:00')); }
  function formatTime(iso, tz) { return new Intl.DateTimeFormat(undefined, { hour:'numeric', minute:'2-digit', timeZone: tz }).format(new Date(iso)); }
  function formatUpdated(iso, tz) { try { return 'Updated ' + formatTime(iso, tz); } catch { return 'Updated just now'; } }
  function uvLabel(uv){ if(uv<3) return 'Low'; if(uv<6) return 'Moderate'; if(uv<8) return 'High'; if(uv<11) return 'Very high'; return 'Extreme'; }
  function uvColor(uv){ if(uv<3) return '#57d38c'; if(uv<6) return '#ffd36a'; if(uv<8) return '#ff9f43'; if(uv<11) return '#ff6b6b'; return '#b084ff'; }
  function aqiInfo(aqi){ if(aqi==null) return {label:'Unavailable',color:'#94a9c3',advice:'Air quality data is unavailable for this location right now.'}; if(aqi<=50) return {label:'Good',color:'#57d38c',advice:'Air quality is good. Great time for outdoor activities.'}; if(aqi<=100) return {label:'Moderate',color:'#ffd36a',advice:'Air quality is acceptable. Sensitive groups should limit prolonged outdoor exertion.'}; if(aqi<=150) return {label:'Sensitive',color:'#ff9f43',advice:'Sensitive groups may experience effects. Consider reducing intense outdoor activity.'}; if(aqi<=200) return {label:'Unhealthy',color:'#ff6b6b',advice:'Everyone may begin to feel effects. Limit prolonged outdoor exposure.'}; if(aqi<=300) return {label:'Very Unhealthy',color:'#c45cff',advice:'Health alert: avoid prolonged outdoor exertion when possible.'}; return {label:'Hazardous',color:'#8b3a3a',advice:'Emergency conditions. Stay indoors and reduce exposure.'}; }
  function degToCompass(deg){ const dirs=['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW']; return dirs[Math.round(((deg%360)/22.5))%16]; }
  function moonPhase(date){ const synodic=29.53058867; const known=Date.UTC(2000,0,6,18,14); const days=(Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate())-known)/86400000; const phase=((days%synodic)+synodic)%synodic; const names=['New Moon','Waxing Crescent','First Quarter','Waxing Gibbous','Full Moon','Waning Gibbous','Last Quarter','Waning Crescent']; return { name:names[Math.floor((phase/synodic*8)+0.5)%8], illum: Math.round((1-Math.abs((phase/synodic)*2-1))*100) }; }

  async function fetchJson(url, timeoutMs=12000) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' }, signal: ctrl.signal });
      if (!res.ok) throw new Error('Request failed: ' + res.status);
      return await res.json();
    } finally { clearTimeout(timer); }
  }

  async function searchLocation(query) {
    const url = 'https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(query) + '&count=1&language=en&format=json';
    const data = await fetchJson(url);
    if (!data.results || !data.results.length) throw new Error('No location found for "' + query + '".');
    const r = data.results[0];
    return { name:r.name, admin1:r.admin1||'', country:r.country||'', latitude:r.latitude, longitude:r.longitude, timezone:r.timezone||'auto' };
  }

  async function reverseGeocode(lat, lon) {
    try {
      const d = await fetchJson('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + lat + '&longitude=' + lon + '&localityLanguage=en');
      return { name:d.city||d.locality||d.principalSubdivision||'Current location', admin1:d.principalSubdivision||'', country:d.countryName||'', latitude:lat, longitude:lon, timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||'auto' };
    } catch {
      return { name:'Current location', admin1:'', country:'', latitude:lat, longitude:lon, timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||'auto' };
    }
  }

  async function fetchWeather(loc) {
    const params = new URLSearchParams({
      latitude: loc.latitude, longitude: loc.longitude,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,pressure_msl,visibility,cloud_cover,dew_point_2m,is_day',
      hourly: 'temperature_2m,precipitation_probability,weather_code,is_day',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,sunrise,sunset',
      temperature_unit:'fahrenheit', wind_speed_unit:'mph', precipitation_unit:'inch', timezone: loc.timezone || 'auto', forecast_days: 7
    });
    return fetchJson('https://api.open-meteo.com/v1/forecast?' + params.toString());
  }

  async function fetchAQI(loc) {
    const params = new URLSearchParams({ latitude: loc.latitude, longitude: loc.longitude, current: 'us_aqi,pm2_5,pm10,ozone,uv_index', timezone: loc.timezone || 'auto' });
    try { return await fetchJson('https://air-quality-api.open-meteo.com/v1/air-quality?' + params.toString(), 10000); }
    catch (e) { console.warn('AQI failed', e); return null; }
  }

  function renderCurrent(loc, data, aqiData) {
    const c = data.current; const daily = data.daily; const tz = data.timezone || loc.timezone;
    el.locationName.textContent = loc.name;
    el.locationMeta.textContent = [loc.admin1, loc.country].filter(Boolean).join(', ') || '—';
    el.currentTemp.textContent = fmtTemp(c.temperature_2m);
    el.currentCondition.textContent = labelFor(c.weather_code);
    el.feelsLike.textContent = 'Feels like ' + fmtTemp(c.apparent_temperature);
    el.hiLo.textContent = 'H: ' + fmtTemp(daily.temperature_2m_max[0]) + '  L: ' + fmtTemp(daily.temperature_2m_min[0]);
    el.currentIcon.innerHTML = iconFor(c.weather_code);
    el.updatedAt.textContent = formatUpdated(c.time, tz);
    el.humidity.textContent = Math.round(c.relative_humidity_2m) + '%';
    el.wind.textContent = fmtSpeed(c.wind_speed_10m) + ' ' + degToCompass(c.wind_direction_10m);
    el.gust.textContent = c.wind_gusts_10m != null ? fmtSpeed(c.wind_gusts_10m) : '--';
    el.precip.textContent = (c.precipitation || 0).toFixed(2) + ' in';
    const uv = daily.uv_index_max ? daily.uv_index_max[0] : null;
    el.uv.textContent = uv != null ? Math.round(uv) + ' ' + uvLabel(uv) : '--';
    el.uv.style.color = uv != null ? uvColor(uv) : '';
    el.cloud.textContent = c.cloud_cover != null ? Math.round(c.cloud_cover) + '%' : '--';
    el.visibility.textContent = c.visibility != null ? fmtVis(c.visibility / 1609.344) : '--';
    el.pressure.textContent = c.pressure_msl != null ? fmtPressure(c.pressure_msl) : '--';
    el.dew.textContent = c.dew_point_2m != null ? fmtTemp(c.dew_point_2m) : '--';
    renderAstronomy(daily, tz);
    renderAQI(aqiData, uv);
    renderInsights(c, daily, aqiData);
    renderForecastDetails(c, daily, tz);
    renderActiveLocationCard(loc, data);
  }

  function renderAstronomy(daily, tz) {
    const sr = daily.sunrise[0], ss = daily.sunset[0];
    el.sunrise.textContent = sr ? formatTime(sr, tz) : '--'; el.sunset.textContent = ss ? formatTime(ss, tz) : '--';
    el.sunriseLabel.textContent = el.sunrise.textContent; el.sunsetLabel.textContent = el.sunset.textContent;
    if (sr && ss) {
      const srMs = new Date(sr).getTime(), ssMs = new Date(ss).getTime();
      const daylightMs = Math.max(0, ssMs - srMs), h = Math.floor(daylightMs/3600000), m = Math.round((daylightMs%3600000)/60000);
      el.daylight.textContent = h + 'h ' + m + 'm';
      const now = Date.now(), pct = Math.min(100, Math.max(0, ((now - srMs)/(ssMs - srMs))*100));
      el.sunProgress.style.width = pct + '%'; el.sunDot.style.left = pct + '%'; el.sunDot.style.opacity = (now < srMs || now > ssMs) ? '0.35' : '1';
    } else { el.daylight.textContent = '--'; el.sunProgress.style.width = '0%'; el.sunDot.style.left = '0%'; }
    const moon = moonPhase(new Date());
    el.moonPhase.textContent = moon.name + ' (' + moon.illum + '%)';
  }

  function renderAQI(aqiData, uvFromDaily) {
    const c = aqiData && aqiData.current ? aqiData.current : null;
    const aqi = c && c.us_aqi != null ? Math.round(c.us_aqi) : null;
    const info = aqiInfo(aqi);
    el.aqiScore.textContent = aqi != null ? aqi : '--'; el.aqiScore.style.color = info.color;
    el.aqiLabel.textContent = info.label; el.aqiBadge.textContent = info.label;
    el.aqiBadge.style.background = info.color + '22'; el.aqiBadge.style.color = info.color;
    el.aqiPm25.textContent = c && c.pm2_5 != null ? c.pm2_5.toFixed(1) + ' µg/m³' : '--';
    el.aqiPm10.textContent = c && c.pm10 != null ? c.pm10.toFixed(1) + ' µg/m³' : '--';
    el.aqiO3.textContent = c && c.ozone != null ? Math.round(c.ozone) + ' µg/m³' : '--';
    el.aqiUv.textContent = c && c.uv_index != null ? c.uv_index.toFixed(1) : (uvFromDaily != null ? uvFromDaily.toFixed(1) : '--');
    el.aqiAdvice.textContent = info.advice;
  }

  function renderInsights(current, daily, aqiData) {
    const uv = daily.uv_index_max[0] || 0, pop = daily.precipitation_probability_max[0] || 0, gust = current.wind_gusts_10m || 0, aqi = aqiData && aqiData.current ? aqiData.current.us_aqi : null;
    const cards = [];
    cards.push(pop >= 35 ? {icon:'☔',title:'Umbrella',body: pop >= 60 ? 'High chance of rain ('+pop+'%). Bring an umbrella.' : 'Some rain possible ('+pop+'%). Keep a layer handy.'} : {icon:'🌤️',title:'Umbrella',body:'Rain is unlikely today ('+pop+'% chance).'});
    cards.push(uv >= 6 ? {icon:'🧴',title:'Sun Protection',body:'UV '+Math.round(uv)+' ('+uvLabel(uv)+'). Use sunscreen and shade.'} : uv >= 3 ? {icon:'🕶️',title:'Sun Protection',body:'Moderate UV ('+Math.round(uv)+'). Sunglasses may help midday.'} : {icon:'☁️',title:'Sun Protection',body:'Low UV today ('+Math.round(uv)+').'});
    cards.push(gust >= 30 ? {icon:'💨',title:'Wind',body:'Gusts up to '+fmtSpeed(gust)+'. Secure loose items.'} : {icon:'🍃',title:'Wind',body:'Winds around '+fmtSpeed(current.wind_speed_10m)+' with gusts '+fmtSpeed(gust)+'.'});
    cards.push(aqi != null ? {icon: aqi>100?'😷':'✅', title:'Air Quality', body:'AQI '+Math.round(aqi)+' ('+aqiInfo(aqi).label+'). '+(aqi>100?'Limit strenuous outdoor activity.':'Outdoor air looks fine for most people.')} : {icon:'🌡️',title:'Comfort',body:'Feels like '+fmtTemp(current.apparent_temperature)+' with '+Math.round(current.relative_humidity_2m)+'% humidity.'});
    el.insights.innerHTML = cards.map(c => '<div class="insight-card"><div class="insight-title"><span>'+c.icon+'</span>'+escapeHtml(c.title)+'</div><div class="insight-body">'+escapeHtml(c.body)+'</div></div>').join('');
  }

  function renderForecastDetails(current, daily, tz) {
    const items = [
      ['Condition', labelFor(current.weather_code)], ['High / Low', fmtTemp(daily.temperature_2m_max[0]) + ' / ' + fmtTemp(daily.temperature_2m_min[0])],
      ['Rain Chance', (daily.precipitation_probability_max[0]||0) + '%'], ['UV Max', Math.round(daily.uv_index_max[0]||0) + ' (' + uvLabel(daily.uv_index_max[0]||0) + ')'],
      ['Sunrise', daily.sunrise[0] ? formatTime(daily.sunrise[0], tz) : '--'], ['Sunset', daily.sunset[0] ? formatTime(daily.sunset[0], tz) : '--']
    ];
    el.forecastDetails.innerHTML = items.map(([k,v]) => '<div class="detail-card"><strong>'+escapeHtml(k)+'</strong><span>'+escapeHtml(String(v))+'</span></div>').join('');
  }

  function renderActiveLocationCard(loc, data) {
    const tz = data.timezone || loc.timezone;
    const meta = [loc.admin1, loc.country].filter(Boolean).join(', ');
    el.activeLocationCard.innerHTML = '<h3>'+escapeHtml(loc.name)+'</h3><p>'+escapeHtml(meta || 'Selected location')+'</p><p style="margin-top:10px">Timezone: '+escapeHtml(tz)+'</p><p>Coordinates: '+loc.latitude.toFixed(3)+', '+loc.longitude.toFixed(3)+'</p>';
  }

  function renderHourly(data, target) {
    const tz = data.timezone; const times = data.hourly.time; const now = Date.now();
    let start = 0;
    for (let i=0;i<times.length;i++){ if (new Date(times[i]).getTime() >= now - 30*60*1000){ start=i; break; } }
    const end = Math.min(start + 24, times.length);
    let html = '';
    for (let i=start;i<end;i++) {
      const t = times[i], temp=data.hourly.temperature_2m[i], code=data.hourly.weather_code[i], pop=data.hourly.precipitation_probability[i], isNow=i===start;
      html += '<div class="hour-card'+(isNow?' now':'')+'"><div class="hour-time">'+(isNow?'Now':escapeHtml(formatHour(t,tz)))+'</div><div class="hour-icon">'+iconFor(code)+'</div><div class="hour-temp">'+fmtTemp(temp)+'</div><div class="hour-precip">'+(pop>0?pop+'% rain':'&nbsp;')+'</div></div>';
    }
    target.innerHTML = html;
  }

  function renderDaily(data, target) {
    const tz=data.timezone, d=data.daily, mins=d.temperature_2m_min, maxs=d.temperature_2m_max;
    const lo=Math.min.apply(null,mins), hi=Math.max.apply(null,maxs), span=Math.max(hi-lo,1);
    let html='';
    for (let i=0;i<d.time.length;i++){
      const min=mins[i], max=maxs[i], left=((min-lo)/span)*100, width=Math.max(((max-min)/span)*100,6), pop=d.precipitation_probability_max[i];
      html += '<div class="daily-row"><div class="daily-day">'+escapeHtml(formatDay(d.time[i],tz,i))+'</div><div class="daily-icon">'+iconFor(d.weather_code[i])+'</div><div class="daily-bar-wrap"><span class="lo">'+Math.round(tempValue(min))+'°</span><div class="daily-bar"><div class="daily-bar-fill" style="left:'+left.toFixed(2)+'%;width:'+width.toFixed(2)+'%"></div></div><span class="hi">'+Math.round(tempValue(max))+'°</span></div><div class="daily-precip">'+(pop>0?pop+'%':'—')+'</div><div class="daily-desc">'+escapeHtml(labelFor(d.weather_code[i]))+'</div></div>';
    }
    target.innerHTML = html;
  }

  function ensureMap(key, containerId) {
    if (state.maps[key]) return state.maps[key];
    const map = L.map(containerId, { zoomControl: true, attributionControl: true }).setView([state.location.latitude, state.location.longitude], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
    state.maps[key] = map;
    state.markers[key] = L.circleMarker([state.location.latitude, state.location.longitude], { radius:7, color:'#fff', weight:2, fillColor:'#2390ff', fillOpacity:1 }).addTo(map);
    return map;
  }

  function updateMaps(loc) {
    ['main','focus'].forEach(key => {
      const map = state.maps[key]; if (!map) return;
      map.setView([loc.latitude, loc.longitude], map.getZoom() < 7 ? 8 : map.getZoom(), { animate: true });
      state.markers[key].setLatLng([loc.latitude, loc.longitude]);
    });
  }

  function clearRadarLayers() {
    ['main','focus'].forEach(key => { state.radarLayers[key].forEach(l => { try { state.maps[key] && state.maps[key].removeLayer(l); } catch {} }); state.radarLayers[key] = []; });
  }
  function stopRadar() { if (state.radarTimer) { clearInterval(state.radarTimer); state.radarTimer = null; } el.radarPlay.textContent='Play'; el.radarPlay2.textContent='Play'; }
  function setRadarControlsDisabled(disabled) { [el.radarPlay, el.radarPlay2, el.radarRange, el.radarRange2].forEach(c => c.disabled = disabled); }

  function showRadarFrame(index) {
    if (!state.radarFrames.length) return;
    state.radarIndex = (index + state.radarFrames.length) % state.radarFrames.length;
    ['main','focus'].forEach(key => state.radarLayers[key].forEach((layer,i)=>layer.setOpacity(i===state.radarIndex?0.75:0)));
    const frame = state.radarFrames[state.radarIndex];
    const d = new Date(frame.time * 1000);
    const label = (frame.kind === 'nowcast' ? 'Forecast ' : '') + new Intl.DateTimeFormat(undefined, { month:'short', day:'numeric', hour:'numeric', minute:'2-digit' }).format(d);
    el.radarTime.textContent = label; el.radarTime2.textContent = label;
    el.radarRange.value = String(state.radarIndex); el.radarRange2.value = String(state.radarIndex);
  }

  async function loadRadar() {
    ensureMap('main','radar-map'); ensureMap('focus','radar-map-2');
    stopRadar(); setRadarControlsDisabled(true);
    el.radarTime.textContent = 'Loading radar...'; el.radarTime2.textContent = 'Loading radar...';
    try {
      const data = await fetchJson('https://api.rainviewer.com/public/weather-maps.json');
      const past = (data.radar && data.radar.past ? data.radar.past.slice(-12) : []).map(f => ({...f, kind:'past'}));
      const nowcast = (data.radar && data.radar.nowcast ? data.radar.nowcast.slice(0,3) : []).map(f => ({...f, kind:'nowcast'}));
      const frames = past.concat(nowcast);
      state.radarHost = data.host || state.radarHost;
      clearRadarLayers();
      state.radarFrames = frames;
      el.radarRange.max = String(Math.max(0, frames.length-1)); el.radarRange2.max = String(Math.max(0, frames.length-1));
      if (!frames.length) { el.radarTime.textContent='Radar unavailable'; el.radarTime2.textContent='Radar unavailable'; return; }
      ['main','focus'].forEach(key => {
        const map = state.maps[key];
        frames.forEach((frame,i) => {
          const layer = L.tileLayer(state.radarHost + frame.path + '/256/{z}/{x}/{y}/2/1_1.png', { opacity: i===frames.length-1?0.75:0, zIndex:300 });
          layer.addTo(map); state.radarLayers[key].push(layer);
        });
      });
      showRadarFrame(Math.max(0, past.length-1));
      setRadarControlsDisabled(false);
    } catch (err) {
      console.error(err);
      el.radarTime.textContent = 'Radar failed to load'; el.radarTime2.textContent = 'Radar failed to load';
    }
  }

  function toggleRadarPlayback() {
    if (!state.radarFrames.length) return;
    if (state.radarTimer) { stopRadar(); return; }
    el.radarPlay.textContent='Pause'; el.radarPlay2.textContent='Pause';
    state.radarTimer = setInterval(() => showRadarFrame(state.radarIndex + 1), 700);
  }

  function sameLocation(a,b){ return a&&b && Math.abs(a.latitude-b.latitude)<0.01 && Math.abs(a.longitude-b.longitude)<0.01; }
  function renderSaved() {
    if (!state.saved.length) { el.savedList.innerHTML = '<div class="saved-empty">Save locations for quick access. Your saved places stay in this browser.</div>'; return; }
    el.savedList.innerHTML = state.saved.map((loc, idx) => {
      const meta=[loc.admin1,loc.country].filter(Boolean).join(', ');
      return '<div class="saved-item" role="button" tabindex="0" data-saved-idx="'+idx+'"><div><div class="saved-name">'+escapeHtml(loc.name)+'</div><div class="saved-meta">'+escapeHtml(meta||'Saved location')+'</div></div><button class="saved-remove" type="button" data-remove-idx="'+idx+'" aria-label="Remove saved location">✕</button></div>';
    }).join('');
  }
  function saveCurrentLocation() {
    const loc = state.location; if (!loc) return;
    if (state.saved.some(s => sameLocation(s, loc))) { setStatus('Location already saved.'); return; }
    state.saved.unshift({ name:loc.name, admin1:loc.admin1, country:loc.country, latitude:loc.latitude, longitude:loc.longitude, timezone:loc.timezone });
    state.saved = state.saved.slice(0,8); persistSaved(); renderSaved(); setStatus('Saved ' + loc.name + '.');
  }

  async function loadLocation(loc, label, opts={}) {
    const silent = !!opts.silent;
    if (!silent) setStatus(label || 'Loading weather...', 'loading');
    try {
      state.location = loc;
      const [weatherRes, aqiRes] = await Promise.allSettled([fetchWeather(loc), fetchAQI(loc)]);
      if (weatherRes.status !== 'fulfilled') throw weatherRes.reason;
      const weather = weatherRes.value;
      const aqi = aqiRes.status === 'fulfilled' ? aqiRes.value : null;
      if (!loc.timezone || loc.timezone === 'auto') loc.timezone = weather.timezone;
      state.weather = weather; state.aqi = aqi;
      renderCurrent(loc, weather, aqi);
      renderHourly(weather, el.hourly); renderHourly(weather, el.hourly2);
      renderDaily(weather, el.daily); renderDaily(weather, el.daily2);
      updateMaps(loc);
      if (aqiRes.status !== 'fulfilled') setStatus('Weather loaded, but air quality is unavailable right now.', 'error');
      else if (!silent) setStatus('');
      if (!state.radarFrames.length) loadRadar();
    } catch (err) {
      console.error(err);
      setStatus(err.message || 'Unable to load weather data.', 'error');
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    const q = el.searchInput.value.trim(); if (!q) return;
    setStatus('Searching for "'+q+'"...', 'loading');
    try { const loc = await searchLocation(q); await loadLocation(loc, 'Loading weather for ' + loc.name + '...'); el.searchInput.blur(); }
    catch (err) { console.error(err); setStatus(err.message || 'Search failed.', 'error'); }
  }

  function handleGeolocation() {
    if (!navigator.geolocation) { setStatus('Geolocation is not supported by your browser.', 'error'); return; }
    el.locationBtn.disabled = true; setStatus('Getting your location...', 'loading');
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try { const loc = await reverseGeocode(pos.coords.latitude, pos.coords.longitude); await loadLocation(loc, 'Loading weather for your location...'); }
      finally { el.locationBtn.disabled = false; }
    }, (err) => { console.warn(err); setStatus('Could not access your location. Please search for a city.', 'error'); el.locationBtn.disabled = false; }, { timeout:10000, maximumAge:300000 });
  }

  function toggleUnits() {
    state.unit = state.unit === 'f' ? 'c' : 'f'; persistUnit(); el.unitBtn.textContent = state.unit === 'f' ? '°F' : '°C';
    if (state.weather) { renderCurrent(state.location, state.weather, state.aqi); renderHourly(state.weather, el.hourly); renderHourly(state.weather, el.hourly2); renderDaily(state.weather, el.daily); renderDaily(state.weather, el.daily2); }
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', state.theme === 'light' ? '#eef4fb' : '#07111f');
    el.themeBtn.textContent = state.theme === 'light' ? 'Dark' : 'Light';
  }
  function toggleTheme() { state.theme = state.theme === 'light' ? 'dark' : 'light'; persistTheme(); applyTheme(); }

  function onSavedClick(e) {
    const removeBtn = e.target.closest('[data-remove-idx]');
    if (removeBtn) { const idx=Number(removeBtn.getAttribute('data-remove-idx')); const removed=state.saved[idx]; state.saved.splice(idx,1); persistSaved(); renderSaved(); if(removed) setStatus('Removed '+removed.name+'.'); return; }
    const item = e.target.closest('[data-saved-idx]'); if (!item) return;
    const idx = Number(item.getAttribute('data-saved-idx')); const loc = state.saved[idx];
    if (loc) loadLocation({ ...loc }, 'Loading weather for ' + loc.name + '...');
  }

  function syncRoute() {
    const route = (location.hash.replace('#/','') || 'dashboard');
    state.activeRoute = ['dashboard','radar','forecast','locations'].includes(route) ? route : 'dashboard';
    document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.id === 'page-' + state.activeRoute));
    document.querySelectorAll('.nav-link').forEach(a => a.classList.toggle('active', a.dataset.route === state.activeRoute));
    if (state.maps.main) setTimeout(() => state.maps.main.invalidateSize(), 60);
    if (state.maps.focus) setTimeout(() => state.maps.focus.invalidateSize(), 60);
  }

  function startAutoRefresh() {
    if (state.refreshTimer) clearInterval(state.refreshTimer);
    state.refreshTimer = setInterval(() => { if (state.location) loadLocation({ ...state.location }, '', { silent: true }); }, 10 * 60 * 1000);
    el.refreshIndicator.textContent = 'Auto-refresh: 10 min';
  }

  function bindEvents() {
    el.searchForm.addEventListener('submit', handleSearch);
    el.locationBtn.addEventListener('click', handleGeolocation);
    el.radarPlay.addEventListener('click', toggleRadarPlayback);
    el.radarPlay2.addEventListener('click', toggleRadarPlayback);
    el.radarRange.addEventListener('input', e => { stopRadar(); showRadarFrame(Number(e.target.value)); });
    el.radarRange2.addEventListener('input', e => { stopRadar(); showRadarFrame(Number(e.target.value)); });
    el.unitBtn.addEventListener('click', toggleUnits);
    el.themeBtn.addEventListener('click', toggleTheme);
    el.saveLocationBtn.addEventListener('click', saveCurrentLocation);
    el.clearSavedBtn.addEventListener('click', () => { state.saved=[]; persistSaved(); renderSaved(); setStatus('Saved locations cleared.'); });
    el.savedList.addEventListener('click', onSavedClick);
    el.savedList.addEventListener('keydown', e => { if (e.key === 'Enter') onSavedClick(e); });
    el.refreshBtn.addEventListener('click', () => loadLocation({ ...state.location }, 'Refreshing weather...'));
    window.addEventListener('hashchange', syncRoute);
  }

  async function init() {
    applyTheme();
    el.unitBtn.textContent = state.unit === 'f' ? '°F' : '°C';
    renderSaved();
    bindEvents();
    ensureMap('main','radar-map');
    ensureMap('focus','radar-map-2');
    syncRoute();
    startAutoRefresh();
    await loadLocation(DEFAULT_LOCATION, 'Loading weather...');
    loadRadar();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
