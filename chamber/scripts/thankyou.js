const params = new URLSearchParams(window.location.search);
const fname = params.get("fname") || "";
const lname = params.get("lname") || "";
document.getElementById("fullName").textContent = `${fname} ${lname}`.trim();
document.getElementById("email").textContent = params.get("email") || "N/A";
document.getElementById("phone").textContent = params.get("phone") || "N/A";
document.getElementById("org").textContent = params.get("org") || "N/A";
document.getElementById("timestamp").textContent =
  params.get("timestamp") || new Date().toISOString();
document.getElementById("last-modified").textContent = document.lastModified;
