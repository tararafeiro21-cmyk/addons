# Read the Docs Addons — Weather Dashboard Example

A minimal static weather dashboard that fetches current weather from OpenWeatherMap and displays it.

Files:

- `index.html` — the dashboard UI
- `style.css` — simple styles
- `app.js` — fetches weather and updates the UI (ES module)
- `config.example.js` — example config with API key placeholder

Usage

1. Copy `config.example.js` to `config.js` and add your OpenWeatherMap API key:

   ```js
   // config.js
   export const OPENWEATHER_API_KEY = 'YOUR_API_KEY_HERE';
   ```

2. Serve the directory with a static server (or open `index.html` with a server):

   - With Node: `npx http-server examples/weather-dashboard` or
   - With Python: `python -m http.server 8000` from the `examples/weather-dashboard` folder

3. Open http://localhost:8080 (or the port your server uses) and search a city.

Notes

- This example intentionally does not include a real API key. Keep your key out of source control.
- If you want, I can add a tiny backend proxy to hide the API key and follow best practices.
