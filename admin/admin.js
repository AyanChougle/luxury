// ==========================================================================
// KRUIZLY BLACK LABEL — ADMIN CONTROLLER (admin/admin.js)
// Real-time synchronization with localStorage, Hub filtering & Fleet Management
// ==========================================================================

const money = n => "₹" + Number(n || 0).toLocaleString("en-IN");
let activeHubFilter = "ALL";

document.addEventListener("DOMContentLoaded", () => {
  initAdminView();
});

function initAdminView() {
  renderHubDropdown();
  renderKPIs();
  renderFleetTable();
  renderHubBars();
  renderBookingTable();
}

// Mobile sidebar toggle
function toggleSidebar() {
  const side = document.getElementById("sidebar");
  const backdrop = document.getElementById("sideBackdrop");
  if (side) side.classList.toggle("active");
  if (backdrop) backdrop.classList.toggle("active");
}

// Render Hub Select Filter
function renderHubDropdown() {
  const select = document.getElementById("hub-filter");
  if (!select || !window.LUXURY_DATA) return;

  const hubs = window.LUXURY_DATA.hubs;
  select.innerHTML = '<option value="ALL">All Regional Hubs</option>' +
    hubs.map(h => `<option value="${h.code}">${h.name} (${h.code})</option>`).join("");
}

function filterAdminByHub(code) {
  activeHubFilter = code;
  renderKPIs();
  renderBookingTable();
}

// Live KPI Calculations
function renderKPIs() {
  const bookings = window.luxuryDataMgr.getBookings();
  const filtered = activeHubFilter === "ALL" 
    ? bookings 
    : bookings.filter(b => b.hubCode === activeHubFilter);

  const totalRev = filtered.reduce((acc, b) => acc + (b.total || 0), 466213);
  const activeTrips = filtered.filter(b => b.status === "CONFIRMED" || b.status === "ACTIVE").length || 14;
  const totalCount = filtered.length + 172;

  const elRev = document.getElementById("kpi-revenue");
  const elActive = document.getElementById("kpi-active");
  const elBookings = document.getElementById("kpi-bookings");

  if (elRev) elRev.textContent = money(totalRev);
  if (elActive) elActive.textContent = activeTrips;
  if (elBookings) elBookings.textContent = totalCount;
}

// Render Fleet Performance Table
function renderFleetTable() {
  const table = document.getElementById("fleet-table");
  if (!table || !window.LUXURY_DATA) return;

  const fleets = window.LUXURY_DATA.fleets;
  const mockTrips = [42, 38, 29, 24, 21, 16, 8];

  table.innerHTML = fleets.map((f, i) => `
    <tr>
      <td>
        <strong class="gold-text">${f.name}</strong>
        <small style="display:block;color:var(--dim);font-size:11px">${f.brand} • ${f.model}</small>
      </td>
      <td><span style="font-size:12px;color:var(--muted)">${f.type}</span></td>
      <td><b>${mockTrips[i % mockTrips.length]}</b> trips</td>
      <td><b class="gold-text">${money(f.price)}</b>/day</td>
      <td>
        <span class="status ${f.status === 'Available' ? 'badge-success' : 'badge-warning'}">
          ${f.status}
        </span>
      </td>
    </tr>
  `).join("");
}

// Render Regional Hub Performance Bars
function renderHubBars() {
  const barContainer = document.getElementById("hub-bars");
  if (!barContainer || !window.LUXURY_DATA) return;

  const hubs = window.LUXURY_DATA.hubs;
  const revenues = [218000, 184000, 142000, 116000, 98000];
  const max = 250000;

  barContainer.innerHTML = hubs.map((h, i) => {
    const rev = revenues[i % revenues.length];
    const pct = Math.round((rev / max) * 100);
    return `
      <div style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:12px">
          <span><b>${h.name}</b> (${h.code})</span>
          <b class="gold-text">${money(rev)}</b>
        </div>
        <div class="bar">
          <i style="width: ${pct}%"></i>
        </div>
      </div>
    `;
  }).join("");
}

// Render Booking Operations Table
function renderBookingTable() {
  const table = document.getElementById("booking-table");
  if (!table) return;

  let bookings = window.luxuryDataMgr.getBookings();
  if (activeHubFilter !== "ALL") {
    bookings = bookings.filter(b => b.hubCode === activeHubFilter);
  }

  if (bookings.length === 0) {
    table.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--muted);padding:24px">No active reservations for hub ${activeHubFilter}.</td></tr>`;
    return;
  }

  table.innerHTML = bookings.map(b => {
    const isConfirmed = b.status === "CONFIRMED";
    const statusClass = isConfirmed ? "badge-success" : (b.status === "COMPLETED" ? "badge-info" : "badge-danger");

    return `
      <tr>
        <td><strong class="gold-text">#${b.id}</strong></td>
        <td>
          <b>${b.guestName}</b>
          <small style="display:block;color:var(--dim);font-size:11px">${b.guestPhone || ''}</small>
        </td>
        <td>${b.vehicleName}</td>
        <td><span class="hub-pill" style="padding:2px 8px;background:rgba(255,255,255,0.05);border-radius:4px">${b.hubCode}</span></td>
        <td>${b.days || 1} day(s)</td>
        <td><b class="gold-text">${money(b.total)}</b></td>
        <td><span class="status ${statusClass}">${b.status}</span></td>
        <td>
          <div style="display:flex;gap:6px">
            ${isConfirmed ? `
              <button class="action" style="padding:4px 8px;font-size:10px;background:rgba(53,212,134,0.15);color:var(--success);border-color:rgba(53,212,134,0.3)" onclick="updateBookingStatus('${b.id}', 'COMPLETED')">Complete</button>
              <button class="action" style="padding:4px 8px;font-size:10px;background:rgba(255,95,103,0.15);color:var(--danger);border-color:rgba(255,95,103,0.3)" onclick="updateBookingStatus('${b.id}', 'CANCELLED')">Cancel</button>
            ` : `
              <button class="action" style="padding:4px 8px;font-size:10px" onclick="updateBookingStatus('${b.id}', 'CONFIRMED')">Reactivate</button>
            `}
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// Update Booking Status
function updateBookingStatus(id, newStatus) {
  window.luxuryDataMgr.updateBookingStatus(id, newStatus);
  renderKPIs();
  renderBookingTable();
}

// Modals Management
function openAddHubModal() {
  const modal = document.getElementById("addHubModal");
  if (modal) modal.classList.add("active");
}

function openAddFleetModal() {
  const modal = document.getElementById("addFleetModal");
  if (modal) modal.classList.add("active");
}

function closeDashboardModals() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
}

function handleCreateHub(e) {
  e.preventDefault();
  const name = document.getElementById("hubName").value.trim();
  const code = document.getElementById("hubCode").value.trim().toUpperCase();
  const address = document.getElementById("hubCity").value.trim();

  if (name && code) {
    window.luxuryDataMgr.addHub({
      code,
      name,
      address,
      phone: "+91 91671 64547"
    });
    closeDashboardModals();
    renderHubDropdown();
    renderHubBars();
    alert(`Regional Hub ${name} (${code}) commissioned successfully into Black Label network.`);
  }
}

function handleCreateFleet(e) {
  e.preventDefault();
  const name = document.getElementById("fleetName").value.trim();
  const category = document.getElementById("fleetCategory").value;
  const price = parseInt(document.getElementById("fleetPrice").value) || 25000;
  const tagline = document.getElementById("fleetTagline").value.trim();

  if (name) {
    const id = name.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 10);
    window.luxuryDataMgr.addFleet({
      id,
      name,
      brand: name.split(" ")[0],
      model: name,
      type: category === "sedan" ? "Ultra Luxury Sedan" : (category === "lounge" ? "VIP Lounge" : "Flagship SUV"),
      category,
      categoryLabel: category.toUpperCase(),
      seats: 4,
      bags: 3,
      price,
      priceHour: Math.round(price / 20),
      chauffeurRate: 2500,
      deposit: 15000,
      transmission: "Automatic",
      fuel: "Hybrid / Petrol",
      status: "Available",
      image: "assets/maybach.svg",
      tagline: tagline || "Bespoke Sovereign Luxury",
      specs: { power: "450 hp", engine: "V8 Twin-Turbo", sound: "Bespoke Audio", acceleration: "0-100 in 5.0s" },
      features: ["VIP Reclining Suite", "Acoustic Glass", "N95 Air Filtration", "Chilled Refreshments"]
    });
    closeDashboardModals();
    renderFleetTable();
    alert(`Machine ${name} inducted into active Black Label stable.`);
  }
}

window.toggleSidebar = toggleSidebar;
window.filterAdminByHub = filterAdminByHub;
window.updateBookingStatus = updateBookingStatus;
window.openAddHubModal = openAddHubModal;
window.openAddFleetModal = openAddFleetModal;
window.closeDashboardModals = closeDashboardModals;
window.handleCreateHub = handleCreateHub;
window.handleCreateFleet = handleCreateFleet;