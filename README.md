# KRUIZLY ULTRA LUXURY

Premium luxury mobility extension for KRUIZLY.

## Included
- Luxury public booking website
- Fleet showcase: Mercedes-Maybach, Toyota Vellfire, Mercedes-Benz S-Class, BMW 7 Series, Range Rover, luxury coaches and custom fleets
- Gold / black visual system
- Admin dashboard
- Manager dashboard
- Executive dashboard
- Hub-aware fleet and revenue structure
- Booking analytics
- Fleet performance
- Revenue by hub
- Role-aware navigation
- Responsive mobile navigation
- API-ready configuration for `https://kruizly.com/api`

## Run
Open `index.html` in a browser for the static prototype.

For local development:
`python -m http.server 5500`

Then open:
`http://localhost:5500`

## KRUIZLY API
Edit `shared/config.js`:

```js
window.KRUIZLY_CONFIG = {
  API_BASE_URL: "https://kruizly.com/api",
  USE_API: true
};
```

The UI uses graceful local fallback data if the API is unavailable. Replace the adapter methods in `shared/api.js` with the exact production endpoint contracts when connecting to the live backend.

## Roles
- SUPER_ADMIN: all administration
- ADMIN: fleet, hubs, bookings, pricing and revenue
- MANAGER: selected-hub operational KPIs and fleet performance
- EXECUTIVE: executive revenue, utilization and booking intelligence
