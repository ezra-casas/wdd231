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

// Event Listeners
startBtn.addEventListener("click", startTimer);
pauseResumeBtn.addEventListener("click", togglePause);
stopBtn.addEventListener("click", stopTimer);

// Optional: react to setting changes live
window.addEventListener("storage", (event) => {
  if (event.key === "timeFormat") {
    updateTimerDisplay(Date.now() - startTime);
  }
});

function startTimer() {
  if (!startTime) {
    startTime = Date.now();
  } else {
    startTime = Date.now() - elapsedTime;
  }

  intervalId = setInterval(updateTimerDisplayLoop, 1000);
  isPaused = false;

  taskInput.disabled = true;
  startBtn.disabled = true;
  pauseResumeBtn.disabled = false;
  pauseResumeBtn.textContent = "Pause";
  stopBtn.disabled = false;
}

function togglePause() {
  if (!isPaused) {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
    pauseResumeBtn.textContent = "Continue";
    isPaused = true;
  } else {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTimerDisplayLoop, 1000);
    pauseResumeBtn.textContent = "Pause";
    isPaused = false;
  }
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

function resetTimerState() {
  startTime = null;
  elapsedTime = 0;
  isPaused = false;
}

function updateUIAfterReset() {
  startBtn.disabled = false;
  pauseResumeBtn.disabled = true;
  pauseResumeBtn.textContent = "Pause";
  stopBtn.disabled = true;
  taskInput.disabled = false;
  taskInput.value = "";
}

function updateTimerDisplayLoop() {
  const currentTime = Date.now();
  const diff = currentTime - startTime;
  updateTimerDisplay(diff);
}

function updateTimerDisplay(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  timerDisplay.textContent = formatElapsedTime(totalSeconds);
}

function formatElapsedTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const format = localStorage.getItem("timeFormat") || "24";
  if (format === "12") {
    const ampm = hrs >= 12 ? "PM" : "AM";
    const hr12 = ((hrs + 11) % 12) + 1; // converts 0–23 to 1–12
    return `${pad(hr12)}:${pad(mins)}:${pad(secs)} ${ampm}`;
  }

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function pad(num) {
  return String(num).padStart(2, "0");
}

function saveCurrentTask() {
  const taskName = taskInput.value.trim() || "Unnamed Task";
  const duration = timerDisplay.textContent;
  const timestamp = new Date().toISOString();

  const entry = { task: taskName, duration, timestamp };
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
  recent.forEach(({ task, duration, timestamp }) => {
    const date = new Date(timestamp);
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${task}</strong> — ${duration}<br>
      <small>${date.toLocaleString()}</small>
    `;
    list.appendChild(li);
  });

  lastSessionsContainer.appendChild(list);
}

// Load previous sessions on startup
loadRecentSessions();
