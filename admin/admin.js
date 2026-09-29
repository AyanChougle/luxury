const d=window.LUXURY_DATA;const money=n=>"₹"+n.toLocaleString("en-IN");
document.addEventListener("DOMContentLoaded",async()=>{
 const api=await KRUIZLY_API.hubs(); const hubs=(api&&api.hubs)||d.hubs;
 document.getElementById("hub").innerHTML='<option>All Hubs</option>'+hubs.map(h=>`<option>${h.name}</option>`).join("");
 document.getElementById("fleet-table").innerHTML=d.fleets.map((f,i)=>`<tr><td class="gold-text">${f.name}</td><td>${[28,42,24,19,16,9][i]}</td><td>${money([124000,98000,82000,67000,59000,36000][i])}</td><td><span class="status">${f.status}</span></td></tr>`).join("");
 document.getElementById("hub-bars").innerHTML=d.hubs.map((h,i)=>`<div><div class="panel-head"><span>${h.name}</span><b class="gold-text">${money([182000,156000,128213][i])}</b></div><div class="bar"><i style="width:${[86,72,61][i]}%"></i></div></div>`).join("");
 document.getElementById("booking-table").innerHTML=Array.from({length:6},(_,i)=>`<tr><td>#KZ-${1042-i}</td><td>Executive Guest ${i+1}</td><td>${d.fleets[i%d.fleets.length].name}</td><td>${d.hubs[i%3].code}</td><td>${1+i}</td><td>${money(12000+(i*8500))}</td><td><span class="status">${i%3===0?"CONFIRMED":"COMPLETED"}</span></td></tr>`).join("");
});
function addHub(){alert("Hub creation form ready to connect to POST /api/hubs.")}
function addFleet(){alert("Fleet creation form ready to connect to your vehicle/fleet API.")}