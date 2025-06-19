const historyContainer = document.getElementById("historyContainer");
const clearBtn = document.getElementById("clearHistoryBtn");

function loadHistory() {
  // Initialize history array if it doesn't exist
  const history = JSON.parse(localStorage.getItem("timeTrackerHistory")) || [];

  //if no history display message
  if (!history.length) {
    historyContainer.innerHTML = "<p>No history available.</p>";
  }

  const list = document.createElement("ul");

  // loop through history array and create list items
  history.forEach((entry) => {
    const date = new Date(entry.timestamp);
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${entry.task}</strong> - ${entry.duration}<br>
      <small>${date.toLocaleString()}</small>
    `;
    list.appendChild(item);
  });
  historyContainer.appendChild(list);
}

function clearHistory() {
  localStorage.removeItem("timeTrackerHistory");
  historyContainer.innerHTML = "<p>No history available.</p>";
}

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("timeTrackerHistory");
  location.reload();
});
loadHistory();
