window.KRUIZLY_API = (() => {
  const cfg = window.KRUIZLY_CONFIG || {};
  async function get(path) {
    if (!cfg.USE_API) return null;
    try {
      const r = await fetch(`${cfg.API_BASE_URL}${path}`, {credentials:"include"});
      if (!r.ok) throw new Error(`API ${r.status}`);
      return await r.json();
    } catch (e) {
      console.warn("KRUIZLY API fallback:", path, e.message);
      return null;
    }
  }
  return {
    hubs: () => get("/hubs"),
    health: () => get("/health.php"),
    vehicles: () => get("/vehicles"),
    bookings: () => get("/bookings"),
    revenue: () => get("/revenue")
  };
})();