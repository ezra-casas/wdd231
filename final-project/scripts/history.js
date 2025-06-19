import { setupNavToggle } from "./nav.js";
setupNavToggle();

const historyContainer = document.getElementById("historyContainer");
const clearBtn = document.getElementById("clearHistoryBtn");

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("timeTrackerHistory")) || [];

  historyContainer.innerHTML = ""; // Clear previous content

  if (!history.length) {
    historyContainer.innerHTML = "<p>No history available.</p>";
    return;
  }

  const list = document.createElement("ul");

  history.forEach((entry, index) => {
    const date = new Date(entry.timestamp);
    const item = document.createElement("li");
    item.classList.add("history-item"); // Add class for styling
    item.innerHTML = `
      <button class="delete-entry" data-index="${index}" aria-label="Delete entry">✕</button>
      <strong>${entry.task}</strong> - ${entry.duration}<br>
      <small>${date.toLocaleString()}</small>
    `;
    list.appendChild(item);
  });

  historyContainer.appendChild(list);

  // Add event listeners to delete buttons
  document.querySelectorAll(".delete-entry").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      deleteEntry(index);
    });
  });
}

function deleteEntry(index) {
  const history = JSON.parse(localStorage.getItem("timeTrackerHistory")) || [];
  history.splice(index, 1); // Remove the entry at the given index
  localStorage.setItem("timeTrackerHistory", JSON.stringify(history));
  loadHistory(); // Re-render list
}

function clearHistory() {
  localStorage.removeItem("timeTrackerHistory");
  historyContainer.innerHTML = "<p>No history available.</p>";
}

const modal = document.getElementById("confirmModal");
const confirmBtn = document.getElementById("confirmClearBtn");
const cancelBtn = document.getElementById("cancelClearBtn");

clearBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

confirmBtn.addEventListener("click", () => {
  localStorage.removeItem("timeTrackerHistory");
  modal.classList.add("hidden");
  loadHistory();
});

cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.add("hidden");
  }
});
loadHistory();
