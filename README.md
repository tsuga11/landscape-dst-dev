# MapLibre GL JS Port — DST Map Application

Drop-in replacement for the Leaflet version of app.js.
Config.js is unchanged — no data or criteria need updating.

## What's new

- **Tilt/pitch** — right-click drag (desktop) or two-finger drag (touch)
- **Rotate** — two-finger rotate gesture, or Ctrl+drag
- **3D terrain** — enable in config.js with `terrain: true`
- **Hardware-accelerated** WebGL rendering — much faster on large datasets
- **Compass** in the navigation control — click to reset north/bearing

## Files changed vs. Leaflet version

| File | Change |
|------|--------|
| `shared/app.js` | Full rewrite — MapLibre API |
| `geographies/hamakua/index.html` | CDN swap (Leaflet → MapLibre), new layer panel |
| `shared/style.css` | Unchanged |
| `geographies/hamakua/config.js` | Unchanged |

## New config.js options

```javascript
const CONFIG = {
  // ... existing options unchanged ...

  // 3D terrain (optional)
  terrain: true,                  // enable terrain extrusion
  terrainExaggeration: 1.5,       // vertical scale (1 = real, 2 = double height)

  // Initial camera (optional)
  defaultPitch:   30,             // tilt angle 0-85
  defaultBearing: 0,              // rotation 0-360

  // Default basemap (light | dark | osm)
  defaultBasemap: 'light',
};
```

## Basemap options

| Key | Style | API key needed? |
|-----|-------|----------------|
| `light` | CartoDB Positron | No |
| `dark` | CartoDB Dark Matter | No |
| `osm` | OpenFreeMap Liberty | No |
| `satellite` | MapTiler Satellite | Yes (free tier) |
| `topo` | MapTiler Topo | Yes (free tier) |

For satellite/topo, get a free API key at maptiler.com and replace
`get_your_own_OpIi9ZULNHzrESv6T2vL` in app.js with your key.

## Deployment

Same as the Leaflet version — drop into your GitHub repo.
The only file that changes at the repo level is `shared/app.js`
and `geographies/hamakua/index.html`.

Config.js and all data files are untouched.
