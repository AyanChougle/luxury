document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("fleet-grid");
  if (!grid || !window.LUXURY_DATA) return;
  grid.innerHTML = LUXURY_DATA.fleets.map(f => `
    <article class="fleet-card">
      <div class="fleet-image"><div class="asset-label">${f.name}</div></div>
      <div class="fleet-info"><div><span>${f.type}</span><h3>${f.name}</h3></div><b>${f.seats} seats</b></div>
      <div class="fleet-bottom"><span>From ${money(f.price)} / day</span><a href="#book" onclick="selectFleet('${f.name}')">Reserve →</a></div>
    </article>`).join("");
});
function money(n){return "₹"+Number(n).toLocaleString("en-IN")}
function selectFleet(name){const s=document.getElementById("booking-fleet"); if(s) s.value=name;}
function requestRide(e){e.preventDefault(); alert("Concierge request captured. Connect this form to your KRUIZLY booking endpoint.");}