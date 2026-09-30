// ==========================================================================
// KRUIZLY BLACK LABEL — CENTRAL LUXURY FLEET & OPERATIONS DATA (shared/data.js)
// Ultra-Luxury mobility data layer with localStorage persistence and API sync
// ==========================================================================

const LUXURY_FLEET_DATA = [
  {
    id: "GHOST",
    name: "Rolls-Royce Ghost Series II",
    brand: "Rolls-Royce",
    model: "Ghost Series II Extended",
    type: "Ultra Luxury Pinnacle",
    category: "sedan",
    categoryLabel: "Ultra Luxury Pinnacle",
    seats: 4,
    bags: 3,
    price: 65000,
    priceHour: 3200,
    chauffeurRate: 5000,
    deposit: 35000,
    transmission: "Satellite-Aided 8-Speed",
    fuel: "6.75L Twin-Turbo V12",
    status: "Available",
    image: "assets/ghost.png",
    tagline: "Post-Opulent Perfection and Peerless Prestige",
    specs: {
      power: "563 hp",
      engine: "6.75L Twin-Turbo V12",
      sound: "Bespoke Rolls-Royce 1300W Studio Audio",
      acceleration: "0-100 km/h in 4.7s Magic Carpet Ride"
    },
    features: [
      "Shooting Star Starlight Headliner with hand-woven fiber optics",
      "Planar Suspension System with Flagbearer Road-Reading Cameras",
      "Effortless Power Doors opening and closing at touch of button",
      "Bespoke Lambswool Floor Rugs & Open-Pore Obsidian Veneer",
      "Integrated Rolls-Royce Umbrellas with Teflon Coating",
      "Refrigerated Champagne Cellar with Crystal Flutes"
    ]
  },
  {
    id: "MAYBACH",
    name: "Mercedes-Maybach S-Class",
    brand: "Mercedes-Benz",
    model: "Maybach S580 / S680",
    type: "Ultra Luxury Sedan",
    category: "sedan",
    categoryLabel: "Ultra Luxury Sedan",
    seats: 4,
    bags: 3,
    price: 25000,
    priceHour: 1200,
    chauffeurRate: 2500,
    deposit: 15000,
    transmission: "9G-TRONIC Automatic",
    fuel: "Twin-Turbo V8 Petrol",
    status: "Available",
    image: "assets/maybach.png",
    tagline: "The Benchmark of Sovereign Chauffeur Travel",
    specs: {
      power: "503 hp",
      engine: "4.0L V8 Biturbo + EQ Boost",
      sound: "Burmester 4D High-End (30 Speakers)",
      acceleration: "0-100 km/h in 4.8s"
    },
    features: [
      "Executive Rear Reclining Lounge Suite (43.5° recline)",
      "Burmester 4D Surround Sound with seat exciters",
      "Silver-plated Champagne Flutes & Refrigerated Compartment",
      "Active Road Noise Cancellation & Acoustic Glass",
      "MBUX High-End Rear Seat Entertainment with Dual 11.6\" Displays",
      "Calf massage, heated neck pillows and Energizing Comfort"
    ]
  },
  {
    id: "VELLFIRE",
    name: "Toyota Vellfire Lounge",
    brand: "Toyota",
    model: "Vellfire Executive Lounge",
    type: "Executive VIP Lounge",
    category: "lounge",
    categoryLabel: "Executive VIP Lounge",
    seats: 6,
    bags: 5,
    price: 18000,
    priceHour: 900,
    chauffeurRate: 2000,
    deposit: 12000,
    transmission: "E-CVT Automatic",
    fuel: "Self-Charging Hybrid",
    status: "Available",
    image: "assets/vellfire.png",
    tagline: "Private Jet Mobility on the Ground",
    specs: {
      power: "193 hp",
      engine: "2.5L 4-Cylinder Hybrid",
      sound: "JBL Premium 15-Speaker System",
      acceleration: "Whisper-quiet electric glide"
    },
    features: [
      "Ottoman Captain Seats with Power Extendable Footrests",
      "16-Color Ceiling Mood Illumination",
      "Dual Panoramic Sunroofs with Independent Blinds",
      "Executive Fold-Out Workstation Desks",
      "Whisper-Quiet EV Glide mode for boardroom calls",
      "Nanoe-X Cabin Air Purification & Quad-Zone Climate"
    ]
  },
  {
    id: "CARNIVAL",
    name: "Kia Carnival Limousine Plus",
    brand: "Kia Black Label",
    model: "Carnival Limousine Plus VIP",
    type: "Executive VIP Lounge",
    category: "lounge",
    categoryLabel: "Executive VIP Lounge",
    seats: 7,
    bags: 6,
    price: 15000,
    priceHour: 750,
    chauffeurRate: 2000,
    deposit: 10000,
    transmission: "8-Speed Sports Automatic",
    fuel: "2.2L Smartstream CRDi Diesel",
    status: "Available",
    image: "assets/carnival.png",
    tagline: "First-Class Limousine Suite on Wheels",
    specs: {
      power: "193 hp / 441 Nm",
      engine: "2.2L Smartstream Turbo Diesel",
      sound: "Bose 12-Speaker Premium Sound",
      acceleration: "Smooth Torque-Rich Highway Glide"
    },
    features: [
      "Second-Row Powered Relaxation Ottoman Seats with Leg Support",
      "Dual Electric Panoramic Sunroofs with Independent Blinds",
      "Bose 12-Speaker Centerpoint Audio Suite",
      "One-Touch Smart Power Sliding Doors & Smart Tailgate",
      "Tri-Zone Independent Climate Control with Roof Air Vents",
      "Executive Sunshade Blinds & 64-Color Ambient Mood Lighting"
    ]
  },
  {
    id: "M9",
    name: "MG M9 EV Sovereign Lounge",
    brand: "MG Luxury",
    model: "M9 Sovereign Electric Edition",
    type: "Executive VIP Lounge",
    category: "lounge",
    categoryLabel: "Pure Electric VIP Lounge",
    seats: 6,
    bags: 5,
    price: 17500,
    priceHour: 850,
    chauffeurRate: 2000,
    deposit: 12000,
    transmission: "Direct Drive Electric",
    fuel: "100% Pure Electric (540km Range)",
    status: "Available",
    image: "assets/m9.png",
    tagline: "Zero-Emission Boardroom on Wheels",
    specs: {
      power: "245 hp (Pure EV)",
      engine: "90kWh Ultra-Density Ternary Lithium Battery",
      sound: "Dynaudio 16-Speaker Acoustic Suite",
      acceleration: "0-100 km/h in 6.2s Instant Torque"
    },
    features: [
      "Zero-Gravity Master Captain Recliners with 8-Point Air Massage",
      "Fold-away Aviation Boardroom Tray Tables",
      "Acoustic Dual-Pane Privacy Glass & Electric Privacy Curtains",
      "50W Fast Wireless Device Charging Pads at each VIP Seat",
      "Whisper-Quiet 0dB Cabin Architecture for Confidential Calls",
      "High-Definition Ceiling Theatre Screen with HDMI & Screen Mirroring"
    ]
  },
  {
    id: "RANGEROVER",
    name: "Range Rover Autobiography",
    brand: "Land Rover",
    model: "Autobiography LWB",
    type: "Luxury SUV",
    category: "suv",
    categoryLabel: "Flagship Luxury SUV",
    seats: 5,
    bags: 4,
    price: 24000,
    priceHour: 1150,
    chauffeurRate: 2500,
    deposit: 15000,
    transmission: "8-Speed Automatic",
    fuel: "3.0L Turbo Diesel",
    status: "Available",
    image: "assets/rangerover.png",
    tagline: "Commanding Presence with Unmatched Serenity",
    specs: {
      power: "350 hp",
      engine: "3.0L 6-Cylinder Twin-Turbo",
      sound: "Meridian 3D Surround Sound (1600W)",
      acceleration: "0-100 km/h in 5.8s"
    },
    features: [
      "Long Wheelbase (LWB) with Limousine Rear Legroom",
      "Executive Class Comfort Plus Hot-Stone Massage Seats",
      "All-Wheel Steering & Electronic Air Suspension",
      "Deployable Power Side Steps for graceful VIP entry",
      "Active Cabin Noise Cancellation in all 4 Headrests"
    ]
  },
  {
    id: "BMW7",
    name: "BMW 7 Series Protection",
    brand: "BMW",
    model: "740i M-Sport",
    type: "Executive Sedan",
    category: "sedan",
    categoryLabel: "Executive Luxury Sedan",
    seats: 4,
    bags: 3,
    price: 19000,
    priceHour: 950,
    chauffeurRate: 2000,
    deposit: 12000,
    transmission: "8-Speed Steptronic",
    fuel: "TwinPower Turbo Petrol",
    status: "Available",
    image: "assets/bmw7.png",
    tagline: "Futuristic Authority & Cinematic Travel",
    specs: {
      power: "381 hp",
      engine: "3.0L BMW TwinPower Turbo",
      sound: "Bowers & Wilkins Diamond Surround",
      acceleration: "0-100 km/h in 5.4s"
    },
    features: [
      "31.3\" 8K Ultrawide BMW Theatre Screen in the Rear",
      "Panoramic Sky Lounge LED Glass Roof",
      "Automatic Soft-Close & Sensor-Assisted Doors",
      "Touch command panels integrated into rear door armrests",
      "Integral Active Steering & Two-Axle Air Suspension"
    ]
  },
  {
    id: "SCLASS",
    name: "Mercedes-Benz S-Class",
    brand: "Mercedes-Benz",
    model: "S 450 4MATIC",
    type: "Executive Sedan",
    category: "sedan",
    categoryLabel: "Executive Luxury Sedan",
    seats: 4,
    bags: 3,
    price: 20000,
    priceHour: 1000,
    chauffeurRate: 2000,
    deposit: 12000,
    transmission: "9G-TRONIC Automatic",
    fuel: "Inline-6 Turbo Petrol",
    status: "Available",
    image: "assets/sclass.png",
    tagline: "Unrivaled Elegance for Modern Executives",
    specs: {
      power: "367 hp",
      engine: "3.0L Turbocharged Inline-6",
      sound: "Burmester 3D Surround Sound",
      acceleration: "0-100 km/h in 5.1s"
    },
    features: [
      "AIRMATIC Dynamic Air Suspension with Level Control",
      "Heated, Ventilated & Multi-Contour Massage Seats",
      "Augmented Reality Head-Up Display",
      "OLED Center Touchscreen & Wireless VIP Tablets",
      "Double-Glazed Acoustic Comfort Glass"
  }
];

const LUXURY_HUBS = [
  { id: 1, name: "Mumbai Hub", code: "BOM", city: "Mumbai", state: "Maharashtra", address: "Chhatrapati Shivaji Maharaj Int'l VIP Terminal & BKC Lounge", phone: "+91 91671 64547" },
  { id: 2, name: "Delhi NCR Hub", code: "DEL", city: "New Delhi", state: "Delhi", address: "Indira Gandhi Int'l Terminal 3 & Aerocity Concierge Suite", phone: "+91 98110 54321" },
  { id: 3, name: "Surat Hub", code: "STV", city: "Surat", state: "Gujarat", address: "Dumas Road VIP Aviation Hub & Diamond Bourse Pavilion", phone: "+91 98980 98765" },
  { id: 4, name: "Bengaluru Hub", code: "BLR", city: "Bengaluru", state: "Karnataka", address: "Kempegowda Int'l VIP Arrival Lounge & UB City Concierge", phone: "+91 98450 11223" },
  { id: 5, name: "Goa Hub", code: "GOI", city: "Goa", state: "Goa", address: "Mopa & Dabolim Airport Luxury Arrival Pavilion", phone: "+91 98230 44556" }
];

const INITIAL_BOOKINGS = [
  { id: "KZ-UL-1042", guestName: "Vikramaditya Birla", guestPhone: "+91 98200 91823", guestEmail: "v.birla@investcorp.in", vehicleId: "GHOST", vehicleName: "Rolls-Royce Ghost Series II", hubCode: "BOM", hubName: "Mumbai Hub", pickupCity: "Mumbai (BKC)", pickupDate: "2026-10-02", pickupTime: "10:00", returnDate: "2026-10-04", returnTime: "18:00", days: 2, total: 130000, chauffeur: true, status: "CONFIRMED" },
  { id: "KZ-UL-1041", guestName: "Aaradhya Kapoor", guestPhone: "+91 98110 44211", guestEmail: "aaradhya@kapoormedia.com", vehicleId: "VELLFIRE", vehicleName: "Toyota Vellfire Lounge", hubCode: "DEL", hubName: "Delhi NCR Hub", pickupCity: "New Delhi (Aerocity)", pickupDate: "2026-10-01", pickupTime: "08:30", returnDate: "2026-10-03", returnTime: "20:00", days: 2, total: 36000, chauffeur: true, status: "CONFIRMED" },
  { id: "KZ-UL-1040", guestName: "Jayesh Mehta", guestPhone: "+91 98980 77123", guestEmail: "mehta@suratgems.com", vehicleId: "RANGEROVER", vehicleName: "Range Rover Autobiography", hubCode: "STV", hubName: "Surat Hub", pickupCity: "Surat (Dumas)", pickupDate: "2026-09-30", pickupTime: "14:00", returnDate: "2026-10-02", returnTime: "14:00", days: 2, total: 48000, chauffeur: true, status: "ON_TRIP" },
  { id: "KZ-UL-1039", guestName: "Rohan Deshmukh", guestPhone: "+91 98200 11982", guestEmail: "rohan@deshmukhfilms.in", vehicleId: "CARNIVAL", vehicleName: "Kia Carnival Limousine Plus", hubCode: "BOM", hubName: "Mumbai Hub", pickupCity: "Mumbai (Juhu)", pickupDate: "2026-09-27", pickupTime: "09:00", returnDate: "2026-09-29", returnTime: "21:00", days: 2, total: 30000, chauffeur: true, status: "COMPLETED" },
  { id: "KZ-UL-1038", guestName: "Zubin Mehta", guestPhone: "+91 98450 33881", guestEmail: "zubin@techventure.com", vehicleId: "BMW7", vehicleName: "BMW 7 Series Protection", hubCode: "BLR", hubName: "Bengaluru Hub", pickupCity: "Bengaluru (UB City)", pickupDate: "2026-10-04", pickupTime: "11:00", returnDate: "2026-10-06", returnTime: "18:00", days: 2, total: 38000, chauffeur: true, status: "CONFIRMED" },
  { id: "KZ-UL-1037", guestName: "Farhan Wadia", guestPhone: "+91 98230 55912", guestEmail: "farhan@wadiaestates.com", vehicleId: "MAYBACH", vehicleName: "Mercedes-Maybach S-Class", hubCode: "GOI", hubName: "Goa Hub", pickupCity: "Goa (North Coast Villa)", pickupDate: "2026-10-10", pickupTime: "12:00", returnDate: "2026-10-13", returnTime: "12:00", days: 3, total: 75000, chauffeur: true, status: "CONFIRMED" }
];

// Persistent state management
class LuxuryDataManager {
  constructor() {
    this.storageKey = "kruizly_black_label_state_v4";
    this.activeHubKey = "kruizly_active_hub";
    this.init();
  }

  init() {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(this.storageKey));
    } catch (e) {
      saved = null;
    }

    if (!saved || !Array.isArray(saved.fleets) || saved.fleets.length === 0) {
      this.data = {
        fleets: LUXURY_FLEET_DATA,
        hubs: LUXURY_HUBS,
        bookings: INITIAL_BOOKINGS,
        kpis: {
          revenue: 546213,
          activeTrips: 16,
          completedTrips: 132,
          monthRevenue: 168816,
          bookings: 184,
          occupancy: 82
        }
      };
      this.save();
    } else {
      this.data = saved;
    }

    window.LUXURY_DATA = this.data;
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      window.LUXURY_DATA = this.data;
    } catch (e) {
      console.warn("Storage quota exceeded:", e);
    }
  }

  getActiveHub() {
    return localStorage.getItem(this.activeHubKey) || "BOM";
  }

  setActiveHub(code) {
    localStorage.setItem(this.activeHubKey, code);
    return code;
  }

  getFleets(category = "all", searchQuery = "") {
    let list = this.data.fleets;
    if (category && category !== "all") {
      list = list.filter(f => f.category === category);
    }
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(f => 
        f.name.toLowerCase().includes(q) || 
        f.brand.toLowerCase().includes(q) || 
        f.type.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getFleetById(id) {
    if (!id) return null;
    const cleanId = String(id).toUpperCase();
    return this.data.fleets.find(f => f.id.toUpperCase() === cleanId || f.name.toLowerCase().includes(String(id).toLowerCase()));
  }

  getHubs() {
    return this.data.hubs;
  }

  getHubByCode(code) {
    return this.data.hubs.find(h => h.code.toUpperCase() === String(code).toUpperCase());
  }

  getBookings() {
    return this.data.bookings;
  }

  getBookingById(id) {
    if (!id) return null;
    const cleanId = String(id).toUpperCase().replace("#", "");
    return this.data.bookings.find(b => b.id.toUpperCase().replace("#", "") === cleanId);
  }

  addBooking(booking) {
    if (!booking.id) {
      booking.id = "KZ-UL-" + Math.floor(1050 + Math.random() * 8950);
    }
    booking.createdAt = new Date().toISOString();
    booking.status = booking.status || "CONFIRMED";
    this.data.bookings.unshift(booking);
    this.data.kpis.bookings += 1;
    this.data.kpis.revenue += Number(booking.total) || 0;
    this.save();
    return booking;
  }

  updateBookingStatus(id, newStatus) {
    const booking = this.getBookingById(id);
    if (booking) {
      booking.status = newStatus;
      this.save();
      return true;
    }
    return false;
  }

  addFleet(vehicle) {
    if (!vehicle.id) {
      vehicle.id = vehicle.name.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    }
    if (!vehicle.image) vehicle.image = "assets/ghost.png";
    this.data.fleets.push(vehicle);
    this.save();
    return vehicle;
  }

  addHub(hub) {
    if (!hub.id) hub.id = this.data.hubs.length + 1;
    this.data.hubs.push(hub);
    this.save();
    return hub;
  }
}

window.luxuryDataMgr = new LuxuryDataManager();
window.LUXURY_DATA = window.luxuryDataMgr.data;