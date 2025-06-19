import { setupNavToggle } from "./nav.js";
setupNavToggle();

let startTime = null;
let intervalId = null;
let elapsedTime = 0;
let isPaused = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseResumeBtn = document.getElementById("pauseResumeBtn");
const stopBtn = document.getElementById("stopBtn");
const taskInput = document.getElementById("taskInput");
const lastSessionsContainer = document.getElementById("lastSessions");

const ring = document.querySelector(".progress-ring-fill");
const radius = 70;
const circumference = 2 * Math.PI * radius;

if (ring) {
  ring.style.strokeDasharray = `${circumference}`;
  ring.style.strokeDashoffset = `${circumference}`;
}

startBtn.addEventListener("click", startTimer);
pauseResumeBtn.addEventListener("click", togglePause);
stopBtn.addEventListener("click", stopTimer);

window.addEventListener("storage", (event) => {
  if (event.key === "timeFormat") {
    updateTimerDisplay(Date.now() - startTime);
  }
});

function getMaxTime() {
  return (parseInt(localStorage.getItem("maxTimeSelected"), 10) || 15) * 60;
}

function startTimer() {
  startTime = startTime ? Date.now() - elapsedTime : Date.now();
  intervalId = setInterval(updateTimerLoop, 1000);
  isPaused = false;

  updateUIOnStart();
}

function togglePause() {
  if (isPaused) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTimerLoop, 1000);
    pauseResumeBtn.textContent = "Pause";
  } else {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
    pauseResumeBtn.textContent = "Continue";
  }
  isPaused = !isPaused;
}

function stopTimer() {
  clearInterval(intervalId);

  if (elapsedTime > 0 || startTime) {
    saveCurrentTask();
  }

  resetTimerState();
  updateTimerDisplay(0);
  updateUIAfterReset();
  loadRecentSessions();
}

function updateTimerLoop() {
  const msElapsed = Date.now() - startTime;
  const totalSeconds = Math.floor(msElapsed / 1000);
  const maxTime = getMaxTime();

  if (totalSeconds >= maxTime) {
    stopTimer(); // Stop and save
    updateTimerDisplay(maxTime * 1000); // Ensure it's capped at max time visually
    return;
  }

  updateTimerDisplay(msElapsed);
}

function updateTimerDisplay(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  timerDisplay.textContent = formatElapsedTime(totalSeconds);
  updateProgressRing(totalSeconds);
}

function formatElapsedTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${pad(mins)}:${pad(secs)}`;
}

function pad(num) {
  return String(num).padStart(2, "0");
}

function updateProgressRing(elapsedSeconds) {
  if (!ring) return;

  const percent = Math.min(elapsedSeconds / getMaxTime(), 1);
  const offset = circumference * (1 - percent);
  ring.style.strokeDashoffset = offset;

  const [r, g, b] = getProgressColor(percent);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  ring.style.color = rgb;
  ring.style.filter = getGlow(rgb, percent);
}

function getProgressColor(percent) {
  if (percent < 0.5) {
    const progress = percent / 0.5;
    return [255, Math.round(255 * progress), 0];
  } else {
    const progress = (percent - 0.5) / 0.5;
    return [
      Math.round(255 * (1 - progress)),
      255 - Math.round(127 * progress),
      0,
    ];
  }
}

function getGlow(rgb, percent) {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? `drop-shadow(0 0 ${6 + percent * 8}px ${rgb})`
    : `drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.2))`;
}

function saveCurrentTask() {
  const taskName = taskInput.value.trim() || "Unnamed Task";
  const entry = {
    task: taskName,
    duration: timerDisplay.textContent,
    timestamp: new Date().toISOString(),
  };
  const history = JSON.parse(localStorage.getItem("timeTrackerHistory")) || [];
  history.push(entry);
  localStorage.setItem("timeTrackerHistory", JSON.stringify(history));
}

function loadRecentSessions() {
  const history = JSON.parse(localStorage.getItem("timeTrackerHistory")) || [];
  const recent = history.slice(-3).reverse();

  lastSessionsContainer.innerHTML = "<h3>Last Sessions</h3>";
  if (recent.length === 0) {
    lastSessionsContainer.innerHTML += "<p>No recent sessions</p>";
    return;
  }

  const list = document.createElement("ul");
  for (const { task, duration, timestamp } of recent) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${task}</strong> — ${duration}<br><small>${new Date(timestamp).toLocaleString()}</small>`;
    list.appendChild(li);
  }
  lastSessionsContainer.appendChild(list);
}

function updateUIOnStart() {
  taskInput.disabled = true;
  startBtn.disabled = true;
  pauseResumeBtn.disabled = false;
  pauseResumeBtn.textContent = "Pause";
  stopBtn.disabled = false;
}

function updateUIAfterReset() {
  startBtn.disabled = false;
  pauseResumeBtn.disabled = true;
  pauseResumeBtn.textContent = "Pause";
  stopBtn.disabled = true;
  taskInput.disabled = false;
  taskInput.value = "";
}

function resetTimerState() {
  startTime = null;
  elapsedTime = 0;
  isPaused = false;
  if (ring) ring.style.strokeDashoffset = `${circumference}`;
}

const inputWrapper = document.querySelector(".input-wrapper");

taskInput.addEventListener("input", () => {
  const length = taskInput.value.length;
  inputWrapper.setAttribute("data-count", `${length}/20`);

  if (length < 10) {
    inputWrapper.setAttribute("data-count-color", "normal");
  } else if (length < 17) {
    inputWrapper.setAttribute("data-count-color", "warning");
  } else {
    inputWrapper.setAttribute("data-count-color", "danger");
  }
});

// Set initial value
const length = taskInput.value.length;
inputWrapper.setAttribute("data-count", `${length}/20`);
inputWrapper.setAttribute(
  "data-count-color",
  length < 10 ? "normal" : length < 17 ? "warning" : "danger",
);
// Init and update progress ring
updateProgressRing(elapsedTime);
loadRecentSessions();
