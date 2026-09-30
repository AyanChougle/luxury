// ==========================================================================
// KRUIZLY BLACK LABEL — CLIENT CONTROLLER (shared/app.js)
// Fleet rendering, Category & Search Filtering, Vehicle Dossier Modal,
// Live Fare Calculation, VIP Booking Engine & WhatsApp Dispatch.
// ==========================================================================

const money = n => "₹" + Number(n || 0).toLocaleString("en-IN");

let currentCategory = "all";
let currentSearchQuery = "";
let activeVehicleId = "MAYBACH";
let appliedCouponDiscount = 0;

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  parseUrlParams();
  populateDropdowns();
  renderFleetGrid();
  initFleetFilterTabs();
  initFleetSearch();
  initBookingCalculator();
  initHeroShowcase();
  initBookingsPage();
});

// Mobile Navigation
function initMobileNav() {
  const menuBtn = document.querySelector(".menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      document.body.classList.toggle("menu-open");
    });
  }

  // Close drawer on link click
  document.querySelectorAll(".mobile-drawer a").forEach(a => {
    a.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
    });
  });
}

// Parse URL Parameters (e.g. ?fleet=VELLFIRE&hub=DEL)
function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const fleetParam = params.get("fleet");
  const hubParam = params.get("hub");
  const catParam = params.get("cat");

  if (fleetParam) {
    activeVehicleId = fleetParam.toUpperCase();
  }
  if (catParam) {
    currentCategory = catParam.toLowerCase();
  }
}

// ==========================================================================
// HERO AUTOMATIC SLIDESHOW ENGINE
// Cycles through the 8 premier vehicles with progress bar, pause/resume, and dots
// ==========================================================================

const HERO_SLIDES = [
  { id: "GHOST", name: "Rolls-Royce Ghost Series II", tagline: "Post-Opulent Perfection & Peerless Prestige", image: "assets/ghost.png", price: 65000, seats: "4 VIP Seats", power: "563 hp V12" },
  { id: "MAYBACH", name: "Mercedes-Maybach S-Class", tagline: "The Benchmark of Sovereign Chauffeur Travel", image: "assets/maybach.png", price: 25000, seats: "4 VIP Seats", power: "503 hp V8 Biturbo" },
  { id: "VELLFIRE", name: "Toyota Vellfire Lounge", tagline: "Private Jet Mobility on the Ground", image: "assets/vellfire.png", price: 18000, seats: "6 VIP Seats", power: "193 hp Hybrid Glide" },
  { id: "M9", name: "MG M9 EV Sovereign Lounge", tagline: "Zero-Emission Boardroom on Wheels", image: "assets/m9.png", price: 17500, seats: "6 VIP Seats", power: "245 hp Pure EV" },
  { id: "RANGEROVER", name: "Range Rover Autobiography", tagline: "Commanding Presence with Unmatched Serenity", image: "assets/rangerover.png", price: 24000, seats: "5 VIP Seats", power: "350 hp Twin-Turbo" },
  { id: "BMW7", name: "BMW 7 Series Protection", tagline: "Futuristic Authority & Cinematic Travel", image: "assets/bmw7.png", price: 19000, seats: "4 VIP Seats", power: "381 hp TwinPower" },
  { id: "SCLASS", name: "Mercedes-Benz S-Class", tagline: "Unrivaled Elegance for Modern Executives", image: "assets/sclass.png", price: 20000, seats: "4 VIP Seats", power: "367 hp Inline-6" }
];

let heroSlideIndex = 0;
let heroProgressTimer = null;
let heroSlideIsPaused = false;
let heroSlideProgress = 0;
const HERO_SLIDE_DURATION = 4000;
const HERO_PROGRESS_STEP = 50;

function initHeroShowcase() {
  const heroCarPreview = document.getElementById("heroCarPreview");
  if (!heroCarPreview) return;

  // Preload all slideshow images for instant transitions
  HERO_SLIDES.forEach(s => {
    const img = new Image();
    img.src = s.image;
  });

  // Check if an activeVehicleId was supplied via URL or initial state
  const foundIdx = HERO_SLIDES.findIndex(s => s.id === activeVehicleId);
  if (foundIdx >= 0) heroSlideIndex = foundIdx;

  renderHeroSlide(heroSlideIndex, false);
  startHeroProgressTimer();

  // Attach hover pause/resume events to the showcase stage
  const heroCarContainer = document.querySelector(".hero-car");
  if (heroCarContainer) {
    heroCarContainer.addEventListener("mouseenter", () => {
      heroSlideIsPaused = true;
      updatePlayPauseButton();
    });
    heroCarContainer.addEventListener("mouseleave", () => {
      heroSlideIsPaused = false;
      updatePlayPauseButton();
    });
  }
}

function renderHeroSlide(index, animate = true) {
  const slide = HERO_SLIDES[index];
  if (!slide) return;

  const preview = document.getElementById("heroCarPreview");
  const nameEl = document.getElementById("heroCarName");
  const taglineEl = document.getElementById("heroCarTagline");
  const priceEl = document.getElementById("heroCarPrice");
  const seatsEl = document.getElementById("heroCarSeats");
  const powerEl = document.getElementById("heroCarPower");
  const reserveBtn = document.getElementById("heroReserveBtn");

  if (preview) {
    if (animate) {
      preview.style.opacity = "0";
      preview.style.transform = "scale(0.96)";
      setTimeout(() => {
        preview.src = slide.image;
        preview.alt = slide.name;
        preview.style.opacity = "1";
        preview.style.transform = "scale(1)";
      }, 180);
    } else {
      preview.src = slide.image;
      preview.alt = slide.name;
      preview.style.opacity = "1";
      preview.style.transform = "scale(1)";
    }
  }

  if (nameEl) nameEl.textContent = slide.name;
  if (taglineEl) taglineEl.textContent = slide.tagline;
  if (priceEl) priceEl.textContent = money(slide.price);
  if (seatsEl) seatsEl.textContent = slide.seats;
  if (powerEl) powerEl.textContent = slide.power;
  if (reserveBtn) reserveBtn.textContent = `Reserve ${slide.name} →`;

  activeVehicleId = slide.id;

  // Update dots
  document.querySelectorAll(".slideshow-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  // Update switcher pills
  document.querySelectorAll(".hero-pill").forEach(pill => {
    const pillId = pill.dataset.slide || pill.getAttribute("data-slide");
    pill.classList.toggle("active", pillId === slide.id);
  });
}

function startHeroProgressTimer() {
  if (heroProgressTimer) clearInterval(heroProgressTimer);
  heroSlideProgress = 0;
  const bar = document.getElementById("heroProgressBar");
  if (bar) bar.style.width = "0%";

  heroProgressTimer = setInterval(() => {
    if (!heroSlideIsPaused) {
      heroSlideProgress += (HERO_PROGRESS_STEP / HERO_SLIDE_DURATION) * 100;
      if (bar) bar.style.width = `${Math.min(heroSlideProgress, 100)}%`;

      if (heroSlideProgress >= 100) {
        heroSlideshowNext();
      }
    }
  }, HERO_PROGRESS_STEP);
}

function heroSlideshowNext() {
  heroSlideIndex = (heroSlideIndex + 1) % HERO_SLIDES.length;
  renderHeroSlide(heroSlideIndex, true);
  startHeroProgressTimer();
}

function heroSlideshowPrev() {
  heroSlideIndex = (heroSlideIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
  renderHeroSlide(heroSlideIndex, true);
  startHeroProgressTimer();
}

function goToHeroSlide(target) {
  if (typeof target === "string") {
    const idx = HERO_SLIDES.findIndex(s => s.id === target.toUpperCase());
    if (idx >= 0) heroSlideIndex = idx;
  } else if (typeof target === "number") {
    heroSlideIndex = target % HERO_SLIDES.length;
  }
  renderHeroSlide(heroSlideIndex, true);
  startHeroProgressTimer();
}

function toggleHeroSlideshowPlayPause() {
  heroSlideIsPaused = !heroSlideIsPaused;
  updatePlayPauseButton();
}

function updatePlayPauseButton() {
  const btn = document.getElementById("heroPlayPauseBtn");
  if (btn) {
    btn.innerHTML = heroSlideIsPaused ? "▶ Play Auto" : "❚❚ Pause";
    btn.setAttribute("title", heroSlideIsPaused ? "Resume auto slideshow" : "Pause auto slideshow");
  }
}

function reserveCurrentHeroCar() {
  const currentSlide = HERO_SLIDES[heroSlideIndex];
  if (!currentSlide) return;
  selectAndBookFleet(currentSlide.id);
}

// Populate select inputs for Fleet & Regional Hubs
function populateDropdowns() {
  const fleetSelect = document.getElementById("booking-fleet");
  const hubSelect = document.getElementById("booking-hub");
  if (!window.LUXURY_DATA) return;

  if (fleetSelect) {
    fleetSelect.innerHTML = window.LUXURY_DATA.fleets.map(f => `
      <option value="${f.id}" ${f.id === activeVehicleId ? 'selected' : ''}>
        ${f.name} — (${money(f.price)}/day)
      </option>
    `).join("");
  }

  if (hubSelect) {
    const activeHub = window.luxuryDataMgr.getActiveHub();
    hubSelect.innerHTML = window.LUXURY_DATA.hubs.map(h => `
      <option value="${h.code}" ${h.code === activeHub ? 'selected' : ''}>
        ${h.name} (${h.code})
      </option>
    `).join("");
  }

  // Pre-set default pickup and return dates
  const pickupInput = document.getElementById("booking-pickup");
  const returnInput = document.getElementById("booking-return");
  if (pickupInput && returnInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 2);

    const pad = n => String(n).padStart(2, "0");
    const fmt = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    if (!pickupInput.value) pickupInput.value = fmt(today);
    if (!returnInput.value) returnInput.value = fmt(tomorrow);
  }
}

// Fleet Grid Rendering with Category & Search Filters
function renderFleetGrid() {
  const grid = document.getElementById("fleet-grid");
  if (!grid || !window.LUXURY_DATA) return;

  const fleets = window.luxuryDataMgr.getFleets(currentCategory, currentSearchQuery);

  if (fleets.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:50px 20px;background:var(--surface);border-radius:var(--radius-md);border:1px solid var(--line-subtle)">
        <p style="color:var(--gold2);font-family:var(--display);font-size:20px;margin-bottom:8px">No machines match your criteria</p>
        <p style="color:var(--muted);font-size:13px">Please clear search or select another category discipline.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = fleets.map(f => `
    <article class="fleet-card" data-id="${f.id}">
      <div class="fleet-image">
        <span class="fleet-badge">${f.status}</span>
        <img src="${f.image}" alt="${f.name}" loading="lazy" onerror="this.src='assets/maybach.png'">
      </div>
      <div class="fleet-info">
        <span class="category">${f.categoryLabel || f.type}</span>
        <h3>${f.name}</h3>
        <p class="tagline">${f.tagline || "Executive sovereign mobility."}</p>
        
        <div class="fleet-pills">
          <span class="fleet-pill">${f.seats} VIP Seats</span>
          <span class="fleet-pill">${f.bags} Luggage</span>
          <span class="fleet-pill">${f.transmission}</span>
        </div>
      </div>
      <div class="fleet-bottom">
        <div class="price">
          From <strong>${money(f.price)}</strong> / day
        </div>
        <div class="fleet-actions">
          <button type="button" class="btn-detail" onclick="openVehicleDossier('${f.id}')">Specs</button>
          <button type="button" class="btn-book" onclick="selectAndBookFleet('${f.id}')">Reserve</button>
        </div>
      </div>
    </article>
  `).join("");
}

function initFleetFilterTabs() {
  const tabs = document.querySelectorAll(".fleet-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategory = tab.dataset.category || "all";
      renderFleetGrid();
    });
  });
}

function initFleetSearch() {
  const searchInput = document.getElementById("fleet-search");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      currentSearchQuery = e.target.value;
      renderFleetGrid();
    });
  }
}

// Vehicle Dossier Modal
function openVehicleDossier(id) {
  const vehicle = window.luxuryDataMgr.getFleetById(id);
  if (!vehicle) return;

  const modal = document.getElementById("vehicleModal");
  const modalContent = document.getElementById("vehicleModalContent");
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div style="text-align:center;margin-bottom:20px;background:radial-gradient(circle, #252525 0%, #0d0d0d 75%);padding:24px;border-radius:var(--radius-md)">
      <img src="${vehicle.image}" alt="${vehicle.name}" style="max-height:220px;width:100%;object-fit:contain;filter:drop-shadow(0 15px 25px rgba(0,0,0,0.8))">
    </div>
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:14px;flex-wrap:wrap;gap:10px">
      <div>
        <span style="font-size:11px;color:var(--gold);text-transform:uppercase;letter-spacing:0.12em">${vehicle.type}</span>
        <h2 style="font-family:var(--display);font-size:26px;margin:4px 0">${vehicle.name}</h2>
        <p style="color:var(--muted);font-size:13px">${vehicle.tagline}</p>
      </div>
      <div style="text-align:right">
        <span style="font-size:11px;color:var(--muted)">Daily Tariff</span>
        <div style="font-size:24px;font-family:var(--display);color:var(--gold2)">${money(vehicle.price)}</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;background:rgba(255,255,255,0.03);padding:14px;border-radius:var(--radius-sm);border:1px solid var(--line-subtle);margin-bottom:20px">
      <div><span style="font-size:10px;color:var(--muted);display:block">POWERTRAIN</span><strong>${vehicle.specs.engine}</strong></div>
      <div><span style="font-size:10px;color:var(--muted);display:block">OUTPUT</span><strong>${vehicle.specs.power}</strong></div>
      <div><span style="font-size:10px;color:var(--muted);display:block">ACOUSTICS</span><strong>${vehicle.specs.sound}</strong></div>
      <div><span style="font-size:10px;color:var(--muted);display:block">SECURITY DEPOSIT</span><strong>${money(vehicle.deposit)}</strong></div>
    </div>

    <h4 style="font-family:var(--display);font-size:16px;color:var(--gold2);margin-bottom:12px">Bespoke Suite Amenities</h4>
    <ul style="list-style:none;padding:0;margin-bottom:24px">
      ${vehicle.features.map(feat => `
        <li style="display:flex;align-items:center;gap:10px;font-size:13px;color:#ccc;margin-bottom:8px">
          <span style="color:var(--gold)">✓</span> ${feat}
        </li>
      `).join("")}
    </ul>

    <button type="button" class="btn gold full" onclick="selectAndBookFleet('${vehicle.id}'); closeModals();">
      Proceed to Reserve This Vehicle →
    </button>
  `;

  modal.classList.add("active");
}

function selectAndBookFleet(id) {
  activeVehicleId = id;
  const fleetSelect = document.getElementById("booking-fleet");
  if (fleetSelect) {
    fleetSelect.value = id;
    calculateFare();
  }

  const bookSection = document.getElementById("book");
  if (bookSection) {
    bookSection.scrollIntoView({ behavior: "smooth" });
  } else {
    // If on another page, navigate to booking.html or index.html#book
    window.location.href = `booking.html?fleet=${id}`;
  }
}

// Live Fare & Duration Calculation
function initBookingCalculator() {
  const inputs = ["booking-fleet", "booking-pickup", "booking-return", "booking-chauffeur"];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", calculateFare);
  });
  calculateFare();
}

function calculateFare() {
  const fleetSelect = document.getElementById("booking-fleet");
  const pickupInput = document.getElementById("booking-pickup");
  const returnInput = document.getElementById("booking-return");
  const chauffeurInput = document.getElementById("booking-chauffeur");

  if (!fleetSelect || !pickupInput || !returnInput) return;

  const vehicle = window.luxuryDataMgr.getFleetById(fleetSelect.value) || window.LUXURY_DATA.fleets[0];
  if (!vehicle) return;

  const d1 = new Date(pickupInput.value);
  const d2 = new Date(returnInput.value);
  
  let days = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
  if (days < 1 || isNaN(days)) days = 1;

  const includeChauffeur = chauffeurInput ? chauffeurInput.checked : true;
  const vehicleBase = vehicle.price * days;
  const chauffeurFee = includeChauffeur ? (vehicle.chauffeurRate || 2500) * days : 0;
  const subtotal = vehicleBase + chauffeurFee;
  const discount = Math.round(subtotal * (appliedCouponDiscount / 100));
  const gst = Math.round((subtotal - discount) * 0.18);
  const total = subtotal - discount + gst;

  // Update UI Elements
  const elDays = document.getElementById("est-days");
  const elBase = document.getElementById("est-base");
  const elChauffeur = document.getElementById("est-chauffeur");
  const elDiscount = document.getElementById("est-discount");
  const elDiscountRow = document.getElementById("est-discount-row");
  const elGst = document.getElementById("est-gst");
  const elTotal = document.getElementById("est-total");

  if (elDays) elDays.textContent = `${days} day${days > 1 ? 's' : ''}`;
  if (elBase) elBase.textContent = money(vehicleBase);
  if (elChauffeur) elChauffeur.textContent = money(chauffeurFee);
  if (elGst) elGst.textContent = money(gst);
  if (elTotal) elTotal.textContent = money(total);

  if (elDiscountRow && elDiscount) {
    if (discount > 0) {
      elDiscountRow.style.display = "flex";
      elDiscount.textContent = `-${money(discount)} (${appliedCouponDiscount}%)`;
    } else {
      elDiscountRow.style.display = "none";
    }
  }

  return { days, vehicleBase, chauffeurFee, discount, gst, total, vehicle };
}

// Promo Code Applicator
function applyPromoCode() {
  const input = document.getElementById("promo-input");
  const statusEl = document.getElementById("promo-status");
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (code === "VIPLUXURY") {
    appliedCouponDiscount = 15;
    if (statusEl) {
      statusEl.style.color = "var(--gold2)";
      statusEl.textContent = "VIPLUXURY applied: 15% Concierge Privilege Discount active.";
    }
  } else if (code === "ROYAL20") {
    appliedCouponDiscount = 20;
    if (statusEl) {
      statusEl.style.color = "var(--gold2)";
      statusEl.textContent = "ROYAL20 applied: 20% Diplomatic Allocation Discount active.";
    }
  } else {
    appliedCouponDiscount = 0;
    if (statusEl) {
      statusEl.style.color = "var(--danger)";
      statusEl.textContent = "Invalid or expired luxury code.";
    }
  }
  calculateFare();
}

// Request Concierge / Booking Submission
function requestRide(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.guestName.value.trim();
  const phone = form.guestPhone.value.trim();
  const email = form.guestEmail ? form.guestEmail.value.trim() : "";
  const hubCode = document.getElementById("booking-hub") ? document.getElementById("booking-hub").value : "BOM";
  const pickupCity = form.pickupCity.value.trim();
  const pickupDate = document.getElementById("booking-pickup").value;
  const returnDate = document.getElementById("booking-return").value;
  const notes = form.guestNotes ? form.guestNotes.value.trim() : "";

  if (!name || !phone || !pickupCity) {
    alert("Please provide your name, phone number, and pickup location.");
    return;
  }

  const fare = calculateFare() || {
    days: 1,
    total: 25000,
    vehicle: window.luxuryDataMgr.getFleetById("MAYBACH")
  };

  const newBooking = {
    id: "KZ-UL-" + Math.floor(1060 + Math.random() * 8900),
    guestName: name,
    guestPhone: phone,
    guestEmail: email || "concierge-guest@kruizly.com",
    vehicleId: fare.vehicle.id,
    vehicleName: fare.vehicle.name,
    hubCode,
    pickupCity,
    pickupDate,
    returnDate,
    days: fare.days,
    chauffeur: document.getElementById("booking-chauffeur")?.checked ?? true,
    total: fare.total,
    notes,
    status: "CONFIRMED"
  };

  // Save to persistent storage
  window.luxuryDataMgr.addBooking(newBooking);

  // Render VIP Pass Modal
  showBookingConfirmationPass(newBooking);
  form.reset();
  populateDropdowns();
  calculateFare();
}

// Show Booking Confirmation Modal
function showBookingConfirmationPass(b) {
  const modal = document.getElementById("passModal");
  const content = document.getElementById("passModalContent");
  if (!modal || !content) return;

  const vehicle = window.luxuryDataMgr.getFleetById(b.vehicleId);

  content.innerHTML = `
    <div style="text-align:center;padding:10px 0 20px;border-bottom:1px solid var(--line-subtle)">
      <div style="font-size:10px;letter-spacing:0.25em;color:var(--gold);font-weight:700">KRUIZLY BLACK LABEL • VIP PASS</div>
      <h2 style="font-family:var(--display);font-size:30px;margin:8px 0;color:var(--gold2)">Reservation Confirmed</h2>
      <div style="display:inline-block;padding:4px 14px;background:rgba(53,212,134,0.15);border:1px solid rgba(53,212,134,0.3);color:var(--success);border-radius:var(--radius-pill);font-weight:700;font-size:12px">
        REFERENCE: #${b.id}
      </div>
    </div>

    <div style="margin:24px 0;display:grid;grid-template-columns:1.2fr 1fr;gap:20px;align-items:center">
      <div>
        <span style="font-size:11px;color:var(--gold);text-transform:uppercase">Assigned Machine</span>
        <h3 style="font-family:var(--display);font-size:22px;margin:4px 0">${b.vehicleName}</h3>
        <p style="color:var(--muted);font-size:13px">${b.pickupCity} • Hub ${b.hubCode}</p>
        <div style="font-size:13px;color:#aaa;margin-top:8px">
          <div><b>Pickup:</b> ${b.pickupDate}</div>
          <div><b>Return:</b> ${b.returnDate} (${b.days} Day${b.days > 1 ? 's' : ''})</div>
          <div><b>Protocol:</b> ${b.chauffeur ? 'Dedicated White-Glove Chauffeur' : 'Executive Self-Drive'}</div>
        </div>
      </div>
      <div style="text-align:center;background:radial-gradient(circle, #252525 0%, #0e0e0e 80%);padding:14px;border-radius:var(--radius-sm)">
        <img src="${vehicle ? vehicle.image : 'assets/maybach.png'}" style="max-height:100px;width:100%;object-fit:contain">
        <div style="font-size:22px;font-family:var(--display);color:var(--gold2);margin-top:8px">${money(b.total)}</div>
        <small style="color:var(--dim);font-size:11px">Inclusive of all taxes & insurance</small>
      </div>
    </div>

    <div style="background:rgba(199,163,90,0.06);padding:14px;border-radius:var(--radius-sm);border-left:3px solid var(--gold);font-size:12px;color:#ccc;margin-bottom:24px">
      Our 24/7 VIP mobility concierge has dispatched this reservation to the <b>${b.hubCode} Executive Hub</b>. Your chauffeur credentials will arrive 3 hours prior to departure.
    </div>

    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <a href="https://wa.me/919167164547?text=${encodeURIComponent(`Hello KRUIZLY Concierge, I have reserved booking #${b.id} for the ${b.vehicleName} from ${b.pickupDate}.`)}" target="_blank" rel="noopener" class="btn gold" style="flex:1;text-align:center;font-size:12px">
        Chat with Concierge on WhatsApp
      </a>
      <a href="bookings.html" class="btn ghost" style="font-size:12px">View in My Bookings</a>
      <button type="button" class="btn ghost" onclick="closeModals()" style="font-size:12px">Close Pass</button>
    </div>
  `;

  modal.classList.add("active");
}

// My Bookings Page Handler (for bookings.html)
function initBookingsPage() {
  const container = document.getElementById("bookings-list");
  if (!container || !window.luxuryDataMgr) return;

  const bookings = window.luxuryDataMgr.getBookings();
  if (bookings.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:60px 20px;background:var(--surface);border-radius:var(--radius-md);border:1px solid var(--line-subtle)">
        <h3 style="font-family:var(--display);font-size:24px;color:var(--gold2);margin-bottom:8px">No Reservations Found</h3>
        <p style="color:var(--muted);font-size:14px;margin-bottom:20px">You have not scheduled any Black Label itineraries yet.</p>
        <a href="booking.html" class="btn gold">Schedule Your First Machine</a>
      </div>
    `;
    return;
  }

  container.innerHTML = bookings.map(b => {
    const vehicle = window.luxuryDataMgr.getFleetById(b.vehicleId);
    const isConfirmed = b.status === "CONFIRMED";
    const statusBg = isConfirmed 
      ? 'background:rgba(53,212,134,0.15);color:var(--success);border-color:rgba(53,212,134,0.3)'
      : (b.status === 'COMPLETED' ? 'background:rgba(79,215,255,0.15);color:var(--info);border-color:rgba(79,215,255,0.3)' : 'background:rgba(255,95,103,0.15);color:var(--danger);border-color:rgba(255,95,103,0.3)');

    return `
      <div class="booking-card" style="background:var(--surface);border:1px solid var(--line-subtle);border-radius:var(--radius-md);padding:24px;margin-bottom:20px;display:grid;grid-template-columns:1fr 180px 200px;gap:24px;align-items:center">
        <div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
            <span style="font-size:12px;font-family:var(--display);color:var(--gold2);font-weight:700">#${b.id}</span>
            <span style="padding:2px 10px;border-radius:var(--radius-pill);font-size:10px;font-weight:700;border:1px solid;${statusBg}">${b.status}</span>
            <span style="font-size:11px;color:var(--muted)">Hub: ${b.hubCode}</span>
          </div>
          <h3 style="font-family:var(--display);font-size:20px;color:var(--cream);margin-bottom:6px">${b.vehicleName}</h3>
          <p style="font-size:13px;color:var(--muted);margin-bottom:4px">Guest: <b>${b.guestName}</b> (${b.guestPhone || ''})</p>
          <p style="font-size:12px;color:#aaa">Pickup: ${b.pickupDate} • Return: ${b.returnDate} (${b.days || 1} Days)</p>
        </div>

        <div style="text-align:center">
          <img src="${vehicle ? vehicle.image : 'assets/maybach.png'}" style="max-height:80px;width:100%;object-fit:contain" alt="${b.vehicleName}">
          <div style="font-size:18px;font-family:var(--display);color:var(--gold2);margin-top:6px">${money(b.total)}</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px">
          <button type="button" class="btn gold" style="font-size:11px;padding:8px" onclick="showBookingConfirmationPass(window.luxuryDataMgr.getBookingById('${b.id}'))">
            View VIP Pass
          </button>
          <a href="https://wa.me/919167164547?text=${encodeURIComponent(`Hello KRUIZLY Concierge, regarding my reservation #${b.id} for the ${b.vehicleName}.`)}" target="_blank" rel="noopener" class="btn ghost" style="font-size:11px;padding:8px;text-align:center">
            WhatsApp Desk
          </a>
        </div>
      </div>
    `;
  }).join("");
}

function closeModals() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
}

window.selectFleet = selectAndBookFleet;
window.selectAndBookFleet = selectAndBookFleet;
window.openVehicleDossier = openVehicleDossier;
window.calculateFare = calculateFare;
window.applyPromoCode = applyPromoCode;
window.requestRide = requestRide;
window.closeModals = closeModals;
window.showBookingConfirmationPass = showBookingConfirmationPass;
window.heroSlideshowNext = heroSlideshowNext;
window.heroSlideshowPrev = heroSlideshowPrev;
window.goToHeroSlide = goToHeroSlide;
window.toggleHeroSlideshowPlayPause = toggleHeroSlideshowPlayPause;
window.reserveCurrentHeroCar = reserveCurrentHeroCar;