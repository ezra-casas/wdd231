const toggle = document.getElementById("themeToggle");

toggle.addEventListener("change", () => {
  const theme = toggle.checked ? "dark" : "light";
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  toggle.checked = savedTheme === "dark";
  applyTheme(savedTheme);
}

const formatToggle = document.getElementById("timeFormatToggle");
const formatLabel = document.getElementById("formatLabel");

formatToggle.addEventListener("change", () => {
  const format = formatToggle.checked ? "12" : "24";
  localStorage.setItem("timeFormat", format);
  formatLabel.textContent = format + "-hour";
});

function loadTimeFormat() {
  const savedFormat = localStorage.getItem("timeFormat") || "24";
  const is12 = savedFormat === "12";
  formatToggle.checked = is12;
  formatLabel.textContent = savedFormat + "-hour";
}

document.getElementById("resetDefaultsBtn").addEventListener("click", () => {
  localStorage.removeItem("theme");
  localStorage.removeItem("timeFormat");

  // Reset toggles visually
  toggle.checked = false;
  applyTheme("light");

  formatToggle.checked = false;
  formatLabel.textContent = "24-hour";

  alert("Settings reset to default.");
});

loadTimeFormat();
loadTheme();
