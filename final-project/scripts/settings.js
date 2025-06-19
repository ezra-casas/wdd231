const toggle = document.getElementById("themeToggle");
const formatToggle = document.getElementById("timeFormatToggle");
const formatLabel = document.getElementById("formatLabel");
const maxTimeInput = document.getElementById("maxTimeInput");
const resetBtn = document.getElementById("resetDefaultsBtn");

initSettings();

function initSettings() {
  loadTheme();
  loadTimeFormat();
  loadMaxTime();

  toggle.addEventListener("change", handleThemeToggle);
  formatToggle.addEventListener("change", handleFormatToggle);
  maxTimeInput.addEventListener("input", handleMaxTimeInput);
  resetBtn.addEventListener("click", resetDefaults);
}

function handleThemeToggle() {
  const theme = toggle.checked ? "dark" : "light";
  localStorage.setItem("theme", theme);
  applyTheme(theme);
}

function handleFormatToggle() {
  const format = formatToggle.checked ? "12" : "24";
  localStorage.setItem("timeFormat", format);
  formatLabel.textContent = `${format}-hour`;
}

function handleMaxTimeInput() {
  const value = Number(maxTimeInput.value);
  if (value >= 1 && value <= 120) {
    localStorage.setItem("maxTimeSelected", value);
  }
}

function resetDefaults() {
  localStorage.removeItem("theme");
  localStorage.removeItem("timeFormat");
  localStorage.setItem("maxTimeSelected", 15);

  toggle.checked = false;
  applyTheme("light");

  formatToggle.checked = false;
  formatLabel.textContent = "24-hour";

  maxTimeInput.value = 15;

  alert("Settings reset to default.");
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  toggle.checked = savedTheme === "dark";
  applyTheme(savedTheme);
}

function loadTimeFormat() {
  const savedFormat = localStorage.getItem("timeFormat") || "24";
  formatToggle.checked = savedFormat === "12";
  formatLabel.textContent = `${savedFormat}-hour`;
}

function loadMaxTime() {
  const savedMax = localStorage.getItem("maxTimeSelected");
  if (savedMax) maxTimeInput.value = savedMax;
}
